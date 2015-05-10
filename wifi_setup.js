var spawn = require('child_process').spawn;
var events = require('events');
var globalManager = new events.EventEmitter();
var network = require('./config').network;

//options.command 
//options.flags
//options.tag
function mySpawn(options){
  var process = spawn(options.command, options.flags);

  var _toConsoleLog = function(processName){
      return function(chunk){
          var string = new Buffer(chunk).toString('utf8');
          if(string.length < 1){return} //exit if empty
          console.log(processName + ' ' + string); 
          process.emit('myEvent', string);
      }   
  }//end of _toConsoleLog

  var _messageOut = function(message) {
    return function(){
      console.log(message);
    }
  }//end of _messageOut

  process.stdout.on('data', _toConsoleLog(options.tag));
  process.stderr.on('data', _toConsoleLog(options.tag));
  process.on('close', _toConsoleLog(options.tag));
  process.on('disconnect', _messageOut(options.tag + ' was disconnected'));
  process.on('exit', _messageOut(options.tag + " exited out of process"));

  return process;
}//end of mySpawn



//1. Make laptop connect to the ardrone network [config.network.drone.ESSID]
//2. Tell the drone to connect to internet connected network. [config.network.internet.ESSID]
//3. Now that drone is connected to router, make this laptop connect to router
globalManager.on('step1', function(){
  var step1 = mySpawn({
    command: 'networksetup',
    flags: ['-setairportnetwork' , 'en0' , network.drone.ESSID],
    tag: '[CONNECT TO ARDRONE]'
  });

  step1.on('exit', function(data){
      globalManager.emit('step2');
  });
});//end of step1


globalManager.on('step2', function(){
  var step2 = mySpawn({
    command: 'sh',
    flags: ['./bin/ardrone-wpa2/script/connect' , network.internet.ESSID, '-p' , network.internet.wpa2Pass, '-a', network.drone.desiredIP],
    tag: '[CONNECT ARDRONE TO NEW NETWORK]'
  });

  step2.on('myEvent', function(data){
    if(data === 'Connection closed by foreign host.\n'){
      globalManager.emit('step3');
    }
  });
});//end of step 2


globalManager.on('step3', function(){
  var step3 = mySpawn({
    command: 'networksetup',
    flags: ['-setairportnetwork' , 'en0', network.internet.ESSID, network.internet.wpa2Pass],
    tag: '[CONNECTING BACK TO ASUS]'
  });

  step3.on('exit', function(){
    console.log("WE HAVE SUCCESFULLY DONE ALL 3 COMMANDS!!!");
  });
});//end of step 3


//Start at step 1
globalManager.emit('step1');




