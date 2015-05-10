var spawn = require('child_process').spawn;

//Start the three processes //
var slave = spawn('node', ['bin/slave']);
var master = spawn('node', ['bin/master']);
var drone = spawn('node', ['bin/drone']);

//given chunk, output to console.log
var toConsoleLog = function(processName){
    return function(chunk){
          var string = new Buffer(chunk).toString('utf8');
          if(string.length < 1){return}
          console.log(processName + ' ' + string);
      }
}

//have output got to single standard Out
slave.stdout.on('data', toConsoleLog('[SLAVE]'));
slave.stderr.on('data', toConsoleLog('[ERROR] [SLAVE]'));
slave.on('close', toConsoleLog(['[EXIT] [SLAVE]']));

master.stdout.on('data', toConsoleLog('[MASTER]'));
master.stderr.on('data', toConsoleLog('[ERROR] [MASTER]'));
master.on('close', toConsoleLog(['[EXIT] [MASTER]']));

drone.stdout.on('data', toConsoleLog('[DRONE]'));
drone.stderr.on('data', toConsoleLog('[ERROR] [DRONE]'));
drone.on('close', toConsoleLog(['[EXIT] [DRONE]']));



console.log("[WARNING] If less than 3 process start then project failed. Start each process individually to debug the issue.");