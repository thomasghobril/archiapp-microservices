// Import the Express module
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

// Create an instance of the Express application
const app = express();
const port = 3006;

app.use(function(_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var users = {
    "": "Anonymous"
};

app.post('/usr/update', function (req, res) {
    const body = req.body;
    if (body["user"] == "") {
        res.json({code: 0});
        return;
    }
    console.log(body);
    users[body["user"]] = body["username"];
    res.json({code: 1});
});

app.post('/usr/get/', function(req, res) {
    const body = req.body;
    if (!(body["user"] in users)) {
        res.json({code: 0});
        return;
    }
    console.log(body);
    res.json({code: 1, username: users[body["user"]]});
});

app.get('/usr/getAll', function (_, res) {
    res.json({code: 1, users});
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
