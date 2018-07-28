/* 
*
* File: product.js
* Description: product schema for Mongoose
* Authir: Hazak
* Creation date: 27/07/2018
* Docs: http://mongoosejs.com/docs/schematypes
*
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* 
* Product:
*
* -> id: int
* -> name: String
* -> price: Number
* -> description: String
*
* dbname: node-crud-api
* user: node-crud-api
* password: hzk123
*/

var ProductSchema = new Schema({
    nome: String,
    price: Number,
    description: String
});

module.exports = mongoose.model('Product',ProductSchema);