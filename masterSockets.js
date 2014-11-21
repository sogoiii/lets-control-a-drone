var redis_socketIO = require("socket.io-redis"),
    redis = require('redis'),
    config = require('./config'),
    aggregator = require('./lib/aggregator'),
    StringDecoder = require('string_decoder').StringDecoder;

var environment = process.env.environment || 'dev';

/*==================================================
  Redis clients created
==================================================*/
var redisSubscriber = redis.createClient(config.redis[environment].port, config.redis[environment].host, { //subscriber
    "return_buffers": true,
    auth_pass: config.redis[environment].password
});


var redisPublisher = redis.createClient(config.redis[environment].port, config.redis[environment].host, { //publisher
    "return_buffers": true,
    auth_pass: config.redis[environment].password
});



/*==================================================
  clients connected to subscriptions
==================================================*/
redisSubscriber.subscribe('dpadCommand');




/*==================================================
  I left the redisSubscriber on the inside just to show that you can emit from here if you wanted to [actually its so this only works if i have master controller loaded]
==================================================*/
redisSubscriber.on('message', function(channel, message) {
    console.log("SOCKET RECEIVED PUBSUB EVENT!!!!-1");
    console.log(channel);
    var decoder = new StringDecoder('utf8');
    console.log(decoder.write(message));
    // console.log(message);
    console.log("---------------");

    if (channel === "dpadCommand") {
        console.log("DPAD COMMAND ON MASTER");
        aggregator.updateCommandObj(message);
    }
    //since im inside of socketio, i can simply emit here if i want. (use socket emitter?);
    // socket.emit("message", "hey message dude!!!");
});


module.exports = function(io) {

    /*==================================================
      IO config
    ==================================================*/
    io.adapter(redis_socketIO({
        host: 'localhost',
        port: 6379,
        // host: config.redis.host,
        // port: config.redis.port,
        // auth_pass: 'zUYjmimwBF3zWsdN',
        pubClient: redisPublisher,
        subClient: redisSubscriber
    }));


    var defaultSockets = io.of('/').on('connection', function(socket) {
        console.log("Connected to room('/') as [master] with Id = ", socket.id);

        /*==================================================
          ArCommands: actual command send to ardrone
        ==================================================*/
        socket.join("ArCommands");




        /*==================================================
          dpadCommands: these are what all slaves give. these are aggregated into a true command
        ==================================================*/
        socket.on('dpadCommand', function(direction) {
            console.log("[MASTER] dpadCommand received: " + JSON.stringify(direction));

            socket.to('ArCommands').emit('ArTrueCommand', {dir: direction});

            redisPublisher.publish("ArDronWouldYouKindly", JSON.stringify({
                dir: direction,
                isMaster: true
            })); //tell AR drone of the command
        });


        socket.on('overrideCommand', function(command) {
            console.log("[MASTER] overwrideCommand: " + JSON.stringify(command));
            command.isMaster = true;

            socket.to('ArCommands').emit('ArTrueCommand', command);

            redisPublisher.publish("ArDronWouldYouKindly", JSON.stringify(command)); //tell AR drone of the command
        });

        socket.on('overrideEnable', function(state) {
            console.log("[MASTER] overrideEnable: " + state);
            redisPublisher.publish("enableSlaves", JSON.stringify(state));
        });


        /*==================================================
          Socket disconnection
        ==================================================*/
        socket.on('disconnect', function() {
            console.log("socket id = " + socket.id + " disconnected");
        });

    }); //end of defaultSockets socket ((Default connection))


    /*==================================================
      Secondary namespace [Here for demonstration purposes only]
    ==================================================*/
    var namespace = io.of('/abc')
        .on('connection', function(socket) {
            console.log("connected namespace ", socket.id);
            socket.on('message', function(data) {
                // socket.broadcast.send(data);
                console.log("namespace socket was reached!!!!");
            });


            socket.on('customEvent', function(data) {
                console.log("NAMESPACE ----- customEvent - was reached data = " + JSON.stringify(data));
                socket.emit('customEvent', {
                    "hey": "sup"
                });
            });
        }); //end of abc socket


}; // end of module.exports = function(io)
