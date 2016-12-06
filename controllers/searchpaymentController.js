var express = require("express"),
    bodyParser = require('body-parser'),
    mysql = require('mysql');

//find all payments and customers full name from payment and booking table
app.get('/findmergePayments', function (req, res) {
   
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT payment.paymentStatus, payment.paymentAmount, payment.paymentDate, payment.paymentID, payment.Currency, payment.cid, payment.Staff, booking.first_name, booking.last_name from payment, booking where payment.cid = booking.cid', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {

                        res.end(JSON.stringify(rows));
                        console.log("hello world all payments");
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


//find all payments for all users
app.get('/findAllPayments', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT * from payment', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {

                        res.end(JSON.stringify(rows));
                        console.log("hello world all payments");
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

//find all cid's name about payment
app.get('/findcidname', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT first_name, last_name from booking where cid = "' + req.query.cid + '"', function (err, rows, fields) {
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


//find all overdues
app.get('/findOverdues', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");

            connection.query('SELECT payment.paymentStatus, payment.paymentAmount, payment.paymentDate, payment.paymentID, payment.Currency, payment.cid, payment.Staff, booking.first_name, booking.last_name from payment, booking where payment.cid = booking.cid and payment.paymentStatus = "Next" and payment.paymentDate < CURDATE()', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end(JSON.stringify(rows));
                        console.log('return', rows);
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



//change payment info
app.get('/changePayment', function (req, res) {
    console.log("testing testing: ", req.query.paymentID);
    console.log("testing testing: ", req.query.paymentAmount);
    console.log("testing testing: ", req.query.paymentStatus);
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE payment SET paymentStatus = "' + req.query.paymentStatus + '", paymentAmount = "' + req.query.paymentAmount + '", paymentDate = "' + req.query.paymentDate + '" WHERE paymentID = "' + req.query.paymentID + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('It worked!');
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
