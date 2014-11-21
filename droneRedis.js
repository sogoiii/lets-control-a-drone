var redis_socketIO = require("socket.io-redis"),
    redis = require('redis'),
    myArClient = require('./lib/arCommands'),
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
            console.log("Drone received command: " + JSON.stringify(command));
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
