var express = require("express"),
    request = require('request'),
    bodyParser = require('body-parser'),
    mysql = require('mysql');

//need this to work with bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//add customer
app.post('/', function (req, res) {
    var customerName = req.body.customerName;
    var programName = req.body.programName;
    var programPriceString = req.body.programPrice;
    var programPrice = parseInt(programPriceString);
    console.log(customerName);
    console.log(programName);
    console.log(programPrice);
    //database connection set
    var connection = NA;
    
    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
        } else {
            console.log("Error connecting database ... \n\n");
        }
    });
    var post = {
        customerName: customerName,
        programName: programName,
        programPrice: programPrice
    };
    connection.query('insert into test set ?', post, function (err, rows, fields) {
        connection.end();
        if (!err) {
            console.log('The solution is: ', rows);
            res.redirect('/views/main/main.html');

        } else {
            console.log('Error while performing Query.');
        }

    });
});
