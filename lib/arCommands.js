var arDrone = require('./arClient');


var isMasterControlling = false;

var doCommand = function(command) {

    console.log("is master in control? " + isMasterControlling);
    console.log(command);


    if (isMasterControlling && command.isMaster !== true) {
        // console.log("Slave command: IGNORED");
        return;
    } else if (command.isMaster === true) {
        // console.log("Master command: EXECUING");
        isMasterControlling = true;
        command.magnitude = 15;
    } else {
        // console.log("Slave command: EXECUING");
    }


    var speed = (command.magnitude) / (command.magnitude + 100);

    console.log("--------------------------");
    console.log("CommandGiven : " + command.dir);
    console.log("speed = " + speed);
    console.log("--------------------------");

    switch (command.dir) {
        case 'forward':
            arDrone.front(speed);
            break;
        case 'back':
            arDrone.back(speed);
            break;
        case 'left':
            arDrone.left(speed);
            break;
        case 'right':
            arDrone.right(speed);
            break;
        case 'rotateCounter':
            arDrone.counterClockwise(speed);
            break;
        case 'rotateClock':
            arDrone.clockwise(speed);
            break;
        case 'down':
            arDrone.down(speed);
            break;
        case 'up':
            arDrone.up(speed);
            break;
        case 'liftOff':
            arDrone.takeoff();
            break;
        case 'land':
            arDrone.land();
            break;
        default:
            console.log("NO command identified: NO action taken.");
            // arDrone.stop();
    } //end of switch
}; //endof doCommand


/*==================================================
  Enable slaves key 
==================================================*/
var enableSlaves = function(command) {
    isMasterControlling = false;
}; //end of enableSlaves



/*==================================================
  Exports: Public methods exposed
==================================================*/
module.exports = {
    doCommand: doCommand,
    enableSlaves: enableSlaves
};
