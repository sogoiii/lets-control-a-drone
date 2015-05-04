var arDrone = require('ar-drone');
var client = arDrone.createClient();


//Test code Enable and disable as needed
// client.takeoff();

// console.log("[DRONE] lifting ar drone");

// client
//     .after(3000, function() {
//         // this.stop();
//         console.log("[DRONE] landing ar drone");
//         this.land();
//     });







module.exports = client;
