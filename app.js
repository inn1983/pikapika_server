var http = require('http');
var process = require('child_process');
var fs = require('fs');
var serialport = require('serialport');
var portName = '/dev/ttyACM0'
var sp = new serialport.SerialPort(portName, {
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline("\n")
});

var server = http.createServer(function(req, res) {
	var dir = req.url;
	var dirs = dir.split('/');
	//console.log(req.url);
	console.log(dirs[1]);
	console.log(dirs[2]);
	
	if(dirs[1] === 'on'){
		//console.log('echo ' + dirs[2] + ' > /sys/class/gpio/gpio10_ph14/value');
		var i=0;
		sp.write("r");
		
		//for(i=0; i<4; i++){
			process.exec('aplay ./Welcome00.wav');
			
		//}
		console.log('cyuumon!');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('ご注文です！\n');
	}
	
	if(dirs[1] === ''){
		res.end(fs.readFileSync(__dirname + '/index.html'));
	}
}).listen(3100, function(){
	console.log('Listening at: http://localhost:3100');
});
