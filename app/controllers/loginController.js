app.controller('loginCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$timeout', 'promiseTracker', '$rootScope', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $timeout, promiseTracker, $rootScope) {

    $scope.showform = false;
    $scope.hideform = true;
    $scope.hideLoading = true;
    $scope.se = false;
    

    //Create a new tracker
    $scope.loadingTracker = promiseTracker();
    
    function addFakeSession() {
            $http.get('/addFakeSession').success(function (data) {
                console.log(data);
    
            });
        };
    addFakeSession();
    

    checkIP();

    function checkIP() {
        $http.get('/checkIP').success(function (data) {
            console.log(data);
            if (data == "true") {

                console.log("Welcome Staff");
                delaySomething();
            } else {
//                window.location.replace("../../views/wronglocation.html");
				
				console.log("Test log in");
                delaySomething();
            }

        });
    };


    //use `addPromise` to add any old promise to our tracker
    function delaySomething() {
        var promise = $timeout(function () {
            $scope.showform = true;
            $scope.hideform = false;
            $scope.hideLoading = false;
			$scope.se = true;

            delaySomething2();

        }, 2000);
        $scope.loadingTracker.addPromise(promise);
    };
    
    function delaySomething2() {
        var promise = $timeout(function () {
             window.location.replace("../../views/main/main.html");

        }, 3000);
        $scope.loadingTracker.addPromise(promise);
    };

    $scope.doLogin = function () {
//        var email = $scope.loginEmail;
//        var password = $scope.loginPassword;
//
//        function findPassword() {
//            $http.get('/findPassword?email=' + email + '&password=' + password).success(function (data) {
//
//                console.log(data);
//
//                if (data == "true") {
//                    window.location.replace("../../views/main/main.html");
//
//                } else if (data == "wrongemail"){
//                    
//                    $scope.se = true;
////window.location.replace("/");
//
//                }else
//                    {
//                       $scope.se = true;
////window.location.replace("/");
//                    }
//                
//            });
//        };
//        findPassword();
    };
    
        $scope.dismiss = function () {
            $scope.se = false;
    };


	
	//redirect to new website 
//    function redirect() {
//        var promise2 = $timeout(function () {
//			window.location.replace("http://gforce.team/");
//			
//        }, 5000);
//        $scope.loadingTracker.addPromise(promise2);
//    };
	

 }]);
