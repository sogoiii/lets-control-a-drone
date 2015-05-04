var arDrone = require('./arClient');


var isMasterControlling = false;

var doCommand = function(command) {

    console.log("[arCommands] is master in control? " + isMasterControlling);
    // console.log("[arCommands] " + JSON.stringify(command));


    if (isMasterControlling && command.isMaster !== true) {
        console.log("[arCommands] Slave command: IGNORED");
        return;
    } else if (command.isMaster === true) {
        console.log("[arCommands] Master command: EXECUING");
        isMasterControlling = true;
        command.magnitude = 15;
    } else {
        console.log("[arCommands] Slave command: EXECUING");
    }


    var speed = (command.magnitude) / (command.magnitude + 100);

    console.log("[arCommands] --------------------------");
    console.log("[arCommands] CommandGiven : " + command.dir);
    console.log("[arCommands] speed = " + speed);
    console.log("[arCommands] --------------------------");

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
            console.log("[arCommands] NO command identified: NO action taken.");
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
