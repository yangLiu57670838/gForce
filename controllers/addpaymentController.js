var express = require("express"),
    bodyParser = require('body-parser'),
    request = require('request'),
    sys = require('util'),
    moment = require('moment'),
    mysql = require('mysql');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');

//must use cookieParser before expressSession
app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 3600000
    },
    resave: false,
    saveUninitialized: true
}));


//need this to work with bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//find all customers name
app.get('/findcustomersName', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT first_name, last_name from booking', function (err, rows, fields) {
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



//find customer cid from customer full name
app.get('/getCID', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            var a = req.query.customerName2.split(", ");
            console.log('first name is ', a[0]);

                        var f = a[0];
                        var l = a[1];
            
            connection.query('SELECT * from booking where first_name = "' + f + '" and last_name = "' + l + '"', function (err, rows, fields) {
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



//add payment
app.post('/addPayment', function (req, res) {
    var customerName2 = req.query.customerName2;
    var paymentStatus = req.query.paymentStatus;
    var paymentAmount = parseInt(req.query.paymentAmount);
    var paymentDate = req.query.paymentDate;
    var currency = req.query.currency;
//    var cid = parseInt(req.query.cid);
    var cid = req.query.cid;
    var staff = req.query.staffname;
	
	var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    
    //database connection set
    var connection = NA;

//        if (req.session.userName) {
//        console.log("session is existing");
//     
//        var staff = req.session.staff;
//
//    } else {
//        console.log("session is not existing");
//        var staff = "";
//    }
    
    console.log('cid is', cid);

    console.log('2' + customerName2 + paymentStatus + paymentAmount + paymentDate + currency);

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                paymentStatus: paymentStatus,
                paymentAmount: paymentAmount,
                paymentDate: paymentDate,
                Currency: currency,
                cid: cid,
                Staff: staff,
				time: time
            };
            connection.query('insert into payment set ?', post, function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        console.log('The solution is: ', rows);
                        //res.redirect('/app/html/addPayment.html');
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




//add payment  repeat week
app.post('/addPaymentRepeatweek', function (req, res) {
    var customerName2 = req.query.customerName2;
    var paymentStatus = req.query.paymentStatus;
    var paymentAmount = parseInt(req.query.paymentAmount);
    var paymentDate = req.query.paymentDate;
    var currency = req.query.currency;
    var staff = req.query.staffname;
	var time = moment().format('MMMM Do YYYY, h:mm:ss a');

    var cid = req.query.cid;
    var values = [];
    var p = req.query.period;
    var times = req.query.times;
    var period = p * 7;
    var day1 = moment(paymentDate, "YY-MM-DD");
    var t = parseInt(times) + 1;
     console.log(t);
    for (i=0; i<t; i++)
        {
            var onetimepayment = [];
            onetimepayment.push(paymentStatus);
            onetimepayment.push(paymentAmount);
            onetimepayment.push(paymentDate);
            onetimepayment.push(currency);
            onetimepayment.push(cid);
            onetimepayment.push(staff);
			onetimepayment.push(time);
            values.push(onetimepayment);
            var day = moment(paymentDate, "YY-MM-DD");
            var newday = day.add(period, 'days');
            paymentDate = newday.format('YY-MM-DD');
            
        }
    //console.log(values);
    
    var connection = NA;
    
    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");

            connection.query('insert into payment (paymentStatus, paymentAmount, paymentDate, Currency, cid, Staff, time) values ?', [values], function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        console.log('The solution is: ', rows);
                        //res.redirect('/app/html/addPayment.html');
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


//add payment  repeat month
app.post('/addPaymentRepeatmonth', function (req, res) {
       var customerName2 = req.query.customerName2;
    var paymentStatus = req.query.paymentStatus;
    var paymentAmount = parseInt(req.query.paymentAmount);
    var paymentDate = req.query.paymentDate;
    var currency = req.query.currency;
    var staff = req.query.staffname;
	var time = moment().format('MMMM Do YYYY, h:mm:ss a');

    var cid = req.query.cid;
    var values = [];
    var period = req.query.period;
    var times = req.query.times;
   
    var day1 = moment(paymentDate, "YY-MM-DD");
    var t = parseInt(times) + 1;
     console.log(t);
    for (i=0; i<t; i++)
        {
            var onetimepayment = [];
            onetimepayment.push(paymentStatus);
            onetimepayment.push(paymentAmount);
            onetimepayment.push(paymentDate);
            onetimepayment.push(currency);
            onetimepayment.push(cid);
            onetimepayment.push(staff);
			onetimepayment.push(time);
            values.push(onetimepayment);
            var day = moment(paymentDate, "YY-MM-DD");
            var newday = day.add(period, 'months');
            paymentDate = newday.format('YY-MM-DD');
            
        }
    //console.log(values);
    
    var connection = NA;
    
    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");

            connection.query('insert into payment (paymentStatus, paymentAmount, paymentDate, Currency, cid, Staff, time) values ?', [values], function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        console.log('The solution is: ', rows);
                        //res.redirect('/app/html/addPayment.html');
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

//find all payments for text input search
app.get('/getpayment', function (req, res) {
    //database connection set
    var connection = NA;
 var cid = req.query.cid;
    connection.connect(function (err) {
        if (!err) {
           
           
            connection.query('SELECT * from payment where cid = "' + cid + '"', function (err, rows, fields) {
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

//check logged in office
app.get('/checkOffice', function (req, res) {

  var office = req.session.office;
  res.end(office);

});