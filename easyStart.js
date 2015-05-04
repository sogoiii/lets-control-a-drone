var spawn = require('child_process').spawn;

//Start the three processes //
var slave = spawn('node', ['bin/slave']);
var master = spawn('node', ['bin/master']);
var drone = spawn('node', ['bin/drone']);

//given chunk, output to console.log
var toConsoleLog = function(processName){
    return function(chunk){
        console.log(processName + ' ' + chunk.toString('ascii'));
    }   
}

//have output got to single standard Out
slave.stdout.on('data', toConsoleLog('[SLAVE]'));
master.stdout.on('data', toConsoleLog('[MASTER]'));
drone.stdout.on('data', toConsoleLog('[DRONE]'));
