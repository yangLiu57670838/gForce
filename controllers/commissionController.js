var express = require("express"),
	bodyParser = require('body-parser'),
	moment = require('moment'),
 	mysql = require('mysql');

app.get('/findAllBambooStaff', function (req, res) {
   
var bamboohr = new (require('node-bamboohr'))({apikey: 'NA', subdomain: 'NA'})
bamboohr.employees(function (err, employees) {
    res.end(JSON.stringify(employees));
})


});

app.get('/searchCommissions', function (req, res) {
    //database connection set
    var connection = NA;

	console.log(req.query.staff + req.query.enddate + req.query.startdate);
    connection.connect(function (err) {
        if (!err) {
            
            connection.query('SELECT sales.sales_id, sales.office, sales.staff, sales.customer_email, sales.note, sales.commission, sales.currency, sales.date, sales.approve_date, sales.sales_status, booking.cid, booking.first_name, booking.last_name from sales LEFT JOIN booking ON sales.customer_email = booking.email where sales.staff = "' + req.query.staff + '" and sales.date <= "' + req.query.enddate + '" and sales.date >= "' + req.query.startdate + '" and sales.sales_status = "pending"', function (err, rows, fields) {
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


app.post('/addPayroll', function (req, res) {
//    var todoListJSON = req.query.todoListJSON;
//	var data = JSON.parse(todoListJSON);
	var time = moment().format('MMMM Do YYYY');
//	var array = [];
//	for (var i=0; i<9; i++)
//		{
//			if(typeof data[i] !== 'undefined')
//				{
//					var one = {
//						day: data[i].presentationDay,
//						num: data[i].number,
//						amount: data[i].presentationAmount
//							  }
//					array.push(one);
//				}else
//					{
//						var one = {
//						day: '',
//						num: '',
//						amount: ''
//							  }
//					array.push(one);
//					}
//			
//		}
//	console.log(array);
	
	var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                commission_ids: req.query.commissionIds,
                bonus_amount: req.query.bonusAmount,
                bonus_currency: req.query.bonusCurrency,
                bonus_description: req.query.bonusDescription,
                deduction_amount: req.query.deductionAmount,
				deduction_currency: req.query.deductionCurrency,
				deduction_description: req.query.deductionDescription,
				date: time,
				staff: req.query.staff,
				status: 'pending',
				table_fee: req.query.tableFee,
				presentation_ids: req.query.approvedPresentation_ids,
				approved_by: req.query.user,
				total_commission: req.query.totalcommissionamount,
				payroll_number: req.query.payrollNo
            };
			
			console.log(post);
			
            connection.query('insert into payroll set ?', post, function (err, rows, fields) {
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


app.post('/updatecommission', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE sales SET commission = "' + req.query.amount + '", sales_status = "' + req.query.status + '" WHERE sales_id = "' + req.query.id + '"', function (err, rows, fields) {
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

	 
app.post('/updatePresentation', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE sales_presentation SET attend_day = "' + req.query.attendDay + '", presentation = "' + req.query.presentation + '", status = "' + req.query.status + '", amount = "' + req.query.amount + '" WHERE presentation_id = "' + req.query.pid + '"', function (err, rows, fields) {
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
	 

app.post('/updateCommissionDetail', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE sales SET office = "' + req.query.office + '", staff = "' + req.query.staff + '", customer_email = "' + req.query.email + '", note = "' + req.query.note + '", commission = "' + req.query.amount + '", currency = "' + req.query.currency + '", sales_status = "' + req.query.status + '" WHERE sales_id = "' + req.query.id + '"', function (err, rows, fields) {
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


app.get('/searchAllArchive', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            
            connection.query('SELECT sales.sales_id, sales.office, sales.staff, sales.customer_email, sales.note, sales.commission, sales.currency, sales.date, sales.approve_date, sales.sales_status, booking.cid, booking.first_name, booking.last_name from sales LEFT JOIN booking ON sales.customer_email = booking.email where sales.sales_status != "pending"', function (err, rows, fields) {
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


app.get('/searchAllPresentationArchive', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            
            connection.query('SELECT * from sales_presentation where status != "pending"', function (err, rows, fields) {
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


app.get('/searchPresentation', function (req, res) {
	
	console.log('search presentation starting..')
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            
            connection.query('SELECT * from sales_presentation where staff = "' + req.query.staff + '" and attend_day <= "' + req.query.enddate + '" and attend_day >= "' + req.query.startdate + '" and status = "pending"', function (err, rows, fields) {
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




app.post('/addP', function (req, res) {
	var time = moment().format('YYYY-MM-DD');
	
	var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                office: req.query.officeAdding,
                staff: req.query.staffAdding,
                attend_day: req.query.attendDateAdding,
                presentation: req.query.presentationAdding,
                submission_date: time,
				status: req.query.status,
				amount: req.query.presentationAmountAdding
            };
            connection.query('insert into sales_presentation set ?', post, function (err, rows, fields) {
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


app.post('/updatePresentationDetail', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE sales_presentation SET attend_day = "' + req.query.attenday + '", presentation = "' + req.query.presentation + '", status = "' + req.query.status + '", amount = "' + req.query.amount + '" WHERE presentation_id = "' + req.query.pid + '"', function (err, rows, fields) {
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