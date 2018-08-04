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

// URI MLab - Cloud
//mongoose.connect('mongodb://localhost:27017/product-api-test',{ useMongoClient: true });

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

    })

    /* 2)Method: Select all Products (acess by: GET http://localhost:8000/api/products) */
    .get(function(req, res) {
        Product.find(function(error, products) {
            if(error)
                res.send('Error on trying to select all Products : '+error);
            res.json(products);
        });
    });

    // Routes that end in '/poducts/:product_id (wil serve for : GET, PUT & DELETE: id):
router.route('/products/:product_id')

    /* 3)Method: Select Product by Id (acess by: GET http://localhost:8000/api/products/:product_id) */
    .get(function (req, res) {
        /* To select some Product by Id*/
        Product.findById(req.params.product_id, function(error, product){
            if(error || product===null){
                //res.send('Product Id not found :' + error);
                res.json({ message: 'Product Id not found!' });
            }
            else{
                res.json(product);
            } 
        });
    })

    /* 4)Method: Update Product by Id (acess by: PUT http://localhost:8000/api/products/:product_id) */
    .put(function (req, res) {
        /* 1 - Select Product by Id*/
        Product.findById(req.params.product_id, function(error, product){
            if(error || product===null)
                {
                    //res.send('Product Id not found :' + error);
                    res.json({ message: 'Product Id not found, not updated!' });
                }
            else{
                    /* 2 - Update Product fields */
                    product.name = req.body.name;
                    product.price = req.body.price;
                    product.description = req.body.description;

                    /* 3 - Save Product data */
                    product.save(function(error){
                        if(error)
                            res.send('Error on save Product :' + error);
                        res.json({ message: 'Product updated!' });
                    });
            }
        });
    })

    /* 5)Method: Delete Product by Id (acess by: DELETE http://localhost:8000/api/products/:product_id) */
    .delete(function (req, res) {
        _id = req.params.product_id;
        Product.findById(_id, function(error, product){
            if(error || product===null)
                {
                    res.json({ message: 'Product Id not found, not deleted! ' + error });
                }
            else{
                Product.remove({_id}, function(error){
                    if(error)
                        res.json({ message: 'Product not deleted, ERROR! ' + error });
                    res.json({ message: 'Product deleted!' });
                });
            }
        })
    });



// Defining routes prefix '/api'
app.use('/api',router);

// Starting App (server)
app.listen(port);

console.log("Starting App on port :"+port);

