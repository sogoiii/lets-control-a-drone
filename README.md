
Purpose:
---------
Demonstrates a controller that is connected to an ardrone. 



Setup:
---------
1. git clone project
2. cd into project
3. npm intall in root directory
4. bower install in public directory
5. node bin/slave to start up controller page
6. navigate to http://localhost:3000/quad-controller.html to view page



Connecting to ArDrone:
---------
I assume you are in root of the project within the terminal.

1. download [ardrone-wpa2](https://github.com/daraosn/ardrone-wpa2) from github
2. Connect battery to ardrone
3. Drone creates network with name: ardrone2_XXXXXX (ardrone2_073853)
4. Connect to said network
5. [in terminal - only do once] sh bin/ardrone-wpa2/script/install
6. [in terminal - every time] sh bin/ardrone-wpa2/script/connect "&lt;network name&gt;" -p "&lt;password&gt;" -a "&lt;new ip of ardrone&gt;"



Environments:
--------

Config.js contains an object of necessary parameters for development and production environments. The way I am accessing the correct key is by passing the environment variable as the key. For example, look at line 12 in sockets.js. 

<pre><code>
var environment = process.env.environment || 'dev';

/*==================================================
  Redis clients created
==================================================*/
var redisSubscriber = redis.createClient(config.redis[environment].port, config.redis[environment].host, { //subscriber
</code></pre>

I grab the environment variable on line 12, and then use it to access the correct key inside of the redis object inside config.js. Therefore if I set the environment variable as "staging" or "development" i will not access any keys and things will fail. Below are the correct ways to access data inside the config.js


####Environment (dev):

1. [terminal 1] environment="dev" node bin/slave
2. [terminal 2] environment="dev" node bin/master
3. [terminal 3] environment="dev" node bin/drone


####Environment (prod):

1. [terminal 1] environment="prod" node bin/slave
2. [terminal 2] environment="prod" node bin/master
3. [terminal 3] environment="prod" node bin/drone