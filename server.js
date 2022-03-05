const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const mqtt = require("mqtt")
var client = mqtt.connect('mqtt://test.mosquitto.org')

const topic1 = "wsn/soilmoisture/node-1/value"
const topic2 = "wsn/soilmoisture/node-2/value"

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));


client.on("connect", function(){
    client.subscribe(topic1)
    client.subscribe(topic2)
    console.log("Connect to broker successfully !")
});

io.on('connection', socket =>{

    client.on('message', function(topic, message){
    
        io.emit('message', {topic : topic, message : message.toString()})
        console.log(message.toString())
    });
    console.log("Client connected")
});

// app.get('/', (req, res)=> {
//     res.sendFile('index.html')
// })


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));