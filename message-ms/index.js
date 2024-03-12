// Import the Express module
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

// Create an instance of the Express application
const app = express();
const port = 3003;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(function(_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var allMsgs = [["Hello World", new Date().toUTCString()], ["CentraleSupelec Forever", new Date().toUTCString()]];

wss.on('connection', function(ws) {
    console.log("New websocket connection");
    wss.on('message', function(message) {
        console.log('received: %s', message);
    });
});

app.post('/msg/post', function (req, res) {
    const body = req.body;

    if (body["content"] == "") {
        res.json({code: 0, detail: "Error: empty message"});
        return;
    }

    allMsgs.push([body["content"], new Date().toUTCString()]);
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send("Message list updated!");
        }
    });
    res.json({code: 1});
});

app.get('/msg/get/*', function(req, res) {
    var id = req.url.substring(9);

    if (isNaN(id) || parseInt(id) >= allMsgs.length) {
        res.json({"code": 0});
        return;
    }
    
    res.json({"code": 1, "msg": allMsgs[parseInt(id)]});
});

app.get('/msg/getAll', function (_, res) {
    res.json({code: 1, allMsgs});
});

app.get('/msg/nber', function (_, res) {
    const count = allMsgs.length;
    res.json({code: 1, count});
});

app.get('/msg/del/*', function (req, res) {
    const arg = req.url.substring(9);

    if (isNaN(arg)) {
        res.json({code: 0, detail: "Error: the message number could not be parsed"});
        return;
    }

    const id = parseInt(arg);

    if (allMsgs.length <= id) {
        res.json({code: 0, detail: "Error: the provided message id does not exist"});
        return;
    }

    allMsgs.splice(id, 1);
    res.json({code: 1});
})

// Start the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
