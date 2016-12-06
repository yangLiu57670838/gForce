//var app = angular.module('myApp', ['ngTable', 'mgcrea.ngStrap', 'ngRoute', 'ngAnimate']); //nganimate adds animation to directives such as ng-repat or ng-if...
var app = angular.module('myApp', ['ngTable', 'mgcrea.ngStrap', 'ngRoute', 'ngAnimate', 'ngPlaceholders', 'smoothScroll', 'LocalStorageModule', 'monospaced.elastic', 'ngSanitize', 'gridshore.c3js.chart', 'jcs-autoValidate', 'textAngular', 'fsm', 'angular-loading-bar', 'ui.select', 'angulartics', 'ajoslin.promise-tracker', 'ngDialog', 'ngMaterial', 'ngFileUpload', 'hm.readmore', 'angular-timeline', '$idle', 'angularSpinner']);//

//mange session for not working staff
app.config(['$idleProvider', '$keepaliveProvider', function($idleProvider, $keepaliveProvider) {
  // The keepalive ping will be sent every 10 seconds.
        $keepaliveProvider.setInterval(10);
        // We will ping the following address to keep the session alive.
        $keepaliveProvider.http('http://54.206.34.169:3000');

        // Set the idle and timeout timers in seconds.
        // User is considered idle if AFK for 3 mins
        $idleProvider.setIdleTime(180);
        // User will timeout at the end of 60 seconds anfter considered idle.
        $idleProvider.setTimeoutTime(60); 
        // The $idle service will ping the specified URL (see $keepaliveProvider.http) to keep the session alive
        $idleProvider.keepalive(false);

}]);



//init run for the controller formCtrl
app.run(['$rootScope', '$analytics', '$timeout', function ($rootScope, $analytics, $timeout) {
    $rootScope.$on('theme:change', function (event, msg) {
        $analytics.eventTrack(msg, {
            category: 'Themepicker'
        });
    });

	//for use
	$rootScope.remoteURL = 'http://54.206.34.169:3000';
	//for test
//	$rootScope.remoteURL = 'http://localhost:3000';
//    $rootScope.remoteURL = 'http://52.8.102.221:3000';
	
	
    $rootScope.startAlert = function (type, title, description, icon) { 
        console.log('alert starting');

        var myEl = angular.element(document.querySelector('#notification'));

        myEl.append('<div class="animated pulse notification-global"><div class="bs-component"><div class="alert alert-dismissible alert-' + type + '"> <button type="button" class="close" data-dismiss="alert">×</button><h4><i class="' + icon + '"></i>' + title + '</h4>' + description + '</div></div></div>');

       function removeSuccess () {
            var myEl = angular.element(document.querySelector('#notification'));
            myEl.empty(); 
        }

        $timeout(removeSuccess, 15000); 
    };
    
    $rootScope.greeting = true;
	
	
	$rootScope.complianceActive = false;
	
    
}]);

//app.run(['$rootScope', '$animate', function ($rootScope, $animate) {
//    $animate.enabled(true); //.... ??
//}]);

//smoothscroll is for scroll to top
