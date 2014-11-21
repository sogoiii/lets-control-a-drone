var _ = require('lodash'),
    redis = require('redis'),
    config = require('../config');



var environment = process.env.environment || 'dev';

var redisPublisher = redis.createClient(config.redis[environment].port, config.redis[environment].host, { //publisher
    "return_buffers": true,
    auth_pass: config.redis[environment].password
});


var io = require('socket.io-emitter')(redisPublisher);



var allCommands = {};
/* stub
{
  direciton : count
}
------------------ for example
{
  right : 10,
  left: 11,
  up: 50,
  down: 10
}
------------------
*/

/*==================================================
  getMaxCommand: recieves commandObject and returns object of max magnitude 
==================================================*/
var getMaxCommand = function(data) {

    var max = {
        magnitude: 0,
        dir: null
    };

    _.each(data, function(value, key) {
        if (value > max.magnitude) {
            max.magnitude = value;
            max.dir = key;
        }
    });

    return max;
};


/*==================================================
  updateCommandObj: Called every time dpadCommand is recieved on redis channel. Updates command object counts
==================================================*/
var updateCommandObj = function(dir) {
    //check if command is new, if it is then initialize, else add
    if (typeof allCommands[dir] === 'undefined') {
        allCommands[dir] = 1;
    } else {
        allCommands[dir] ++;
    }
};


/*==================================================
  Initialization: Every X seconds send new command to ArDrone via ArTrueCommand message
==================================================*/
setTimeout(function() {
    setInterval(function() {
        var processObj = _.clone(allCommands); //clone it so i dont deal with override issues
        allCommands = {}; //clear the object so it only has new things

        console.log("+++++++++");
        console.log(processObj);
        console.log("+++++++++");

        //process object and get max command
        var outputCommand = getMaxCommand(processObj);

        //Inform clients in ArCommandsRoom the ArTrueCommand given to drone
        io.to('ArCommands').emit('ArTrueCommand', outputCommand);

        //inform ARdrone to do the command
        redisPublisher.publish("ArDronWouldYouKindly", JSON.stringify(outputCommand));
    }, 5000);
}, 2000);




/*==================================================
  Exports: Public methods exposed
==================================================*/
module.exports = {
    updateCommandObj: updateCommandObj
};
