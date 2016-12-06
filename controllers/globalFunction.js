var express = require('express');

var sendgrid  = require('sendgrid')('NA');


//email sending
app.get('/emailtest', function(req, res) {
		
	var email = new sendgrid.Email();
	email.addTo('yangliu1010my@gmail.com');
	//email.addTo('vahid@globalworkandtravel.com');
	email.subject = "Send with templates app";
	email.from = 'yang.liu9@griffithuni.edu.au';
	email.text = 'Hi there test2!';
	email.html = '<h1>Hi there test2!</h1>';
	
	// add filter settings one at a time
	email.addFilter('templates', 'enable', 1);
	email.addFilter('templates', 'template_id', '8af35dc0-3492-42ae-a5ee-f356ad203f82');
   
  
	sendgrid.send(email, function(err, json) {
  		if (err) { return console.error(err); }
  		console.log(json);
		 res.end(json.message);
	});
	
});

app.get('/sendSalesLogEmail', function(req, res) {
	
var fullname = 	req.query.firstname + ' ' + req.query.lastname;
console.log(fullname);
	
var email = new sendgrid.Email();
//	email.addTo('yang@globalworkandtravel.com');
//	email.addTo('vahid@globalworkandtravel.com');
	email.addTo('yangliu1010my@gmail.com');
	email.addBcc('yangliu1010my@gmail.com');
//	email.subject = "New Booking - " + req.query.firstname + ' ' + req.query.lastname;
	email.subject = ' ';
	email.from = 'noreply@gforce.team';
	
	email.text = ' ';
	
	
	// add filter settings one at a time
	email.addFilter('templates', 'enable', 1);
	email.addFilter('templates', 'template_id', '8a45caee-0d24-4175-8e01-4e0c4083a7be');
	email.addSubstitution("%UserName%", fullname); 
  
	sendgrid.send(email, function(err, json) {
  		if (err) { return console.error(err); }
  		console.log(json);
		 res.end(json.message);
	});
	
});