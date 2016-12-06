var express = require("express"),
    mysql = require('mysql');

// getsubmission
app.get('/getsubmission', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT qid, cid, date, redflag, yellowflag from compliance', function (err, rows, fields) {
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



// getAllinfo
app.get('/getAllinfo', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT first_name, last_name, prefferd_contact_no, cid from booking', function (err, rows, fields) {
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


// getComplianceDetails
app.get('/getComplianceDetails', function (req, res) {
    //database connection set
    var connection = NA;
    var qid = req.query.qid;
    //console.log(qid);
    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT * from compliance where qid = "' + qid + '"', function (err, rows, fields) {
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


// getinfo
app.get('/getinfo', function (req, res) {
    //database connection set
    var connection = NA;
    var cid = req.query.cid;
    console.log('test cid', cid);
    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT first_name, last_name, prefferd_contact_no from booking where cid = "' + cid + '"', function (err, rows, fields) {
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


//get wanted info from two tables
app.get('/getWantedInfo', function (req, res) {
    //database connection set
    var connection = NA;
    
    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT first_name, last_name, prefferd_contact_no, qid, booking.cid, date, email, redflag, yellowflag from booking, compliance where booking.cid = compliance.cid', function (err, rows, fields) {
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

//getInComplianceCustomer
app.get('/getInComplianceCustomer', function (req, res) {
    //database connection set
    var connection = NA;
    
    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT first_name, last_name, prefferd_contact_no, cid, email from booking', function (err, rows, fields) {
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


//get compliance list for particular customer profile in profile page
app.get('/getComplianceList', function (req, res) {
    //database connection set
    var connection = NA;
    
    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT qid, date, staff, redflag, yellowflag from compliance where cid = "' + req.query.cid + '"', function (err, rows, fields) {
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
