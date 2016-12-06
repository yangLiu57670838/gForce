var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    mysql = require('mysql'),
	wkhtmltopdf = require('wkhtmltopdf'),
	moment = require('moment'),
	expressSession = require('express-session'),
    cookieParser = require('cookie-parser'),
	multer = require('multer');

var globals = require('./globalVAR');//global variable 
//var requestjson = require('request-json');


//find all customers
app.get('/findCustomers', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            connection.query('SELECT cid, first_name, last_name, email, office, trip_experience_name, time from booking', function (err, rows, fields) {
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


//find all profile details
app.get('/findProfile', function (req, res) {
    //database connection set
    var connection = NA;

    console.log('sadasdsadsa', req.query.cid);
    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT * from booking where cid = "' + req.query.cid + '"', function (err, rows, fields) {
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


//get hubspot owner name from owner id
app.get('/getOwnerName', function (req, res) {
    var ownerID = req.query.ownerID;

    request('NA', function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var rows = response.request.response.body;

            var a = JSON.parse(rows);
            //console.log(a[0].ownerId + a[0].firstName + a[0].lastName);

            //console.log(a.length);
            for (var i = 0; i < a.length; i++) {
                //console.log(a[i].ownerId);
                if (a[i].ownerId == ownerID) {

                    var ownerName = a[i].firstName + ' ' + a[i].lastName;

                    break;
                }
            }
            res.end(ownerName);
        }
    })


});


//check cid from marketing table
app.get('/checkMarketingCID', function (req, res) {
    var cid = req.query.cid;
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");

            connection.query('SELECT * from marketing where cid = "' + cid + '"', function (err, rows, fields) {
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

//get all details of travel table
app.get('/findtravel', function (req, res) {
    var cid = req.query.cid;
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");

            connection.query('SELECT * from travel where cid = "' + cid + '"', function (err, rows, fields) {
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

//findAllValues
app.get('/findAllValues', function (req, res) {
    var cid = req.query.cid;
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");

            connection.query('SELECT * from tasks where cid = "' + cid + '" order by taskID DESC', function (err, rows, fields) {
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


//findSalesValue
app.get('/findSalesValue', function (req, res) {
    var cid = req.query.cid;
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");

            connection.query('SELECT * from tasks where cid = "' + cid + '" and taskName = "sales" order by taskID DESC limit 1', function (err, rows, fields) {
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

//findBookingValue
app.get('/findBookingValue', function (req, res) {
    var cid = req.query.cid;
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");

            connection.query('SELECT * from tasks where cid = "' + cid + '" and taskName = "booking" order by taskID DESC limit 1', function (err, rows, fields) {
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




//update hubspot data to mysql database
app.post('/updateHubspot', function (req, res) {
    var cid = req.query.cid;
    var os = req.query.os;
    var createdate = req.query.createdate;
    var hsOwner = req.query.hsOwner;
    var campName = req.query.campName;
    var closeDate = req.query.closeDate;
    console.log('test2', hsOwner);
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE marketing SET hs_analytics_source = "' + os + '", createdate = "' + createdate + '", closedate = "' + closeDate + '", hs_camp_name = "' + campName + '", hubspot_owner_name = "' + hsOwner + '" WHERE cid = "' + cid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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


//insert hubspot data into mysql database
app.post('/insertHubspot', function (req, res) {
    var cid = req.query.cid;
    var os = req.query.os;
    var createdate = req.query.createdate;
    var hsOwner = req.query.hsOwner;
    var campName = req.query.campName;
    var closeDate = req.query.closeDate;
    console.log('test2', hsOwner);
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                cid: cid,
                hs_analytics_source: os,
                createdate: createdate,
                hs_camp_name: campName,
                hubspot_owner_name: hsOwner,
                closedate: closeDate
            };
            connection.query('insert into marketing set ?', post, function (err, rows, fields) {
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

//get hubspot data
app.get('/getHubspotData', function (req, res) {
    var email = req.query.email;

    request('NA', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            //console.log(response.request.response.body);
            var rows = response.request.response.body;

            var a = JSON.parse(rows);

            //console.log('test hereeee', a.properties);


            res.end(JSON.stringify(a.properties));
        }
    })


});

//add customer contents into Zoho
app.post('/callzoho', function (req, res) {
    var oneContact = req.query.oneContact;

    console.log('test zoho', oneContact);

//correct way to send json variable throught post here    
    request({
    url: 'https://zapier.com/hooks/catch/2um8ru/',
    method: "POST",
    json: true,
    headers: {
        "content-type": "application/json",
    },
    body: oneContact
}, function (error, response, body) {
        if (!error && response.statusCode === 200) {
			
            res.end(body.status);
        }
        else {

            console.log("error: " + error)
            console.log("response.statusCode: " + response.statusCode)
            console.log("response.statusText: " + response.statusText)
        }
    })
    

});


//get all coordinators full name
app.get('/getAllCoordinators', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            connection.query('SELECT * from users2 where role = "coordinator"', function (err, rows, fields) {
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

//insert into taskslist table
app.post('/insertOneTask', function (req, res) {
    var cid = req.query.cid;
	var taskName = req.query.taskName;
	var tid = req.query.tid;
	var value = req.query.value;
	var time = moment().format('MMMM Do YYYY, h:mm:ss a');
	
	var user = req.query.user;
	if(req.session.staff)
		{
			var user = req.session.staff;
		}
	

    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('insert into tasks (cid, taskName, tid, value, time, user) values ("' + cid + '", "' + taskName + '", "' + tid + '", "' + value + '", "' + time + '", "' + user + '")', function (err, rows, fields) {
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

//customer profile pdf create
app.get('/createCustomerpdf', function(req, res) {
    
    
    var connection = NA;

    console.log('sadasdsadsa', req.query.rid);
    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT * from booking where cid = "' + req.query.cid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        var cid = rows[0].cid;
                        var first_name = rows[0].first_name;
                        var last_name = rows[0].last_name;
                        var email = rows[0].email;
                        var ip = rows[0].ip;
                        var time = rows[0].time;
                        var nationality = rows[0].nationality;
                        var valid_passport = rows[0].valid_passport;
                        var gender = rows[0].gender;
                        var prefferd_contact_no = rows[0].prefferd_contact_no;
                        var secondary_contact_no = rows[0].secondary_contact_no;                       
                        var skype = rows[0].skype;
                        var age = rows[0].age;
                        var dob = rows[0].dob;
                        var weight = rows[0].weight;
                        var height = rows[0].height;
                        var address = rows[0].address;
                        var suburb = rows[0].suburb;
                        var state = rows[0].state;
                        var country = rows[0].country;
                        var post_code = rows[0].post_code;
                        var trip_experience_name = rows[0].trip_experience_name;
                        var trip_destination = rows[0].trip_destination;
                        var trip_code = rows[0].trip_code;
                        var trip_duration = rows[0].trip_duration;
                        var trip_price = rows[0].trip_price;
                        var addon = rows[0].addon;
                        var date_departure = rows[0].date_departure;
                        var travel_before_exp = rows[0].travel_before_exp;
                        var travel_before_exp_how_long = rows[0].travel_before_exp_how_long;
                        var travel_with_someone = rows[0].traveL_with_someone;
                        var travel_with_someone_who = rows[0].traveL_with_someone_who;        
                        var stay_longer = rows[0].stay_longer;
                        var emrg_contact_name = rows[0].emrg_contact_name;
                        var emrg_contact_relation = rows[0].emrg_contact_relation;
                        var emrg_contact_email = rows[0].emrg_contact_email;
                        var emrg_contact_number = rows[0].emrg_contact_number;
                        var drink_driving_convictions = rows[0].drink_driving_convictions;
                        var drink_driving_convictions_date = rows[0].drink_driving_convictions_date;
                        var drink_driving_convictions_bac = rows[0].drink_driving_convictions_bac;
                        var drink_driving_convictions_describe = rows[0].drink_driving_convictions_describe;
                        var criminal_convictions = rows[0].criminal_convictions;
                        var criminal_convictions_date = rows[0].criminal_convictions_date;
                        var criminal_convictions_describe = rows[0].criminal_convictions_describe;
                        var driving_offences = rows[0].driving_offences;
                        var driving_offences_date = rows[0].driving_offences_date;
                        var driving_offences_describe = rows[0].driving_offences_describe;                        
                        var tattoos = rows[0].tattoos; 
                        var tattoos_describe = rows[0].tattoos_describe; 
                        var medication = rows[0].medication;
                        var medication_describe = rows[0].medication_describe;
                        var health_conditions = rows[0].health_conditions;
                        var health_conditions_describe = rows[0].health_conditions_describe;
                        var smoke = rows[0].smoke;
                        var alcohol = rows[0].alcohol;
                        var illicit = rows[0].illicit;
                        var dietary = rows[0].dietary;
                        var dietary_describe = rows[0].dietary_describe;
                        var hear = rows[0].hear;
                        var hear_other = rows[0].hear_other;
                        var friend_name = rows[0].friend_name;
                        var friend_email = rows[0].friend_email;
                        var friend_number = rows[0].friend_number;
                        var consultant_name = rows[0].consultant_name;
                        var consultant_answer = rows[0].consultant_answer;
                        var consultant_answer_describe = rows[0].consultant_answer_describe;
                        var consultant_guarantee = rows[0].consultant_guarantee;
                        var consultant_guarantee_describe = rows[0].consultant_guarantee_describe;
                        var rate = rows[0].rate;
                        var comments = rows[0].comments;
                        var payment_status = rows[0].payment_status;
                        var paid_amount = rows[0].paid_amount;
                        var paid_date = rows[0].paid_date;
						var promotion = rows[0].promotion;
						var promotionDetail1 = rows[0].promotion_detail1;
						var promotionDetail2 = rows[0].promotion_detail2;
						var promotionDetail3 = rows[0].promotion_detail3;
                        
if ((parseInt(age) < 18) || (age > 30))
{
    var agehtml = '<div class="col l6 rednotification"><span class="boldheading">Age: </span>' + age + '</div>';
}else
    {
        var agehtml = '<div class="col l6"><span class="boldheading">Age: </span>' + age + '</div>';
    }

                        
if (consultant_guarantee == 'Yes')
{
    var guaranteeshtml = '<div class="col l12 rednotification"><span class="boldheading">Any specific or additional guarantees: </span>' + consultant_guarantee + ' ' + consultant_guarantee_describe + '</div>';
}else
    {
        var guaranteeshtml = '<div class="col l12"><span class="boldheading">Any specific or additional guarantees: </span>' + consultant_guarantee + ' ' + consultant_guarantee_describe + '</div>';
    }
           
                        
if (comments != '')
{
    var commentshtml = '<div class="col l12 rednotification"><span class="boldheading">Additional Comments: </span>' + comments + '</div>';
}else
    {
        var commentshtml = '<div class="col l12"><span class="boldheading">Additional Comments: </span>' + comments + '</div>';
    }            
         
                        
if (drink_driving_convictions == 'Yes')
{
    var drinkdrivinghtml = '<div class="col l12 rednotification"><span class="boldheading">Drink Driving: </span>' + drink_driving_convictions + ' ' + drink_driving_convictions_date + ' ' + drink_driving_convictions_bac + ' ' + drink_driving_convictions_describe + '</div>';
}else
    {
        var drinkdrivinghtml = '<div class="col l12"><span class="boldheading">Drink Driving: </span>' + drink_driving_convictions + ' ' + drink_driving_convictions_date + ' ' + drink_driving_convictions_bac + ' ' + drink_driving_convictions_describe + '</div>';
    }     
                        
                         
if (criminal_convictions == 'Yes')
{
    var criminalhtml = '<div class="col l12 rednotification"><span class="boldheading">Criminal: </span>' + criminal_convictions + ' ' + criminal_convictions_date + ' ' + criminal_convictions_describe + '</div>';
}else
    {
        var criminalhtml = '<div class="col l12"><span class="boldheading">Criminal: </span>' + criminal_convictions + ' ' + criminal_convictions_date + ' ' + criminal_convictions_describe + '</div>';
    }                        
         
                        
if (driving_offences == 'Yes')
{
    var trafficoffenceshtml = '<div class="col l12 rednotification"><span class="boldheading">Serious traffic: </span>' + driving_offences + ' ' + driving_offences_date + ' ' + driving_offences_describe + '</div>';
}else
    {
        var trafficoffenceshtml = '<div class="col l12"><span class="boldheading">Serious traffic: </span>' + driving_offences + ' ' + driving_offences_date + ' ' + driving_offences_describe + '</div>';
    }    
     
                        
if (medication == 'Yes')
{
    var medicationshtml = '<div class="col l12 rednotification"><span class="boldheading">Medications: </span>' + medication + ' ' + medication_describe + '</div>';
}else
    {
        var medicationshtml = '<div class="col l12"><span class="boldheading">Medications: </span>' + medication + ' ' + medication_describe + '</div>';
    }                        
 
                        
if (health_conditions == 'Yes')
{
    var healthhtml = '<div class="col l12 rednotification"><span class="boldheading">Diagnosed/Treated: </span>' + health_conditions + ' ' + health_conditions_describe + '</div>';
}else
    {
        var healthhtml = '<div class="col l12"><span class="boldheading">Diagnosed/Treated: </span>' + health_conditions + ' ' + health_conditions_describe + '</div>';
    } 
                        

if (illicit != 'Never')
{
    var illicithtml = '<div class="col l6 rednotification"><span class="boldheading">Use illicit substances: </span>' + illicit + '</div>';
}else
    {
        var illicithtml = '<div class="col l6"><span class="boldheading">Use illicit substances: </span>' + illicit + '</div>';
    }

                        
if (dietary == 'Yes')
{
    var dietaryhtml = '<div class="col l6 rednotification"><span class="boldheading">Dietary requirements: </span>' + dietary + ' ' + dietary_describe + '</div>';
}else
    {
        var dietaryhtml = '<div class="col l6"><span class="boldheading">Dietary requirements: </span>' + dietary + ' ' + dietary_describe + '</div>';
    }                        
                        
                        
var html = '<!DOCTYPE html><html lang=en><head><meta charset=utf-8><link href=' + globals.remoteURL + '/material/assets/css/materialize.css rel=stylesheet><body><div class=container><div class=row><div class="col l12" style="font-size: 23px; font-weight: bold;"><div class="col l6">' + first_name + ' ' + last_name + '</div><div class="col l6">CID: ' + cid + '</div></div><div class="col l12"><div class="col l6"><span class="boldheading">Preferred Contact No.: </span>' + prefferd_contact_no + '</div><div class="col l6"><span class="boldheading">Secondary Contact No.: </span>' + secondary_contact_no + '</div></div><div class="col l12"><div class="col l6"><span class="boldheading">Email: </span>' + email + '</div><div class="col l6"><span class="boldheading">Skype: </span>' + skype + '</div></div><div class="col l12"><div class="col l6"><span class="boldheading">DOB: </span>' + dob + '</div>' + agehtml + '</div><div class="col l12"><div class="col l6"><span class="boldheading">Nationality: </span>' + nationality + '</div><div class="col l6"><span class="boldheading">Valid Passport: </span>' + valid_passport + '</div></div><div class="col l12"><div class="col l6"><span class="boldheading">Gender: </span>' + gender + '</div></div><div class="col l12"><div class="col l12"><span class="boldheading">Address: </span>' + address + ', ' + suburb + ', ' + state + ', ' + country + ' ' + post_code + '</div></div><hr><div class="col l12"><div class="col l6"><span class="boldheading">Experience: </span>' + trip_experience_name + '</div><div class="col l6"><span class="boldheading">Trip Code: </span>' + trip_code + '</div></div><div class="col l12"><div class="col l6"><span class="boldheading">In: </span>' + trip_destination + '</div><div class="col l6"><span class="boldheading">Duration: </span>' + trip_duration + '</div></div><div class="col l12"><div class="col l6"><span class="boldheading">Price: </span>' + trip_price + '</div><div class="col l6"><span class="boldheading">Departure Date: </span>' + date_departure + '</div></div><div class="col l12"><div class="col l12"><span class="boldheading">Travelling with: </span>' + travel_with_someone + ' ' + travel_with_someone_who + '</div></div><div class="col l12"><div class="col l12"><span class="boldheading">Travelling before: </span>' + travel_before_exp + ' ' + travel_before_exp_how_long + '</div></div><hr><div class="col l12">' + drinkdrivinghtml + '</div><div class="col l12">' + criminalhtml + '</div><div class="col l12">' + trafficoffenceshtml + '</div><div class="col l12">' + medicationshtml + '</div><div class="col l12"><div class="col l12"><span class="boldheading">Visible piercings/tattoos: </span>' + tattoos + ' ' + tattoos_describe + '</div></div><div class="col l12">' + healthhtml + '</div><hr><div class="col l12"><div class="col l12"><span class="boldheading">Your Work & Travel Expert name: </span>' + consultant_name + '</div></div><div class="col l12"><div class="col l12"><span class="boldheading">Your Work & Travel Expert answered all your questions: </span>' + consultant_answer + ' ' + consultant_answer_describe + '</div></div><div class="col l12">' + guaranteeshtml + '</div><div class="col l12"><div class="col l12"><span class="boldheading">Promotions: </span>' + promotion + '. ' + promotionDetail1 + ', ' + promotionDetail2 + ', ' + promotionDetail3 + '</div></div><div class="col l12"><div class="col l12"><span class="boldheading">You rated the experience with your work & Travel Expert as: </span>' + rate + '</div></div><div class="col l12"><div class="col l12"><span class="boldheading">Payment Status: </span>' + payment_status + '</div></div><div class="col l12"><div class="col l6"><span class="boldheading">Amount: </span>' + paid_amount + '</div><div class="col l6"><span class="boldheading">Date of Payment: </span>' + paid_date + '</div></div></div><div class=page-break></div></div></body></html>';
                         var datetimestamp = Date.now();
                        var pdfname = first_name + last_name + 'Profile' + datetimestamp;
                        var outputstring = 'pdf/customerProfilePDF/' + pdfname + '.pdf';
                        console.log(outputstring);
                 wkhtmltopdf(html, { pageSize: 'A4', marginBottom: '0mm', marginTop: '5mm', marginLeft: '0', marginRight:'0' })
                    .pipe(fs.createWriteStream(outputstring));
                        res.end(outputstring);

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



app.post('/updateProfileContact', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE booking SET first_name = "' + req.query.f + '", last_name = "' + req.query.l + '", email = "' + req.query.email + '", prefferd_contact_no = "' + req.query.phone + '", skype = "' + req.query.skype + '", address = "' + req.query.address + '", suburb = "' + req.query.suburb + '", state = "' + req.query.state + '", country = "' + req.query.country + '", post_code = "' + req.query.postcode + '" WHERE cid = "' + req.query.cid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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

app.post('/updateProfilePersonal', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE booking SET nationality = "' + req.query.nationality + '", valid_passport = "' + req.query.passport + '", gender = "' + req.query.gender + '", secondary_contact_no = "' + req.query.secondphone + '", age = "' + req.query.age + '", dob = "' + req.query.dob + '", weight = "' + req.query.weight + '", height = "' + req.query.height + '" WHERE cid = "' + req.query.cid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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

app.post('/updateProfileTrip', function (req, res) {
    //database connection set
    var connection = mysql.createConnection({
        host: '166.62.28.146',
        user: 'gforceUser',
        password: 'abcdefg',
        database: 'gforce'
    });

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE booking SET trip_experience_name = "' + req.query.experiencename + '", trip_destination = "' + req.query.destination + '", trip_code = "' + req.query.code + '", trip_duration = "' + req.query.duration + '", trip_price = "' + req.query.price + '", subject = "' + req.query.subject + '" WHERE cid = "' + req.query.cid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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

app.post('/updateProfileAddons', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE booking SET addon = "' + req.query.addon + '" WHERE cid = "' + req.query.cid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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

app.post('/updateProfileTravel', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE booking SET date_departure = "' + req.query.date_departure + '", travel_before_exp = "' + req.query.travel_before_exp + '", travel_before_exp_how_long = "' + req.query.travel_before_exp_how_long + '", traveL_with_someone = "' + req.query.traveL_with_someone + '", traveL_with_someone_who = "' + req.query.traveL_with_someone_who + '", stay_longer = "' + req.query.stay_longer + '" WHERE cid = "' + req.query.cid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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

app.post('/updateProfileOther', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE booking SET emrg_contact_name = "' + req.query.emrg_contact_name + '", emrg_contact_relation = "' + req.query.emrg_contact_relation + '", emrg_contact_email = "' + req.query.emrg_contact_email + '", emrg_contact_number = "' + req.query.emrg_contact_number + '", drink_driving_convictions = "' + req.query.drink_driving_convictions + '", drink_driving_convictions_date = "' + req.query.drink_driving_convictions_date + '", drink_driving_convictions_bac = "' + req.query.drink_driving_convictions_bac + '", drink_driving_convictions_describe = "' + req.query.drink_driving_convictions_describe + '", criminal_convictions = "' + req.query.criminal_convictions + '", criminal_convictions_date = "' + req.query.criminal_convictions_date + '", criminal_convictions_describe = "' + req.query.criminal_convictions_describe + '", driving_offences = "' + req.query.driving_offences + '", driving_offences_date = "' + req.query.driving_offences_date + '", driving_offences_describe = "' + req.query.driving_offences_describe + '", tattoos = "' + req.query.tattoos + '", tattoos_describe = "' + req.query.tattoos_describe + '", medication = "' + req.query.medication + '", medication_describe = "' + req.query.medication_describe + '", health_conditions = "' + req.query.health_conditions + '", health_conditions_describe = "' + req.query.health_conditions_describe + '", smoke = "' + req.query.smoke + '", alcohol = "' + req.query.alcohol + '", illicit = "' + req.query.illicit + '", dietary = "' + req.query.dietary + '", dietary_describe = "' + req.query.dietary_describe + '" WHERE cid = "' + req.query.cid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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

app.post('/updateProfilePayment', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE booking SET promotion = "' + req.query.promotion + '", transactionNO = "' + req.query.transactionNO + '", promotion_detail1 = "' + req.query.promotion_detail1 + '", promotion_detail2 = "' + req.query.promotion_detail2 + '", promotion_detail3 = "' + req.query.promotion_detail3 + '" WHERE cid = "' + req.query.cid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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

app.post('/updateProfileSurvey', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE booking SET hear = "' + req.query.hear + '", hear_other = "' + req.query.hear_other + '", friend_name = "' + req.query.friend_name + '", friend_email = "' + req.query.friend_email + '", friend_number = "' + req.query.friend_number + '", consultant_name = "' + req.query.consultant_name + '", consultant_answer = "' + req.query.consultant_answer + '", consultant_answer_describe = "' + req.query.consultant_answer_describe + '", consultant_guarantee = "' + req.query.consultant_guarantee + '", consultant_guarantee_describe = "' + req.query.consultant_guarantee_describe + '", rate = "' + req.query.rate + '", comments = "' + req.query.comments + '" WHERE cid = "' + req.query.cid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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


//old: update dep status after one section in task list finish
app.post('/changeDepStatus', function (req, res) {
    var cid = req.query.cid;

    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE booking SET dep_status = "sales" WHERE cid = "' + cid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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

//new: add new admin status to department table
app.post('/addDepStatus', function (req, res) {
    var cid = req.query.cid;
	var time = moment().format('MMMM Do YYYY, h:mm:ss a');
	
	var post = {
                cid: cid,
                status: 'admin',
                owner: 'test owner',
                date: time
            };

    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('insert into departments set ?', post, function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated new status for this customer!');
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

//old
app.post('/changeDepStatusAdmin', function (req, res) {
    var cid = req.query.cid;

    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE booking SET dep_status = "admin" WHERE cid = "' + cid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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

//new
app.post('/updateDepStatusAdmin', function (req, res) {
    var cid = req.query.cid;
	var time = moment().format('MMMM Do YYYY, h:mm:ss a');
	var owner = req.query.owner;
	
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE departments SET status = "coordination", owner = "' + owner + '", date = "' + time + '" WHERE cid = "' + cid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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

//saveNewNote
app.post('/saveNewNote', function (req, res) {
    var cid = req.query.cid;
	var note = req.query.note;
	var staff = req.query.staff;
	var time = moment().format('MMMM Do YYYY, h:mm:ss a');

    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                cid: cid,
                text: note,
                staff: staff,
                time: time
            };
            connection.query('insert into notes set ?', post, function (err, rows, fields) {
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


//find all notes for one customer
app.get('/getAllNotes', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            connection.query('SELECT * from notes where cid = "' + req.query.cid + '"', function (err, rows, fields) {
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


//resume tab
//find all profile details
app.get('/findResumeProfile', function (req, res) {
    //database connection set
    var connection = NA;

    console.log('sadasdsadsa', req.query.rid);
    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT * from resume where email = "' + req.query.email + '"', function (err, rows, fields) {
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



//update all changed field from profile page
app.post('/updateChangedData', function (req, res) {
    var changingFinalDataJSON = req.query.changingFinalDataJSON;
	var data = JSON.parse(changingFinalDataJSON);

	console.log('test changed data json', data);
	console.log(data.length);
	
	var sql = 'UPDATE booking SET ';
	
	for (var i=0; i<data.length; i++)
		{
			if(i == (data.length - 1))
				{
					sql = sql + data[i].field + ' ="' + data[i].value + '" where cid = "' + data[i].cid + '"';
				}
			else
				{
					sql = sql + data[i].field + ' ="' + data[i].value + '", ';
				}
			
		}
	console.log(sql);
	
	    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query(sql, function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated booking table!');
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

//insert editing logs together 
app.post('/addEditLog', function (req, res) {
    var changingFinalDataJSON = req.query.changingFinalDataJSON;
	var data = JSON.parse(changingFinalDataJSON);
	var staff = req.query.staff;
 	var staffid = req.query.staffid;
	var date = moment().format('MMMM Do YYYY, h:mm:ss a');
	var cid = req.query.cid;
	
	var sql = 'INSERT INTO log (cid, staff_id, staff_name, field_name, field_value, date, status) VALUES ';
	
	for (var i=0; i<data.length; i++)
		{
			if(i == (data.length - 1))
				{
					sql = sql + '("' + cid + '", "' + staffid + '", "' + staff + '", "' + data[i].field + '", "' + data[i].value + '", "' + date + '", "edit");';
				}
			else
				{
					sql = sql + '("' + cid + '", "' + staffid + '", "' + staff + '", "' + data[i].field + '", "' + data[i].value + '", "' + date + '", "edit"), ';
				}
			
		}
	console.log(sql);
	
	    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query(sql, function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('new edit logs inserted!');
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




//find all logs
app.get('/findApprove', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            connection.query('SELECT * from log where cid = "' + req.query.cid + '" and status = "' + req.query.status + '"', function (err, rows, fields) {
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

////insert one new log record
app.post('/addNewLog', function (req, res) {
    var cid = req.query.cid;
	var staff = req.query.staff;
 	var staffid = req.query.staffid;
	var fieldname = req.query.fieldname;
	var value = req.query.value;
	var status = req.query.status;
	var date = moment().format('MMMM Do YYYY, h:mm:ss a');
	
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                cid: cid,
                staff_id: staffid,
                staff_name: staff,
                field_name: fieldname,
                field_value: value,
                date: date,
				status: status
            };
            connection.query('insert into log set ?', post, function (err, rows, fields) {
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


//find all logs for one field
app.get('/getLog', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            connection.query('SELECT * from log where cid = "' + req.query.cid + '" and field_name = "' + req.query.fieldname + '" ORDER BY date DESC', function (err, rows, fields) {
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


app.get('/getAllNoteTimeline', function (req, res) {
    //database connection set
    var connection = NA;
 var cid = req.query.cid;
    connection.connect(function (err) {
        if (!err) {
           
           
            connection.query('SELECT * from notes where cid = "' + cid + '"', function (err, rows, fields) {
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


app.get('/getAllTaskTimeline', function (req, res) {
    //database connection set
    var connection = NA;
 var cid = req.query.cid;
    connection.connect(function (err) {
        if (!err) {
           
           
            connection.query('SELECT * from tasks where cid = "' + cid + '"', function (err, rows, fields) {
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

//getAllApproveTimeline
app.get('/getAllApproveTimeline', function (req, res) {
    //database connection set
    var connection = NA;
 var cid = req.query.cid;
    connection.connect(function (err) {
        if (!err) {
           
           
            connection.query('SELECT * from log where cid = "' + cid + '" and status = "approve"', function (err, rows, fields) {
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

//saveFlightDetail
app.post('/saveFlightDetail', function (req, res) {
    //database connection set
    var connection = NA;
	
    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                cid: req.query.cid,
                flight_tentative_departure_date: req.query.flightdate,
                flight_airline: req.query.flightairline,
                flight_booking_class: req.query.flightclass,
                flight_quoted_airfare_amount: req.query.flightQuotedAmount,
                flight_taxes_amount: req.query.flightTaxAmount,
				flight_departure_city: req.query.flightDepartureCity,
				flight_arrival_city: req.query.flightArrivalCity,
				flight_rtnow: req.query.flightRTN,
				flight_status: req.query.flightStatus,
				flight_comments: req.query.flightComments
            };
            connection.query('insert into flight set ?', post, function (err, rows, fields) {
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

//saveInsuranceDetail
app.post('/saveInsuranceDetail', function (req, res) {
    //database connection set
    var connection = NA;
	
    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                cid: req.query.cid,
                insurance_company: req.query.company,
                insurance_from: req.query.from,
                insurance_to: req.query.to,
                insurance_plan: req.query.plan,
                insurance_excess: req.query.excess,
				insurance_amount: req.query.amount,
				insurance_comments: req.query.comments,
				insurance_status: req.query.status
            };
            connection.query('insert into insurance set ?', post, function (err, rows, fields) {
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

		
app.post('/saveAccommodationDetail', function (req, res) {
    //database connection set
    var connection = NA;
	
    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                cid: req.query.cid,
                accommodation_from: req.query.from,
                accommodation_to: req.query.to,
                accommodation_transfer: req.query.transfer,
                accommodation_comments: req.query.comments,
                additional_accommodation: req.query.detail,
				accommodation_amount: req.query.amount,
				accommodation_status: req.query.status
            };
            connection.query('insert into accommodation set ?', post, function (err, rows, fields) {
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


app.post('/saveTransferDetail', function (req, res) {
    //database connection set
    var connection = NA;
	
    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                cid: req.query.cid,
                additional_transfer: req.query.detail,
                transfer_amount: req.query.amount,
                transfer_from: req.query.from,
                transfer_to: req.query.to,
                transfer_returnow: req.query.returnow,
				transfer_comments: req.query.comments,
				transfer_status: req.query.status
            };
            connection.query('insert into transfer set ?', post, function (err, rows, fields) {
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


app.post('/saveAddonDetail', function (req, res) {
    //database connection set
    var connection = NA;
	
    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                cid: req.query.cid,
                addon_supplier: req.query.supplier,
                addon_gross_amount: req.query.grossAmount,
                addon_tour_name: req.query.tour,
                addon_nett_amount: req.query.nettAmount,
                addon_from: req.query.from,
				addon_to: req.query.to,
				addon_comments: req.query.comments,
				addon_status: req.query.status
            };
            connection.query('insert into addon set ?', post, function (err, rows, fields) {
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

app.post('/saveCharityDetail', function (req, res) {
    //database connection set
    var connection = NA;
	
    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                cid: req.query.cid,
                charity_global_foundation: req.query.foundation,
                charity_amount: req.query.amount,
                charity_comments: req.query.comments,
                charity_status: req.query.status
            };
            connection.query('insert into charity set ?', post, function (err, rows, fields) {
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


app.post('/saveVoucherDetail', function (req, res) {
    //database connection set
    var connection = NA;
	
    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                cid: req.query.cid,
                travel_credit_voucher: req.query.detail,
                travel_voucher_amount: req.query.amount,
                travel_voucher_comments: req.query.comments,
                travel_voucher_status: req.query.status
            };
            connection.query('insert into travel_voucher set ?', post, function (err, rows, fields) {
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

app.post('/saveOtherChargesDetail', function (req, res) {
    //database connection set
    var connection = NA;
	
    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                cid: req.query.cid,
                other_charges_item: req.query.item,
                other_charges_amount: req.query.amount,
                other_charges_comments: req.query.comments,
                other_charges_status: req.query.status
            };
            connection.query('insert into other_charges set ?', post, function (err, rows, fields) {
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

//getFlightsList
app.get('/getFlightsList', function (req, res) {
    //database connection set
    var connection = NA;
 var cid = req.query.cid;
    connection.connect(function (err) {
        if (!err) {
           
           
            connection.query('SELECT * from flight where cid = "' + cid + '"', function (err, rows, fields) {
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

app.get('/getInsuranceList', function (req, res) {
    //database connection set
    var connection = NA;
 var cid = req.query.cid;
    connection.connect(function (err) {
        if (!err) {
           
           
            connection.query('SELECT * from insurance where cid = "' + cid + '"', function (err, rows, fields) {
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

app.get('/getAccommodationList', function (req, res) {
    //database connection set
    var connection = NA;
 var cid = req.query.cid;
    connection.connect(function (err) {
        if (!err) {
           
           
            connection.query('SELECT * from accommodation where cid = "' + cid + '"', function (err, rows, fields) {
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


app.get('/getTransferList', function (req, res) {
    //database connection set
    var connection = NA;
 var cid = req.query.cid;
    connection.connect(function (err) {
        if (!err) {
           
           
            connection.query('SELECT * from transfer where cid = "' + cid + '"', function (err, rows, fields) {
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

app.get('/getAddonList', function (req, res) {
    //database connection set
    var connection = NA;
 var cid = req.query.cid;
    connection.connect(function (err) {
        if (!err) {
           
           
            connection.query('SELECT * from addon where cid = "' + cid + '"', function (err, rows, fields) {
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

app.get('/getCharityList', function (req, res) {
    //database connection set
    var connection = NA;
 var cid = req.query.cid;
    connection.connect(function (err) {
        if (!err) {
           
           
            connection.query('SELECT * from charity where cid = "' + cid + '"', function (err, rows, fields) {
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


app.get('/getVoucherList', function (req, res) {
    //database connection set
    var connection = NA;
 var cid = req.query.cid;
    connection.connect(function (err) {
        if (!err) {
           
           
            connection.query('SELECT * from travel_voucher where cid = "' + cid + '"', function (err, rows, fields) {
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

app.get('/getOtherChargesList', function (req, res) {
    //database connection set
    var connection = NA;
 var cid = req.query.cid;
    connection.connect(function (err) {
        if (!err) {
           
           
            connection.query('SELECT * from other_charges where cid = "' + cid + '"', function (err, rows, fields) {
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


app.post('/editFlightDetail', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE flight SET flight_tentative_departure_date = "' + req.query.flightdate + '", flight_airline = "' + req.query.flightairline + '", flight_booking_class = "' + req.query.flightclass + '", flight_quoted_airfare_amount = "' + req.query.flightQuotedAmount + '", flight_taxes_amount = "' + req.query.flightTaxAmount + '", flight_departure_city = "' + req.query.flightDepartureCity + '", flight_arrival_city = "' + req.query.flightArrivalCity + '", flight_rtnow = "' + req.query.flightRTN + '", flight_status = "' + req.query.flightStatus + '", flight_comments = "' + req.query.flightComments + '" WHERE flight_id = "' + req.query.fid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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


app.post('/updateInsuranceDetail', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE insurance SET insurance_company = "' + req.query.company + '", insurance_from = "' + req.query.from + '", insurance_to = "' + req.query.to + '", insurance_plan = "' + req.query.plan + '", insurance_excess = "' + req.query.excess + '", insurance_amount = "' + req.query.amount + '", insurance_comments = "' + req.query.comments + '", insurance_status = "' + req.query.status + '" WHERE insurance_id = "' + req.query.insuranceid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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

app.post('/updateAccommodationDetail', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE accommodation SET accommodation_from = "' + req.query.from + '", accommodation_to = "' + req.query.to + '", accommodation_transfer = "' + req.query.transfer + '", accommodation_comments = "' + req.query.comments + '", additional_accommodation = "' + req.query.detail + '", accommodation_amount = "' + req.query.amount + '", accommodation_status = "' + req.query.status + '" WHERE accommodation_id = "' + req.query.accommodationid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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

app.post('/updateTransferDetail', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE transfer SET additional_transfer = "' + req.query.detail + '", transfer_amount = "' + req.query.amount + '", transfer_from = "' + req.query.from + '", transfer_to = "' + req.query.to + '", transfer_returnow = "' + req.query.returnow + '", transfer_comments = "' + req.query.comments + '", transfer_status = "' + req.query.status + '" WHERE transfer_id = "' + req.query.transferid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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

app.post('/updateAddonDetail', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE addon SET addon_supplier = "' + req.query.supplier + '", addon_gross_amount = "' + req.query.grossamount + '", addon_tour_name = "' + req.query.tour + '", addon_nett_amount = "' + req.query.nettamount + '", addon_from = "' + req.query.from + '", addon_to = "' + req.query.to + '", addon_comments = "' + req.query.comments + '", addon_status = "' + req.query.status + '" WHERE addon_id = "' + req.query.addonid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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

app.post('/updateCharityDetail', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE charity SET charity_global_foundation = "' + req.query.foundation + '", charity_amount = "' + req.query.amount + '", charity_comments = "' + req.query.comments + '", charity_status = "' + req.query.status + '" WHERE charity_id = "' + req.query.charityid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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


app.post('/updateVoucherDetail', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE travel_voucher SET travel_credit_voucher = "' + req.query.detail + '", travel_voucher_amount = "' + req.query.amount + '", travel_voucher_comments = "' + req.query.comments + '", travel_voucher_status = "' + req.query.status + '" WHERE travel_voucher_id = "' + req.query.voucherid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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


app.post('/updateOtherChargesDetail', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE other_charges SET other_charges_item = "' + req.query.item + '", other_charges_amount = "' + req.query.amount + '", other_charges_comments = "' + req.query.comments + '", other_charges_status = "' + req.query.status + '" WHERE other_charges_id = "' + req.query.otherchargesid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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


app.get('/findtrip', function (req, res) {
    //database connection set
    var connection = NA;

    console.log('sadasdsadsa', req.query.cid);
    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT * from trip where cid = "' + req.query.cid + '"', function (err, rows, fields) {
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


app.post('/saveNewTrip', function (req, res) {

    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                cid: req.query.cid,
                trip_experience_name: req.query.tripExperienceName,
                trip_destination: req.query.tripDestination,
                trip_code: req.query.tripCode,
                trip_duration: req.query.tripDuration,
                trip_price: req.query.tripPrice,
				trip_status: req.query.tripStatus
            };
            connection.query('insert into trip set ?', post, function (err, rows, fields) {
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

app.post('/updateTripDetail', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE trip SET trip_experience_name = "' + req.query.tripExperienceName + '", trip_destination = "' + req.query.tripDestination + '", trip_code = "' + req.query.tripCode + '", trip_duration = "' + req.query.tripDuration + '", trip_price = "' + req.query.tripPrice + '", trip_status = "' + req.query.tripStatus + '" WHERE trip_id = "' + req.query.tid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated!');
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

app.post('/addRawCustomer', function (req, res) {

    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                status: 'Completed',
				cid: req.query.cid
            };
            connection.query('insert into booking set ?', post, function (err, rows, fields) {
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


app.get('/checkCIDExist', function (req, res) {
    //database connection set
    var connection = NA;

    console.log('sadasdsadsa', req.query.cid);
    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT * from booking where cid = "' + req.query.cid + '"', function (err, rows, fields) {
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

app.get('/getAllCID', function (req, res) {
    //database connection set
    var connection = NA;

    console.log('sadasdsadsa', req.query.cid);
    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT cid from booking', function (err, rows, fields) {
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

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
});

 /** Serving from the same express Server
    No cors required */
//app.use(express.static('../app'));
app.use(bodyParser.json());  




app.post('/uploadProfileFile', function (req, res) {
	console.log('test test', req.query.parameter);
	var array = req.query.parameter.split(" ");
		
	var cid = array[0];
	var filetype = array[1];
	
	var time = moment().format('mmss');
		
//create folder for each customer	
	var dir = './customerfile/' + cid;
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	

	var storage = multer.diskStorage({ 
        destination: function (req, file, cb) {
			
            cb(null, './customerfile/' + cid + '/')
        },
        filename: function (req, file, cb) {
//            var datetimestamp = Date.now();
			
            cb(null, cid + '_' + filetype + '_' + time + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });

	var upload = multer({ //multer settings
                    storage: storage
                }).single('file');
	
	 upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
		  console.log(req.file);
             res.json({error_code:0,err_desc:null,filename:req.file.filename});
        })
       

});
																											
app.post('/saveFileurl', function (req, res) {
    var cid = req.query.cid;
    var url = globals.remoteURL + '//customerfile/' + cid + '/' + req.query.filename;
    var attached_by = req.query.attachedBy;
    var date = moment().format('MMMM Do YYYY, h:mm:ss a');
    var name = req.query.filename;

    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                cid: cid,
                url: url,
                attached_by: attached_by,
                date: date,
                name: name
            };
            connection.query('insert into documents set ?', post, function (err, rows, fields) {
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


app.get('/findFileRecords', function (req, res) {
    var cid = req.query.cid;
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");

            connection.query('SELECT * from documents where cid = "' + cid + '"', function (err, rows, fields) {
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


app.get('/createPlacementPDF', function(req, res) {
     
                        var cid = req.query.cid;
                        var fname = req.query.fname;
                        var mname = req.query.mname;
                        var lname = req.query.lname;
						var fullname = fname + ' ' + mname + ' ' + lname;
                        var gender = req.query.gender;
                        var dob = req.query.dob;
                        var nationality = req.query.nationality;
                        var tripName = req.query.tripName;
                        var tripLocation = req.query.tripLocation;
                        var tripCode = req.query.tripCode;
                        var tripStartDate = req.query.tripStartDate;
                        var phone = req.query.phone;
                        var email = req.query.email;
                        var address = req.query.address;
                        var suburb = req.query.suburb;
                        var state = req.query.state;
                        var country = req.query.country;
                        var postCode = req.query.postCode;
                        var emergencyName = req.query.emergencyName;
                        var emergencyRelationship = req.query.emergencyRelationship;
                        var emergencyEmail = req.query.emergencyEmail;
                        var emergencyPhone = req.query.emergencyPhone;
                        var healthCondition = req.query.healthCondition;
                        var healthConditionDescribe = req.query.healthConditionDescribe;
                        var dietary = req.query.dietary;
                        var dietaryDescribe = req.query.dietaryDescribe;
                       
                        
var html = '<!DOCTYPE html><html lang=en><head><meta charset=utf-8><link href=' + globals.remoteURL + '/material/assets/css/materialize.css rel=stylesheet><body><div class=container><div class=row><div class="col l12"><div class="col l3" style="float:right;"><img src="http://globalworkandtravel.com/wp-content/themes/global/asset/images/logo/global-logo-primary.png"></div></div><div class="col l12"><span class="boldheading">1. General Information </span></div><div class="col l12"><span class="subheading">Full Name:</span> <span class="pdfcontent">' + fullname + '</span></div><div class="col l12"><span class="subheading">Sex: </span><span class="pdfcontent">' + gender + '</span></div><div class="col l12"><span class="subheading">Date of birth: </span><span class="pdfcontent">' + dob + '</span></div><div class="col l12"><span class="subheading">Nationality: </span><span class="pdfcontent">' + nationality + '</span></div><br><hr><div class="col l12"><span class="boldheading">2. Trip Information </span></div><div class="col l12"><span class="subheading">Trip Name: </span><span class="pdfcontent">' + tripName + '</span></div><div class="col l12"><span class="subheading">Trip Location: </span><span class="pdfcontent">' + tripLocation + '</span></div><div class="col l12"><span class="subheading">Trip Code: </span><span class="pdfcontent">' + tripCode + '</span></div><div class="col l12"><span class="subheading">Start Date: </span><span class="pdfcontent">' + tripStartDate + '</span></div><br><hr><div class="col l12"><span class="boldheading">3. Contact Information </span></div><div class="col l12"><span class="subheading">Telephone: </span><span class="pdfcontent">' + phone + '</span></div><div class="col l12"><span class="subheading">Email Address: </span><span class="pdfcontent">' + email + '</span></div><div class="col l12"><span class="subheading">Postal Address: </span><span class="pdfcontent">' + address + ', ' + suburb + ', ' + state + ', ' + country + ' ' + postCode + '</span></div><div class="col l12"><span class="subheading">Emergency Contact Details, Name, Phone, Email and Relationship: </span></div><div class="col l12"><span class="pdfcontent">' + emergencyName + ', ' + emergencyRelationship + '</span></div><div class="col l12"><span class="pdfcontent">' + emergencyEmail + ', ' + emergencyPhone + '</span></div><br><hr><div class="col l12"><span class="boldheading">4. </span><span class="subheading">Are there any health considerations we need to be made aware of</span></div><div class="col l12"><span class="pdfcontent">' + healthCondition + '. ' + healthConditionDescribe + '</span></div><br><hr><div class="col l12"><span class="boldheading">5. </span><span class="subheading">Do you have any dietary requirements? Any allergies? If so, please list below.</span></div><div class="col l12"><span class="pdfcontent">' + dietary + '. ' + dietaryDescribe + '</span></div></div><div class=page-break></div></div></body></html>';
	
			 	var datetimestamp = Date.now();
				var pdfname = 'placeform_' + cid + '_' + datetimestamp;
				var outputstring = 'pdf/placeform/' + pdfname + '.pdf';
				console.log(outputstring);
			 	wkhtmltopdf(html, { pageSize: 'A4', marginBottom: '0mm', marginTop: '5mm', marginLeft: '0', marginRight:'0' })
					.pipe(fs.createWriteStream(outputstring));
                       
					res.end(outputstring);
   
        
    });
    

