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
var mongodb = require('mongodb');
//var raven = require('raven');


//client.patchGlobal();

//var MongoClient = require('mongodb').MongoClient;
//var assert = require('assert');
//
//var url = 'mongodb://localhost:27017/test';
//MongoClient.connect(url, function(err, db){
//    assert.equal(null, err);
//    console.log("connected correctly to server.");
//    db.close();
//    
//});

//var MongoClient = mongodb.MongoClient;
//
//var url = 'mongodb://localhost:3000/globalcrm';
//
//// Use connect method to connect to the Server
//MongoClient.connect(url, function (err, db) {
//  if (err) {
//    console.log('Unable to connect to the mongoDB server. Error:', err);
//  } else {
//    //HURRAY!! We are connected. :)
//    console.log('Connection established to', url);
//
//    // do some work here with the database.
//
//    //Close connection
//    db.close();
//  }
//});

//connect to mongoda
//mongoose.connect('mongodb://localhost:3000/globalcrm');
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function (callback) {
//  // connected
////    var travelSchema = mongoose.Schema({
////        first_name: String
////        
////    });
////    
////    //methods must define before model defining
////    travelSchema.methods.test = function () {
////        var greeting =this.first_name
////        ? "name is " + this.first_name
////        : "no first name";
////        console.log(greeting);
////    }
////    
////    var travel = mongoose.model('Travel', travelSchema);
////    
//    
//});



global.app = express();
var requireTree = function (dir) {
    dir = fspath.join(__dirname, dir);
    fs.readdirSync(dir).forEach(function (file) {
        if (/(.*)\.js$/.test(file))
            require(fspath.join(dir, file));
    });
};




// from this code we include all node js controllers 
requireTree('controllers');


//var acl = require('acl'),
//    Backend = require('acl-mem-regexp'),
//    acl = new acl(new Backend());
var Acl = require("virgen-acl").Acl,
    acl = new Acl();

// Set up roles
acl.addRole("travelsales"); // guest user, inherits from no one
acl.addRole("sales", "travelsales"); // member inherits permissions from guest
acl.addRole("admin"); // Admin inherits from no one

// Set up resources
acl.addResource("sales"); // blog resource, inherits no resources
acl.addResource("bookings");
acl.addResource("dashboard");

// Set up access rules (LIFO)
//acl.deny();                               // deny all by default
acl.allow("admin"); // allow admin access to everything
acl.allow("sales", "sales", "view"); // allow members to comment on blogs
acl.allow(null, "dashboard", "view"); // allow everyone to view the blogs
acl.allow("admin", "bookings", ["view", "delete"]) // supports arrays of actions



//need this to find path in html
app.use('/', express.static(__dirname + '/'));

app.use(express.static('uploads'));//access file in uploads folder directly, i.e. access image url directly 

//must use cookieParser before expressSession

//app.use(cookieParser());
//app.use(expressSession({secret: 'ssshhhhh'}));
app.use(expressSession({
    secret: 'keyboard cat',
    cookie: {},
    resave: false,
    saveUninitialized: false
}));





//need this to work with bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/pages-login.html'));
    //__dirname : It will resolve to your project folder.
});



//setacl
app.post('/setacl', function (req, res) {




});



//customerName search box
app.get('/search', function (req, res) {
    console.log(req.query.key);
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('SELECT customerName from payment where customerName like "%' + req.query.key + '%"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        var data = [];
                        for (i = 0; i < rows.length; i++) {
                            data.push(rows[i].customerName);
                            console.log("abc", rows[i].customerName);
                        }
                        res.end(JSON.stringify(data)); //?????
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

//find all payments
app.get('/findPayments', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");

            connection.query('SELECT * from payment"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {

                        res.end(JSON.stringify(rows));
                        console.log("hello world");
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

app.get('/addFakeSession', function (req, res) {
   correct = "true"; 

                                    req.session.cookie.expires = false;
                                    
                                    
                                    req.session.userName = 'FirstName';
                                    req.session.staff = 'FirstName LastName';
                                    req.session.userEmail = 'test@gmail.com';
                                    req.session.role = 'superadmin';
                                    req.session.office = 'Australia';
									req.session.staffid = '3';
                                    console.log(correct);
                                    res.end(correct);


});


app.get('/findFakePassword', function (req, res) {
    var correct = "false";
    res.end(correct);
});    
//app.get('/findPassword', function (req, res) {
//    //database connection set
//    var connection = NA;
//
//    //email need to be checked before ask mysql, need to be fixed later
//    console.log(req.query.email);
//    console.log(req.query.password);
//
//    connection.connect(function (err) {
//        if (!err) {
//            console.log("Database is connected ... \n\n");
//            connection.query('SELECT * from users2 where email = "' + req.query.email + '"', function (err, rows, fields) {
//                connection.end(function (err) {
//                    if (!err) {
//                        if (rows.length != 0) {
//
//
//                            //console.log("aa jjaa jjaa ", rows[0].paid_car_number);
//                            var correct = "false";
//                            var username = rows[0].first_name;
//                            var staff = rows[0].first_name + ' ' + rows[0].last_name;
//                            var truePassword = rows[0].password;
//                            //                            var salt = rows[0].salt;
//                            //                            var mix = req.query.password + salt;
//                            //                            var sha256 = hash.sha256(mix);
//                            //                            for (var round = 0; round < 65536; round++) {
//                            //                                mix = sha256 + salt;
//                            //                                sha256 = hash.sha256(mix);
//                            //                                //console.log(sha256);
//                            //                            }
//                            //                            console.log('truepassword is: ', truePassword);
//                            //                            console.log(sha256);
//                            bcrypt.compare(req.query.password, truePassword, function (err, res2) {
//                                // res2 === true
//                                //console.log(res2);
//
//                                if (res2 == true) {
//                                    correct = "true"; 
//                                    
////                                    //set session expire in 60 sec 
////                                    req.session.cookie.maxAge = 60000; 
////                                    req.session.cookie.expires = new Date(Date.now() + 60000);
//                                    
//                                    // This user should log in again after restarting the browser
//                                    req.session.cookie.expires = false;
//                                    
//                                    
//                                    req.session.userName = username;
//                                    req.session.staff = staff;
//                                    req.session.userEmail = rows[0].email;
//                                    req.session.role = rows[0].role;
//                                    req.session.office = rows[0].office;
//									req.session.staffid = rows[0].id;
//                                    console.log(correct);
//                                    //res.end('it is correct!');
//                                    res.end(correct);
//                                } else {
//                                    console.log(correct);
//                                    res.end(correct);
//                                }
//
//                            });
//
//                            //res.end(JSON.stringify(rows));
//
//                        } //need to add wrong user name notification here later
//                        else
//                            {
//                                console.log('wrong email');
//                                var correct = "wrongemail";
//                                res.end(correct);
//                            }
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

app.get('/checkLogin', function (req, res) {
    if (req.session.userName) {
        console.log("session is existing");
        console.log('session remains', req.session.cookie.maxAge);
        var login = "true";
        var username = req.session.userName;
        var email = req.session.userEmail;
        var role = req.session.role;
        var office = req.session.office;
        var staffname = req.session.staff;
		var staffid = req.session.staffid;
        var staff = [];
        staff.push(login);
        staff.push(username);
        staff.push(email);
        staff.push(role);
        staff.push(office);
        staff.push(staffname);
		staff.push(staffid);
        res.end(JSON.stringify(staff));

    } else {
        console.log("session is not existing");
        var login = "false";
        var staff = [];
        staff.push(login);
        res.end(JSON.stringify(staff)); //the way to send json data back
        

    }


});

//dashboard
app.get('/checkStaff', function (req, res) {
    if (req.session.userName) {
        console.log("session is existing in dashboard");
        console.log('session remains in dashboard', req.session.cookie.maxAge);
        var login = "true";
        var staffname = req.session.userName;
        var staff = [];
        staff.push(login);
        staff.push(staffname);
        res.end(JSON.stringify(staff));

    } else {
        console.log("session is not existing");
        var login = "false";
        var staff = [];
        staff.push(login);
        res.end(JSON.stringify(staff)); //the way to send json data back
    }


});

app.get('/checkIP', function (req, res) {
    console.log(req.connection.remoteAddress);
    var IPFromRequest = req.connection.remoteAddress;
    var indexOfColon = IPFromRequest.lastIndexOf(':'); //delete ::ffff:before ip address, make ::1 becoming 1
    var ip = IPFromRequest.substring(indexOfColon + 1, IPFromRequest.length);
    console.log(ip);

    if ((ip == '62.232.168.204') || (ip == '62.232.168.205') || (ip == '58.7.230.154') || (ip == '59.100.209.94') || (ip == '216.113.200.63') || (ip == '1') || (ip == '146.88.72.99')) {
        var location = "true";
        res.end(location);
    } else {
        var location = "false";
        res.end(location);
    }


});
app.get('/logout', function (req, res) {

    req.session.destroy(function (err) {
        console.log("session is killed");
        res.end();
    })

});




//check permission 
app.get('/checkpermission', function (req, res) {


    console.log("checking permission");


    // Query the ACL
    acl.query("admin", "bookings", "view", function (err, allowed) {
        if (allowed) {
            console.log("yes permission");
        } else {
            console.log("no permission");
        }
    });

    // Query the ACL
    acl.query("sales", "sales", "delete", function (err, allowed) {
        if (allowed) {
            console.log("yes permission");
        } else {
            console.log("no permission");
        }
    });


});


//find customer from top nav search
app.get('/searchCustomer', function (req, res) {
    //database connection set
    var connection = NA;
    
       var a = req.query.input.split(" ");
    console.log(a.length, a);
 var cid = a[a.length-1];

    connection.connect(function (err) {
        if (!err) {
           
           
            connection.query('SELECT * booking where cid = "' + cid + '"', function (err, rows, fields) {
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

//find all customers for top search input
app.get('/findAllCustomer', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            connection.query('SELECT cid, first_name, last_name, email from booking', function (err, rows, fields) {
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

//find all customers for top search input
app.get('/findSearchedCustomer', function (req, res) {
    //database connection set
    var connection = NA;
    
var input = req.query.input;
    
    connection.connect(function (err) {
        if (!err) {

            connection.query('SELECT cid, first_name, last_name, email from booking where first_name LIKE "%' + input + '%" or last_name LIKE "%' + input + '%" or email LIKE "%' + input + '%" or cid LIKE "%' + input + '%"', function (err, rows, fields) {
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



//express.static allows to access /app/html with url /
app.use('/', express.static(__dirname + '/app/html'));
app.listen(3000);
console.log("Running at Port 3000");
