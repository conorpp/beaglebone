
b = require('bonescript');
i2c = require('i2c');

var i2c = require('i2c');
var addr = 0x53; //accelerometer
var wire = new i2c(addr, {device: '/dev/i2c-1', debug: false});

var offset = {x:0,y:0,z:0};
var IMU = {

   init: function(){
	var calTime = 3*1000;
	console.log('Please wait '+calTime/1000+' seconds for calibrating);
	setInterval(function(){
				
	}, 250);	
   },
   offset: {x:0,y:0,z:0},

   read:  function(){
   	wire.readBytes(0x32,6,function(err,res){
		if (err) console.log('err: ', err);
		console.log('X: ', res.readInt16LE(0) - IMU.offset.x
			+ '   Y: ', res.readInt16LE(2) - IMU.offset.y
			+'    Z: ', res.readInt16LE(4) - IMU.offset.z
			);		
	});
   }
};

setInterval(read, 250);

