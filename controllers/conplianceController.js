var express = require("express"),
    moment = require('moment'),
    mysql = require('mysql');

// searchCompliance
app.get('/searchComplianceName', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {

            console.log("Database is connected ... \n\n");
            connection.query('SELECT first_name, last_name, cid from booking', function (err, rows, fields) {
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
app.get('/getCID2', function (req, res) {
    //database connection set
    var connection = NA;

    connection.connect(function (err) {
        if (!err) {
            var a = req.query.customerName2.split(", ");
            console.log('array is ', a);
            console.log('first name is ', a[0]);
			console.log('last name is ', a[1]);
            connection.query('SELECT * from booking where first_name = "' + a[0] + '" and last_name = "' + a[1] + '"', function (err, rows, fields) {
                connection.end(function (err) {
                    if (!err) {
                        console.log(rows);
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




//add into compliance table
app.post('/addcompliance', function (req, res) {

    //database connection set
    var connection = NA;
    var date = moment().format('YYYY-MM-DD');
    //console.log(date);
    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
            var post = {
                cid: req.query.cid,
                date: date,
				staff: req.query.staff,
                redflag: req.query.redflag,
                yellowflag: req.query.yellowflag,
                consultant_name_check: req.query.introCheckA,
                consultant_name_comments: req.query.introCommentsA,
                company_name_check: req.query.introCheckB,
                company_name_comments: req.query.introCommentsB,
                age_check: req.query.qualificationCheckA,
                age_comments: req.query.qualificationCommentsA,
                citizenship_check: req.query.qualificationCheckB,
                citizenship_comments: req.query.qualificationCommentsB,
                driving_offense_check: req.query.qualificationCheckC,
                driving_offense_comments: req.query.qualificationCommentsC,
                criminal_convictions_check: req.query.qualificationCheckD,
                criminal_convictions_comments: req.query.qualificationCommentsD,
                wh_visa_check: req.query.qualificationCheckE,
                wh_visa_comments: req.query.qualificationCommentsE,
                amount_travellers_check: req.query.backgroundCheckA,
                amount_travellers_comments: req.query.backgroundCommentsA,
                departure_date_check: req.query.selectionCheckA,
                departure_date_comments: req.query.selectionCommentsA,
                min_time_check: req.query.selectionCheckB,
                min_time_comments: req.query.selectionCommentsB,
                job_placement_check: req.query.selectionCheckC,
                job_placement_comments: req.query.selectionCommentsC,
                job_type_check: req.query.selectionCheckD,
                job_type_comments: req.query.selectionCommentsD,
                location_check: req.query.selectionCheckE,
                location_comments: req.query.selectionCommentsE,
                wage_check: req.query.selectionCheckF,
                wage_comments: req.query.selectionCommentsF,
                work_hour_check: req.query.selectionCheckG,
                work_hour_comments: req.query.selectionCommentsG,
                money_save_check: req.query.costCheckA,
                money_save_comments: req.query.costCommentsA,
                cost_estimate_check: req.query.costCheckB,
                cost_estimate_comments: req.query.costCommentsB,
                program_price_check: req.query.costCheckC,
                program_price_comments: req.query.costCommentsC,
                exclusions_check: req.query.costCheckD,
                exclusions_comments: req.query.costCommentsD,
                flight_cost_check: req.query.costCheckE,
                flight_cost_comments: req.query.costCommentsE,
                visa_cost_check: req.query.costCheckF,
                visa_cost_comments: req.query.costCommentsF,
                insurance_cost_check: req.query.costCheckG,
                insurance_cost_comments: req.query.costCommentsG,
                remaining_spots_check: req.query.urgencyCheckA,
                remaining_spots_comments: req.query.urgencyCommentsA,
                closing_week_check: req.query.urgencyCheckB,
                closing_week_comments: req.query.urgencyCommentsB,
                promotion_check: req.query.urgencyCheckC,
                promotion_comments: req.query.urgencyCommentsC,
                drop_price_check: req.query.urgencyCheckD,
                drop_price_comments: req.query.urgencyCommentsD,
                deposit_refund_check: req.query.urgencyCheckE,
                deposit_refund_comments: req.query.urgencyCommentsE,
                payment_plan_check: req.query.othersCheckA,
                payment_plan_comments: req.query.othersCommentsA,
                cooling_period_check: req.query.othersCheckB,
                cooling_period_comments: req.query.othersCommentsB,
                working_together_check: req.query.othersCheckC,
                working_together_comments: req.query.othersCommentsC,
                tax_return_check: req.query.othersCheckD,
                tax_return_comments: req.query.othersCommentsD,
                travell_global_check: req.query.othersCheckE,
                travell_global_comments: req.query.othersCommentsE,
                inclusions_check: req.query.othersCheckF,
                inclusions_comments: req.query.othersCommentsF
            };
            connection.query('insert into compliance set ?', post, function (err, rows, fields) {
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
