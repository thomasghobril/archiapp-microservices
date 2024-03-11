// Import the Express module
const express = require('express');

// Create an instance of the Express application
const app = express();

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/test/*', function(req, res) {
    var msg = req.url.substring(1);
    res.json({"msg": msg.substring(msg.indexOf('/')+1)});
});

mydata = {
    name: "counter",
    value: 0
}

app.get('/cpt/inc', function(req, res) {
    if ('v' in req.query) {
        // check if the value is a number
        if (!isNaN(req.query.v)) {
            mydata.value+=parseInt(req.query.v);
            res.json({"code": 0});
        } else {
            res.json({"code": -1});
        }
    } else {
        ++mydata.value;
        res.json({"code": 0});
    }
});

app.get('/cpt/query', function(req, res) {
    res.json(mydata);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});