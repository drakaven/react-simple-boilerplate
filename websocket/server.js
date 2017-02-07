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


wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', function (data, flags) {
        let parsed = (JSON.parse(data));
        parsed.id = uuid.v4();
        console.log(parsed);

        wss.clients.forEach(function each(client) {
            if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify(parsed));
                console.log('broadcast')
            }
        });
    });

    ws.on('close', () => console.log('Client disconnected'));
})
