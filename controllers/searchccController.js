var express = require("express"),
    md5 = require('md5'),
    crypto = require('crypto'),
    hash = require('node_hash'),
    expressSession = require('express-session'),
    cookieParser = require('cookie-parser'),
    request = require('request'),
    mysql = require('mysql');



app.get('/findfromcid', function (req, res) {
    console.log(req.query.cid);
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('SELECT * from booking where cid = "' + req.query.cid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        if (rows.length != 0) {

                            console.log("aa jjaa jjaa ", rows[0].paid_car_number);
                            //decode card number here
                            var c = rows[0].paid_card_number;
                            var pass1 = "TGW&T!!2015@@";
                            var pass2 = "Dev_213@023TR";
                            var first_name = rows[0].first_name;
                            var last_name = rows[0].last_name;
                            var secure_string_1 = md5(first_name + '|' + pass1);
                            var secure_string_2 = md5(last_name + '|' + pass2);
                            console.log(first_name + '|' + pass1);
                            console.log(secure_string_1);
                            console.log(secure_string_2);
                            //console.log('hello staff: ', req.session.userName);
                            if (c.length > 19) {
                                var b = new Buffer(c, 'base64');
                                var crypttext = b.toString();
                                console.log(crypttext);
                                //test
                                /* var decrypttext = mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $key1, $crypttext, MCRYPT_MODE_ECB, $key2);
        return trim($decrypttext);*/
                                //var unscc = decrypt_text(c, secure_string_1, secure_string_2);
                            } else {
                                var unscc = c;
                            }
                            request('http://globalworkandtravel.com/yang/test.php?cid=' + rows[0].cid, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    //console.log(body);
                                    console.log(response.request.response.body);
                                    var unscc = response.request.response.body;

                                    rows[0].paid_car_number = unscc;
                                    res.end(JSON.stringify(rows));
                                }
                            });


                        }

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
