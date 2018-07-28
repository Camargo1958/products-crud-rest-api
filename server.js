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
mongoose.connect('mongodb://hazak:hzk123@ds257981.mlab.com:57981/product-api-test',{ useNewUrlParser: true });

// URI local MongoDB
// mongoose.connect('mongodb://localhost/test');

// App config to use 'bodyParser()'
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Defining API port
var port = process.env.port || 8000;

// API routes
//==============================================================
// Creating routes instance by Express
var router = express.Router();

app.use(function(req, res, next) {
    console.log('Something is going on here!...');
    next();
});

// Example route for test
router.get('/',function(req,res){ 
    res.json({message:'Beleza! Bem vindo a nossa loja XYZ'})
});

// API's
//===============================================================
// Routes tha end with '/products' (used on: GET ALL & POST)
router.route('/products')

    /* 1)Method: Create Product (acess by: POST http://localhost:8000/api/products) */
    .post(function(req, res) {
        var product = new Product();

        //Set Product properties (by request):
        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;

        product.save(function(error){
            if(error){
                res.send('Error on trying to save Product : '+ error);
                //console.log('Error on trying to save Product : ' + error);
            }
            res.json({ message : 'Product saved with success!' });
        });

    });


// Defining routes prefix '/api'
app.use('/api',router);

// Starting App (server)
app.listen(port);

console.log("Starting App on port :"+port);

