app.controller('testController', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$timeout', 'promiseTracker', '$rootScope', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $timeout, promiseTracker, $rootScope) {

 
	testMongoose();
    function testMongoose() {
		

		
		
        $http.get('/testMongoose').success(function (data) {
			console.log('hello mongoose');
			

        });
    };


//	testp();
//    function testp() {
//        $http.get('/testp').success(function (data) {
//			
//			console.log(data.length);
//		
//					 for (i = 0; i < 2; i++) 
//						 {
////							 window.print({bUI: false, bSilent: true, bShrinkToFit: true});
//							 myWindow=window.open("../../pdf/testPDF.html");
//							 myWindow.close;  //optional, to close the new window as soon as it opens
//						 }
//				
//
//        });
//    };
//    


 }]);
