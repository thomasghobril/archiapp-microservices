// Import the Express module
const express = require('express');

// Create an instance of the Express application
const app = express();

var allMsgs = ["Hello World", "foobar", "CentraleSupelec Forever"];

app.get('/msg/post/*', function (req, res) {
    const msg = req.substring(10);
    allMsg.push(msg);
    res.json({code: 1});
});

app.get('/msg/get/*', function(req, res) {
    var id = req.url.substring(req.url.lastIndexOf('/')+1);
    if (!isNaN(id) && parseInt(id) < allMsgs.length) {
        res.json({"code": 1, "msg": allMsgs[parseInt(id)]});
    } else {
        res.json({"code": 0});
    }
});

app.get('/msg/getAll', function (_, res) {
    res.json({code: 1, allMsg});
});

app.get('/msg/nber', function (_, res) {
    const count = allMsg.length();
    res.json({code: 1, count});
});

app.get('/msg/del/*', function (_, res) {
    const arg = req.substring(9);

    if (isNaN(arg)) {
        res.json({code: 0, detail: "Error: the message number could not be parsed"});
        return;
    }

    const id = parseInt(arg);

    if (allMsgs.length() <= id) {
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
