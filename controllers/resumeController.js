var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    fs = require('fs'),
    multer = require('multer'),
	moment = require('moment'),
	wkhtmltopdf = require('wkhtmltopdf');

var globals = require('./globalVAR');//global variable 

var sendgrid  = require('sendgrid')('NA');//email sendgrid test

//find all customers
app.get('/findResumes', function (req, res) {
    //database connection set
    var connection = NA;

	console.log('globalVAR test', globals.remoteURL);
    connection.connect(function (err) {
        if (!err) {

            connection.query('SELECT resume.r_id, resume.fname, resume.lname, resume.email, resume.phoneno, resume.submission_date, resume.action, booking.office, booking.trip_experience_name FROM resume LEFT JOIN booking ON resume.email = booking.email where resume.action = "' + req.query.action + '"', function (err, rows, fields) {
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
app.get('/findform', function (req, res) {
    //database connection set
    var connection = NA;

    console.log('sadasdsadsa', req.query.rid);
    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT * from resume where r_id = "' + req.query.rid + '"', function (err, rows, fields) {
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


//update resume details
app.post('/updatecol', function (req, res) {
    //database connection set
    var connection = NA;
	var time = moment().format('MMMM Do YYYY, h:mm:ss a');
	
    console.log('sadasdsadsa', req.query.col);
    console.log('sadasdsadsa', req.query.element);
    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('UPDATE resume SET ' + req.query.col + ' = "' + req.query.element + '", modified_date = "' + time + '" WHERE r_id = "' + req.query.rid + '"', function (err, rows, fields) {
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

//update resume action status
app.post('/updateAction', function (req, res) {
    //database connection set
    var connection = NA;
	var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('UPDATE resume SET action = "' + req.query.action + '", modified_date = "' + time + '" WHERE r_id = "' + req.query.rid + '"', function (err, rows, fields) {
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

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
       
//            cb(null, datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
             cb(null, datetimestamp + 'resume.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });

var upload = multer({ //multer settings
                    storage: storage
                }).single('file');



//upload
app.post('/uploadpicture', function(req, res) {
    
   
         upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                console.log('22');
                 return;
            }
            
             valuess = JSON.stringify(req.file);
              console.log(valuess);
//             res.json({error_code:0,err_desc:null});
//             res.json(res);
             res.send(valuess);
        })
       
    });


//save new filename
app.post('/savefilename', function(req, res) {
    
       var connection = NA;

var time = moment().format('MMMM Do YYYY, h:mm:ss a');

    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('UPDATE resume SET photo_url = "' + req.query.fn + '", modified_date = "' + time + '" WHERE r_id = "' + req.query.rid + '"', function (err, rows, fields) {
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


//pdf create
app.post('/createpdf', function(req, res) {
    
    
    var connection = NA;

    console.log('sadasdsadsa', req.query.rid);
    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT * from resume where r_id = "' + req.query.rid + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                   
                        var fname = rows[0].fname;
                        var mname = rows[0].mname;
                        var lname = rows[0].lname;
                        var email = rows[0].email;
                        var photo_url = req.query.url;
                        if (photo_url.indexOf('globalworkandtravel.com/resume') > -1)
                            {
                                console.log('image is being stored in the globalworkandtravel.com server');
                            }
                        else{
                            //url checking and changing need to be fixed later
                        var photo_url = globals.remoteURL + '/uploads' + photo_url;
                        }                
                        console.log(photo_url);
                        var skype = rows[0].skype;
                        var phoneno = rows[0].phoneno;
                        var introduce = rows[0].introduce;
                        var objective = rows[0].objective;
                        var skill1 = rows[0].skill1;
                        var title1 = rows[0].title1;
                        var institution1 = rows[0].institution1;
                        var educationfrom1 = rows[0].educationfrom1;
						var educationfrom1 = educationfrom1.replace("-", " ");
                        var educationto1 = rows[0].educationto1;
						var educationto1 = educationto1.replace("-", " ");
						
                        var title2 = rows[0].title2;
                        var institution2 = rows[0].institution2; 				
                        var educationfrom2 = rows[0].educationfrom2;
						var educationfrom2 = educationfrom2.replace("-", " ");
                        var educationto2 = rows[0].educationto2;
						var educationto2 = educationto2.replace("-", " ");
						
                        var title3 = rows[0].title3;
                        var institution3 = rows[0].institution3;
                        var educationfrom3 = rows[0].educationfrom3;
						var educationfrom3 = educationfrom3.replace("-", " ");
                        var educationto3 = rows[0].educationto3;
						var educationto3 = educationto3.replace("-", " ");
						
                        var certificate = rows[0].certificate;
                        var license = rows[0].license;
                        
                        var jtitle1 = rows[0].jtitle1;
                        var cname1 = rows[0].cname1;
                        var cwebsite1 = rows[0].cwebsite1;
                        var jfrom1 = rows[0].jfrom1;
						var jfrom1 = jfrom1.replace("-", " ");
                        var jto1 = rows[0].jto1;
						var jto1 = jto1.replace("-", " ");
                        var duty1 = rows[0].duty1;
						
                        var jtitle2 = rows[0].jtitle2;
                        var cname2 = rows[0].cname2;
                        var cwebsite2 = rows[0].cwebsite2;
                        var jfrom2 = rows[0].jfrom2;
						var jfrom2 = jfrom2.replace("-", " ");
                        var jto2 = rows[0].jto2;
						var jto2 = jto2.replace("-", " ");
                        var duty2 = rows[0].duty2;
						
                        var jtitle3 = rows[0].jtitle3;
                        var cname3 = rows[0].cname3;
                        var cwebsite3 = rows[0].cwebsite3;
                        var jfrom3 = rows[0].jfrom3;
						var jfrom3 = jfrom3.replace("-", " ");
                        var jto3 = rows[0].jto3;
						var jto3 = jto3.replace("-", " ");
                        var duty3 = rows[0].duty3;
						
                        var jtitle4 = rows[0].jtitle4;
                        var cname4 = rows[0].cname4;
                        var cwebsite4 = rows[0].cwebsite4;
                        var jfrom4 = rows[0].jfrom4;
						var jfrom4 = jfrom4.replace("-", " ");
                        var jto4 = rows[0].jto4;
						var jto4 = jto4.replace("-", " ");
                        var duty4 = rows[0].duty4;
						
                        var jtitle5 = rows[0].jtitle5;
                        var cname5 = rows[0].cname5;
                        var cwebsite5 = rows[0].cwebsite5;
                        var jfrom5 = rows[0].jfrom5;
						var jfrom5 = jfrom5.replace("-", " ");
                        var jto5 = rows[0].jto5;
						var jto5 = jto5.replace("-", " ");
                        var duty5 = rows[0].duty5;
                        
                       if (title2 == '')
                           {
                               var htmltitle2 = '';
                           }else{
                               var htmltitle2 = '<div class="custom-content-wrapper-items"><h5>' + title2 + '@' + institution2 + '</h5><h5>' + educationfrom2 + ' - ' + educationto2 + '</h5></div>';
                           }
                        
                        if (title3 == '')
                            {
                                var htmltitle3 = '';
                            }else
                                {
                                    var htmltitle3 = '<div class="custom-content-wrapper-items"><h5>' + title3 + '@' + institution3 + '</h5><h5>' + educationfrom3 + ' - ' + educationto3 + '</h5></div>';
                                }
                        
                        if (jtitle2 == '')
                            {
                                var htmljtitle2 = '';
                            }else
                                {
                                    var htmljtitle2 = '<div class="custom-content-wrapper"><h5>' + jtitle2 + '</h5> <h5>' + cname2 + '</h5><h5>' + jfrom2 + ' - ' + jto2 + '</h5><h5>' + cwebsite2 + '</h5><p>' + duty2 + '</p></div>';
                                }
                        
                        if (jtitle3 == '')
                            {
                                var htmljtitle3 = '';
                            }else
                                {
                                    var htmljtitle3 = '<div class="custom-content-wrapper"><h5>' + jtitle3 + '</h5> <h5>' + cname3 + ' </h5><h5>' + jfrom3 + ' - ' + jto3 + '</h5><h5>' + cwebsite3 + '</h5><p>' + duty3 + '</p></div>';
                                }
                        
                          if (jtitle4 == '')
                            {
                                var htmljtitle4 = '';
                            }else
                                {
                                    var htmljtitle4 = '<div class="custom-content-wrapper"><h5>' + jtitle4 + '</h5> <h5>' + cname4 + ' </h5><h5>' + jfrom4 + ' - ' + jto4 + '</h5><h5>' + cwebsite4 +  '</h5><p>' + duty4 + '</p></div>';
                                }
                        
                          if (jtitle5 == '')
                            {
                                var htmljtitle5 = '';
                            }else
                                {
                                    var htmljtitle5 = '<div class="custom-content-wrapper"><h5>' + jtitle5 + '</h5><h5>' + cname5 + ' </h5><h5>' + jfrom5 + ' - ' + jto5 + '</h5><h5>' + cwebsite5 + '</h5><p>' + duty5 + '</p></div>';
                                }
                        
                        

//                        res.end();
                        
//                        var html = '<h1>' + fname + ' ' + mname + ' ' + lname + '</h1><p>Hello world</p>';
var html = '<!DOCTYPE html><html lang=en><head><meta charset=utf-8><link href=' + globals.remoteURL + '/material/assets/css/materialize.css rel=stylesheet><link href=' + globals.remoteURL + '/material/assets/css/style.css rel=stylesheet><body><div class=container><div class="row row2"><div class="col l4"><div class="row logorow"><div class=logostyle><img src=' + globals.remoteURL + '/assets/img/global/global-logo-primary.png></div></div><div class="row row2"><aside class="col sidebar" id=sidebar><h3 class=resume_name>' + fname + ' ' + mname + ' ' + lname +'</h3><div class=row><div class=heading><div class=feature-img><img src="' + photo_url + '"></div></div><div class="col l12 sidebar-item"><div class=row><div class="col l3 icon"><img src=' + globals.remoteURL + '/assets/img/icons/inroduction-icon.png></div><div class="col l9 info"><div class=section-item-details><p>' + introduce + '</p></div></div></div></div><div class="col l12 sidebar-item"><div class=row><div class="col l3 icon"><img src=' + globals.remoteURL + '/assets/img/icons/phone-icon.png></div><div class="col l9 info"><div class=section-item-details><p>' + phoneno + '</p></div></div></div></div><div class="col l12 sidebar-item"><div class=row><div class="col l3 icon"><img src=' + globals.remoteURL + '/assets/img/icons/email-icon.png></div><div class="col l9 info"><div class=section-item-details><p>' + email + '</p></div></div></div></div><div class="col l12 sidebar-item"><div class=row><div class="col l3 icon"><img src=' + globals.remoteURL + '/assets/img/icons/skype-icon.png></div><div class="col l9 info info-no-borderbottom"><div class=section-item-details><p>' + skype + '</p></div></div></div></div></div></aside></div></div><section class="col l8 section"><div class="row row2"><div class="section-wrapper right_section_top_margin"><div class="col l2 right_icon"><img src=' + globals.remoteURL + '/assets/img/icons/objectives-icon.png></div><div class="col l10 custom-content"><h2>Objective</h2><div class=custom-content-wrapper>' + objective + '</div></div></div><div class=section-wrapper><div class="col l2 right_icon"><img src=' + globals.remoteURL + '/assets/img/icons/education-icon.png></div><div class="custom-content col l10"><h2>Skills & Education</h2><div class=custom-content-wrapper><h3>Skills</h3><p>' + skill1 + '</p></div><div class=custom-content-wrapper><h3>Education</h3><div class=custom-content-wrapper-items><h5>' + title1 + '@' + institution1 + '</h5><h5>' + educationfrom1 + ' - ' + educationto1 + '</h5></div>' + htmltitle2 + htmltitle3 + '</div></div></div><div class="section-wrapper section-wrapper-noborderbottom"><div class="col l2 right_icon"><img src=' + globals.remoteURL + '/assets/img/icons/certificates-icon.png></div><div class="custom-content col l10"><h2>Certificates & Licenses</h2><div class=custom-content-wrapper><h3>Certificates</h3><p>' + certificate + '</p></div><div class=custom-content-wrapper><h3>Licenses</h3><p>' + license + '</p></div></div></div></div></section></div><div class=page-break></div><div class=row><section class="col l12 section"><div class=row row2><div class="section-wrapper right_section_top_margin section-wrapper-noborderbottom"><div class="col l2 right_icon"><img src=' + globals.remoteURL + '/assets/img/icons/employment-history-icon.png></div><div class="custom-content col l10"><h2>Employment History</h2><div class=custom-content-wrapper><h5>' + jtitle1 + '</h5><h5>'+ cname1 + '</h5><h5>' + jfrom1 + ' - ' + jto1 + '</h5><h5>' + cwebsite1 + '</h5><p>' + duty1 + '</p></div>' + htmljtitle2 + htmljtitle3 + htmljtitle4 + htmljtitle5 + '</div></div></div></section></div></div></body></html>';
												
						fname = fname.replace(/\s+/g, '');
						mname = mname.replace(/\s+/g, '');
						lname = lname.replace(/\s+/g, '');
						if (mname == 'N/A')
							{
								mname = '';
							}
						
                         var datetimestamp = Date.now();
                        var pdfname = fname + mname + lname + datetimestamp;

                        var outputstring = 'pdf/' + pdfname + '.pdf';
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


//for interval test
app.get('/testcall', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT * from booking', function (err, rows, fields) {
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

app.post('/updateResumeChangedData', function (req, res) {
    

//    console.log(req.body);
    
    var changingFinalDataJSON = req.query.changingFinalDataJSON;
    
     console.log(changingFinalDataJSON);
    
	var data = JSON.parse(changingFinalDataJSON);

	console.log('test changed data json', data);
	console.log(data.length);
	
	var sql = 'UPDATE resume SET ';
	
	for (var i=0; i<data.length; i++)
		{
            //some symbols change back here
//            data[i].value = data[i].value.replace(/123456789/g, "&gt;");//>
//            data[i].value = data[i].value.replace(/12345678/g, "&lt;");//<       
//            data[i].value = data[i].value.replace(/1234567/g, "%");
//            data[i].value = data[i].value.replace(/123456/g, "&#34;");
//            data[i].value = data[i].value.replace(/12345/g, "&amp;");
            data[i].value = data[i].value.replace(/specialCharacter/g, "&");
            data[i].value = data[i].value.replace(/htmlemtity2/g, "%");
            data[i].value = data[i].value.replace(/htmlemtity3/g, "#");
             data[i].value = data[i].value.replace(/"/g, '\\"');//?
            
            console.log('edited value is', data[i].value);
            
			if(i == (data.length - 1))
				{
					sql = sql + data[i].field + ' ="' + data[i].value + '" where r_id = "' + data[i].rid + '"';
				}
			else
				{
					sql = sql + data[i].field + ' ="' + data[i].value + '", ';
				}
			
		}
	console.log('final sql is', sql);
	
	    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query(sql, function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        res.end('Updated resume table!');
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