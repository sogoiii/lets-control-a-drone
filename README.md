
Purpose:
---------
Demonstrates a controller that is connected to an ardrone. 

Enviornment variables:
--------

1. REDIS_PORT
2. REDIS_HOST
3. REDIS_PASS
4. PORT_SLAVE
5. PORT_MASTER
6. PORT_DRONE


Sever Setup:
---------
1. git clone project
2. cd into project
3. npm intall in root directory
4. bower install in public directory
5. node bin/slave to start up controller page
6. navigate to http://localhost:3000/quad-controller.html to view page
7. If you to be the master: navigate to http://localhost:7000/master-control.html to view page

Client Side Setup:
---------
1. Change socketURL in quad-controller.html line 86 to your SLAVE server
2. Change socketURL in master-controller.html line 89 to your MASTER server


Connecting to ArDrone:
---------
I assume you are in root of the project within the terminal.

1. download [ardrone-wpa2](https://github.com/daraosn/ardrone-wpa2) from github
2. Connect battery to ardrone
3. Drone creates network with name: ardrone2_XXXXXX (ardrone2_073853)
4. Connect to said network
5. [in terminal - only do once] sh bin/ardrone-wpa2/script/install
6. [in terminal - every time] sh bin/ardrone-wpa2/script/connect "&lt;network name&gt;" -p "&lt;password&gt;" -a "&lt;new ip of ardrone&gt;"


Running the project:
----------
Once you are all setup call the following:

1. node easyStart.js


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


The MIT License (MIT)

Copyright (c) 2014 angello pozo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

