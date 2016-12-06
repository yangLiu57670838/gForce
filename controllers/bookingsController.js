var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    mysql = require('mysql'),
	wkhtmltopdf = require('wkhtmltopdf'),
	moment = require('moment');

var globals = require('./globalVAR');//global variable 
//var requestjson = require('request-json');


//find all customers
app.get('/findNewBookingCustomers', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            connection.query('SELECT cid, first_name, last_name, email, office, trip_experience_name, time from booking where office = "' + req.query.office + '" and time > "2016-04-15 23:59:59" and cid NOT IN (SELECT cid FROM departments)', function (err, rows, fields) {
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