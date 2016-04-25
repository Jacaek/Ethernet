var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var b = require('bonescript');

app.listen(8080);

var htmlPage = 'index.html';
function handler (req, res) {
  fs.readFile(htmlPage,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading file: ' + htmlPage);
      }
      res.writeHead(200);
      res.end(data);
    });
} 

setInterval(readTemperature,5000)
setInterval(readPressure, 5000)
setInterval(readCpuTemperature, 5000)

var temperatureLocation = '/sys/bus/i2c/drivers/bmp085/1-0077/temp0_input';
var pressureLocation = '/sys/bus/i2c/drivers/bmp085/1-0077/pressure0_input';
var cpuTemperatureLocation = '/sys/devices/ocp.3/44e10448.bandgap/temp1_input';

function readCpuTemperature(){

    fs.readFile(cpuTemperatureLocation, function read(err, data) {
        if (err) {
            throw err;
        }
        sendCpuTemperature(parseInt(data)/1000);
    });
}


function readTemperature(){

    fs.readFile(temperatureLocation, function read(err, data) {
        if (err) {
            throw err;
        }
        sendTemperature(parseInt(data)/10 - 3);
    });
}

function readPressure(){

    fs.readFile(pressureLocation, function read(err, data) {
        if (err) {
            throw err;
        }
        sendPressure(parseInt(data)/100);
    });
}

function sendCpuTemperature(x){
    io.sockets.emit('cpuTemperature', '{"cpuTemperature":"'+x+'"}');
}

function sendPressure(x){
    io.sockets.emit('pressure', '{"pressure":"'+x+'"}');
}

function sendTemperature(x) {
    io.sockets.emit('temperature', '{"temperature":"'+x+'"}');
}





