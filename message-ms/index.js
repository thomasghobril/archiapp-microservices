// Import the Express module
const express = require('express');

// Create an instance of the Express application
const app = express();

app.use(function(_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var allMsgs = ["Hello World", "foobar", "CentraleSupelec Forever"];

app.post('/msg/post', function (req, res) {
    const body = req.body.content;

    if (body.content == "") {
        res.json({code: 0, detail: "Error: empty message"});
    }

    allMsgs.push(body.content);
    res.json({code: 1});
});

app.get('/msg/get/*', function(req, res) {
    var id = req.url.substring(9);
    if (!isNaN(id) && parseInt(id) < allMsgs.length) {
        res.json({"code": 1, "msg": allMsgs[parseInt(id)]});
    } else {
        res.json({"code": 0});
    }
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
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
