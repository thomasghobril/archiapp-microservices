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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});