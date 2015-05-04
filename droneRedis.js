var redis_socketIO = require("socket.io-redis"),
    redis = require('redis'),
    myArClient = require('./lib/arCommands'),
    config = require('./config');


var environment = config.environment;
var port = config.redis[environment].port;
var host = config.redis[environment].host;
var pass = config.redis[environment].password;


/*==================================================
  Redis clients created
==================================================*/
var redisSubscriber = redis.createClient(port, host, { //subscriber
    "return_buffers": true,
    auth_pass: pass
});

var redisPublisher = redis.createClient(port, host, { //publisher
    "return_buffers": true,
    auth_pass: pass
});

/*==================================================
  clients connected to subscriptions
==================================================*/
redisSubscriber.subscribe('ArDronWouldYouKindly');
redisSubscriber.subscribe('enableSlaves');

redisSubscriber.on('message', function(channel, message) {
    var command;
    switch (channel) {
        case 'ArDronWouldYouKindly':
            command = JSON.parse(message);
            console.log("received command: " + JSON.stringify(command));
            myArClient.doCommand(command);
            break;
        case 'enableSlaves':
            command = JSON.parse(message);
            console.log("AR DRONE WILL ENABLE SLAVES");
            myArClient.enableSlaves(command);
            break;
        default:
            console.log("AR Redis has received a message on an unknown channel");
    }
});
