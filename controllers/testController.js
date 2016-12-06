var express = require("express"),
    //app = express(),
    path = require("path"),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    md5 = require('md5'),
    crypto = require('crypto'),
    request = require('request'), //make http call
    //sys = require('sys'),
    sys = require('util'),
    hash = require('node_hash'),
    fs = require('fs'), //file system is used to read separate js files in controller folder
    fspath = require('path'),
//    bcrypt = require('bcrypt'),
    moment = require('moment'),
    expressSession = require('express-session'),
    cookieParser = require('cookie-parser'),
    requestIp = require('request-ip'),
    mongoose = require('mongoose');
//var mongodb = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

app.get('/testMongoose', function (req, res) {
    
	
//test mongodb working or not	
//var url = 'mongodb://localhost:27017/test';
//MongoClient.connect(url, function(err, db) {
//  assert.equal(null, err);
//  console.log("Connected correctly to server.");
//  db.close();
//});
	





//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function() {
//  // we're connected!
//	console.log('seems working');
//	
//var movieSchema = new mongoose.Schema({
//  title: { type: String }
//, rating: String
//, releaseYear: Number
//, hasCreditCookie: Boolean
//});
//
//	
//	
//});
//
//	
////mongoose.createConnection('mongodb://localhost/test');
//mongoose.connect('mongodb://localhost/test');//wrong,, dont know why?
	
	
});

//app.get('/testp', function (req, res) {
//    
//    var connection = NA;
//
//    connection.connect(function (err) {
//        if (!err) {
//
//            console.log("Database is connected ... \n\n");
//            connection.query('SELECT cid from booking', function (err, rows, fields) {
//                connection.end(function (err) {
//                    if (!err) {
//
//                        res.end(JSON.stringify(rows));
//
//                    } else {
//                        console.log('Error while performing Query.');
//                    }
//                });
//            });
//        } else {
//            console.log("Error connecting database ... \n\n");
//        }
//    });
//	
//	
//});