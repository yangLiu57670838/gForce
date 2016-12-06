var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
//    bcrypt = require('bcrypt'),
    mysql = require('mysql');



//find all users
app.get('/findUsers', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            connection.query('SELECT * from users2', function (err, rows, fields) {
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

//add user
app.post('/addUser', function (req, res) {


    var p = req.query.p;
//    var salt = bcrypt.genSaltSync(15); //15 times
//    var hash = bcrypt.hashSync(p, salt);
    
    //for test
    var hash = p;

    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                email: req.query.e,
                password: hash,
                first_name: req.query.f,
                last_name: req.query.l,
                role: req.query.r,
                office: req.query.o
            };
            connection.query('insert into users2 set ?', post, function (err, rows, fields) {
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


//test check password
app.get('/checkptest', function (req, res) {
    console.log('test test');

    bcrypt.compare("vahid@globalworkandtravel.com", "$2a$10$Se1Kf/MfHMV/SaKjy4gDR.gu0UVi27nhlkD0mRG1RYe5rXEhLTBFO", function (err, res2) {
        // res2 === true
        console.log(res2);

    });


});


//delete user
app.post('/deleteUser', function (req, res) {


    var email = req.query.email;

    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");

            connection.query('delete from users2 where email = "' + email + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        console.log('The solution is: ', rows);
                        //res.redirect('/app/html/addPayment.html');
                        res.end('works');
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


//edit user
app.post('/editUser', function (req, res) {
console.log('test hey');

    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");

            connection.query('UPDATE users2 SET first_name = "' + req.query.f + '", last_name = "' + req.query.l + '", role = "' + req.query.r + '", office = "' + req.query.o + '", email = "' + req.query.e + '" WHERE id = "' + req.query.id + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        console.log('edited');
                        res.end();

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


//change password
app.post('/changePassword', function (req, res) {

    var p = req.query.p;
    var salt = bcrypt.genSaltSync(15); //15 times
    var hash = bcrypt.hashSync(p, salt);

    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");

            connection.query('UPDATE users2 SET password = "' + hash + '" WHERE email = "' + req.query.e + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {

                        console.log('password changed');
                        res.end();

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
