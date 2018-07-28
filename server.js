/* *
*
* File: server.js
* Description: server main file
* Authir: Hazak
* Creation date: 26/07/2018
*
*/

// App setup

// Packet calls
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Product = require('./app/models/product');

// Connect to DB
// URI MLab - Cloud
mongoose.connect('mongodb://<hazak>:<hzk123>@ds257981.mlab.com:57981/node-crud-api');

// URI local MongoDB
//mongoose.connect('mongodb://localhost/test');

// App config to use 'bodyParser()'
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Defining API port
var port = process.env.port || 8000;

// Creating routes instance by Express
var router = express.Router();

// Example route for test
router.get('/',function(req,res){ 
    res.json({message:'Beleza! Bem vindo a nossa loja XYZ'})
});

// Defining routes prefix '/api'
app.use('/api',router);

// Starting App (server)
app.listen(port);

console.log("Starting App on port :"+port);

