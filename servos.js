
i2c = require('i2c');

var addr = 0x40;

var i2c = new i2c(addr, {device:'/dev/i2c-1', debug:false});

var bytes = [0x01,0x4,0x10,0x1];

var readaddr=0x6;
var writeaddr=0x6;

var Servos = {
	init: function(){
		var oldmode, newmode;
		this.read(0, function(mode){
				// set to sleep for configuration	
		});
		this.write();      
	},	
	write: function(addr, byte){
		i2c.writeBytes(addr, [byte], function(err, data){
			if (err) console.log('err: ',err);
		
			console.log('wrote bytes to '+addr, byte);
		});
	},

	read: function(addr,cb){
		i2c.readBytes(addr, 1, function(err, data){
			if (err) console.log('Error reading ', data);
			console.log('read '+addr +': '+data);
			if (cb) cb(data);
		});
	}
};

process.stdin.resume();

var a = 0x6;
process.stdin.on('data', function(d){
	d = d.toString();
	if (d.indexOf('a') != -1){
		a = parseInt(d.replace('a',''));
		console.log('Setting addr to ', a);
	}else{
		d = d.split(' ');
		var up = parseInt(d[0]);
		var down = parseInt(d[1]);
		Servos.write(a+0, up & 0xff);
		Servos.write(a+1, up >> 8);
		Servos.write(a+2, down & 0xff);
		Servos.write(a+3, down >> 8);
		console.log('set PWM on: '+up, '   off:'+down);
	}
});





