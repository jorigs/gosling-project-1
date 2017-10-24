const express = require("express");

var app = express();

app.use('/', express.static(__dirname));

app.listen(5000, function() {
    console.log('server is listening on http://localhost:5000\nTo stop, press CTRL-C');
});