app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider //this format is working with compiled javascript
        .when('/customer', {
            //controller: "customersCtrl",
            templateUrl: "../bookings/customer.html"
        })
        .when('/viewProfile/:cid', {
//            controller: "profileCtrl", //dont need to claim the controller if already claim it in the ng-view page
            templateUrl: "../bookings/profile.html"
        })
        .when('/searchcc', {
            //controller: "customersCtrl",
            templateUrl: "../bookings/searchcc.html"
        })
        .when('/newCustomer', {
            //controller: "customersCtrl",
            templateUrl: "../payment/newCustomer.html"
        })
        .when('/addPayment', {
            //controller: "customersCtrl",
            templateUrl: "../payment/addPayment.html"
        })
        .when('/searchPayment', {
            //controller: "customersCtrl",
            templateUrl: "../payment/searchPayment.html"
        })
        .when('/compliance', {
            //controller: "customersCtrl",
            templateUrl: "../compliance/compliance.html"
        })
        .when('/listInCompliance', {
            //controller: "customersCtrl",
            templateUrl: "../compliance/listInCompliance.html"
        })
	    .when('/listAllCompliance', {
            //controller: "customersCtrl",
            templateUrl: "../compliance/listAllCompliance.html"
        })
       .when('/resume', {
            //controller: "customersCtrl",
            templateUrl: "../coordination/resume.html"
        })
        .when('/viewForm/:id', {
            //controller: "customerCtrl",
            templateUrl: "../coordination/form.html"
        })
        .when('/viewDetails/:cid/:qid', {
            templateUrl: "../compliance/complianceDetails.html"
        })
        .when('/users', {
            //controller: "customersCtrl",
            templateUrl: "../setting/users.html"
        })
	    .when('/bookings', {
            //controller: "customersCtrl",
            templateUrl: "../sales/bookings.html"
        })
		.when('/adminbookings', {
            //controller: "customersCtrl",
            templateUrl: "../admin/adminbookings.html"
        })
		.when('/commission', {
            //controller: "customersCtrl",
            templateUrl: "../sales/commission.html"
        })
		.when('/payroll', {
            //controller: "customersCtrl",
            templateUrl: "../sales/payroll.html"
        })
        .when('/', {
            //controller: "customersCtrl",
            templateUrl: "../dashboard.html"
        })
	    .when('/test', {
            //controller: "customersCtrl",
            templateUrl: "test.html"
        })
        .otherwise({
            templateUrl: "../dashboard.html" 
        });
    //$locationProvider.baseHref = "localhost:3000";
    //$locationProvider.html5Mode(true);

}]);

// loading bar settings
app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false; //delete the spinner icon  on the top
    cfpLoadingBarProvider.latencyThreshold = 300;
}]);

// disable nganimate with adding class
app.config(['$animateProvider', function ($animateProvider) {
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
}]);






//app.config(function($typeaheadProvider) {
//  angular.extend($typeaheadProvider.defaults, {
////change position here later
//  });
//})
