const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = (data, ws) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState) {
            client.send(data);
            console.log(data);
        }
    });
}


wss.on('connection', (ws) => {
    console.log('Client connected');
    wss.broadcast(JSON.stringify({type: "onlineUsers", onlineUsers :  wss.clients.size}));

    ws.on('message', function (data, flags) {
        let parsed = (JSON.parse(data));
        parsed.id = uuid.v4();
        switch(parsed.type)
        {
            case "postNotification" :
            parsed.type = "incomingNotification"
            break;            
            case "postMessage":
            parsed.type = "incomingMessage"
    }


        console.log(parsed);
        wss.broadcast(JSON.stringify(parsed));
        console.log(wss.clients.size);
    });
    ws.on('close', () => {
        console.log('Client disconnected')
        wss.broadcast(JSON.stringify({type: "onlineUsers", onlineUsers :  wss.clients.size}));
    }
    );

})
