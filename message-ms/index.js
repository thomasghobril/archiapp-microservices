// Import the Express module
const express = require('express');

// Create an instance of the Express application
const app = express();

var allMsgs = ["Hello World", "foobar", "CentraleSupelec Forever"]

app.get('/msg/get/*', function(req, res) {
    var id = req.url.substring(req.url.lastIndexOf('/')+1);
    if (!isNaN(id) && parseInt(id) < allMsgs.length) {
        res.json({"code": 1, "msg": allMsgs[parseInt(id)]});
    } else {
        res.json({"code": 0});
    }
});

// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});