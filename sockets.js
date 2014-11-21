var redis_socketIO = require("socket.io-redis"),
    redis = require('redis'),
    config = require('./config');



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




module.exports = function(io) {

    /*==================================================
      IO config
    ==================================================*/
    io.adapter(redis_socketIO({
        host: 'localhost',
        port: 6379,
        // host: config.redis.host,
        // port: config.redis.port,
        // auth_pass: 'zUYjmimwBF3zWsdN'
        pubClient: redisPublisher,
        subClient: redisSubscriber
    }));


    var defaultSockets = io.of('/').on('connection', function(socket) {
        console.log("Connected to room('/') as [slave] with Id = ", socket.id);

        /*==================================================
          ArCommands: actual command send to ardrone
        ==================================================*/
        socket.join("ArCommands");


        /*==================================================
          dpadCommands: these are what all slaves give. these are aggregated into a true command
        ==================================================*/
        socket.on('dpadCommand', function(direction) {
            console.log("[SLAVE] dpadCommand received: " + JSON.stringify(direction));
            redisPublisher.publish("dpadCommand", direction);
        });


        /*==================================================
          Socket disconnection
        ==================================================*/
        socket.on('disconnect', function() {
            console.log("socket id = " + socket.id + " disconnected");
        });

    }); //end of defaultSockets socket ((Default connection))

}; // end of module.exports = function(io)
