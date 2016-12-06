var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    mysql = require('mysql'),
	wkhtmltopdf = require('wkhtmltopdf'),
	moment = require('moment');

var globals = require('./globalVAR');//global variable 
//var requestjson = require('request-json');



//old: find from booking table
//app.get('/findNewBookingCustomersSalesdone', function (req, res) {
//    var connection = NA;
//
//    connection.connect(function (err) {
//        if (!err) {
//
//            connection.query('SELECT cid, first_name, last_name, email, office, trip_experience_name, time from booking where office = "' + req.query.office + '" and dep_status = "sales" and time > "2016-02-12 23:59:59"', function (err, rows, fields) {
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
//});


//find all customers from departments and booking table
app.get('/findNewBookingCustomersSalesdone', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            connection.query('SELECT booking.cid, booking.first_name, booking.last_name, booking.email, booking.office, booking.trip_experience_name, booking.time from booking, departments where booking.cid = departments.cid and booking.office = "' + req.query.office + '" and departments.status = "admin" and booking.time > "2016-02-12 23:59:59"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {

                        res.end(JSON.stringify(rows));

                    } else {
                        console.log('Error while performing Query.');
                    }
                });
            });
        } else {
            console.log("Error connecting database ... \n\n");
        }
    });
});