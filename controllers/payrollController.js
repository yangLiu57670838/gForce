var express = require("express"),
	bodyParser = require('body-parser'),
	moment = require('moment'),
 	mysql = require('mysql');



app.get('/findPayroll', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            
            connection.query('SELECT * from payroll where status = "pending"', function (err, rows, fields) {
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


app.get('/getChangedCommissions', function (req, res) {
    //database connection set
    var connection = NA;

	var ids = req.query.ids;

	var sql = 'select sales.sales_id, sales.office, sales.customer_email, sales.note, sales.commission, sales.currency, sales.date, sales.sales_status, sales.approve_date, booking.first_name, booking.last_name from sales, booking where (';
	
	if (ids.indexOf(',') === -1)
		{
			sql = sql + 'sales.sales_id = "' + ids + '") and sales.customer_email = booking.email';
		}
	else
		{
			var idsArray = ids.split(",");
			console.log(idsArray);
			
				for (var i=0; i<idsArray.length; i++)
			{
				if(i == (idsArray.length - 1))
					{
						sql = sql + 'sales.sales_id = "' + idsArray[i] + '") and sales.customer_email = booking.email';
					}
				else
					{
						sql = sql + 'sales.sales_id = "' + idsArray[i] + '" or ';
					}
			
			}	
			
		}
	
    connection.connect(function (err) {
        if (!err) {
            
            connection.query(sql, function (err, rows, fields) {
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



app.get('/getApprovedPresentation', function (req, res) {
    //database connection set
    var connection = NA;

	var ids = req.query.pids;

	var sql = 'select * from sales_presentation where ';
	
	if (ids.indexOf(',') === -1)
		{
			sql = sql + 'presentation_id = "' + ids + '"';
		}
	else
		{
			var idsArray = ids.split(",");
			console.log(idsArray);
			
				for (var i=0; i<idsArray.length; i++)
			{
				if(i == (idsArray.length - 1))
					{
						sql = sql + 'presentation_id = "' + idsArray[i] + '"';
					}
				else
					{
						sql = sql + 'presentation_id = "' + idsArray[i] + '" or ';
					}
			
			}	
			
		}
	
    connection.connect(function (err) {
        if (!err) {
            
            connection.query(sql, function (err, rows, fields) {
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

app.post('/approveThisPayroll', function (req, res) {
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
            connection.query('UPDATE payroll SET status = "approved" WHERE payroll_id = "' + req.query.id + '"', function (err, rows, fields) {
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

 
 app.post('/updateThisPayroll', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            connection.query('UPDATE payroll SET table_fee = "' + req.query.tableFee + '", bonus_amount = "' + req.query.bonusAmount + '", bonus_currency = "' + req.query.bonusCurrency + '", bonus_description = "' + req.query.bonusDescription + '", deduction_amount = "' + req.query.deductionAmount + '", deduction_currency = "' + req.query.deductionCurrency + '", deduction_description = "' + req.query.deductionDescription + '", total_commission = "' + req.query.total + '" WHERE payroll_id = "' + req.query.id + '"', function (err, rows, fields) {
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


app.get('/refreshPayrollData', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            
            connection.query('SELECT * from payroll where payroll_id = "' + req.query.id + '"', function (err, rows, fields) {
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


app.get('/findArchivedPayrun', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            
            connection.query('SELECT * from payroll where status = "approved"', function (err, rows, fields) {
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