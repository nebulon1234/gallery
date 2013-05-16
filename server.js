"use strict";

var express = require('express');
var path = require('path');
var os = require('os');
var fs = require('fs');

var gallery = require('./server/api_gallery.js');

var argPath = process.argv[2] ? process.argv[2] : ".";
var port = 80;
var directory = argPath[0] !== "/" ? path.join(process.cwd(), argPath) : argPath;
var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(directory));
app.use(express.directory(directory, { icons: true }));

app.listen(port);
console.log("Server listening on port " + port + " serving files from " + directory);

var ifaces = os.networkInterfaces();
for (var dev in ifaces) {
    ifaces[dev].forEach(function (details) {
        if (details.family === 'IPv4') {
            console.log("Address: " + details.address);
        }
    });
}

gallery.installRoutes(app);

console.log(app.routes);