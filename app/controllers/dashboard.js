app.controller('DashboardController', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$timeout', 'promiseTracker', '$rootScope', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $timeout, promiseTracker, $rootScope) {

    checkStaff();
    function checkStaff() {
        $http.get('/checkStaff').success(function (data) {
            console.log(data);
            if (data[0] == "true") {
                $scope.s = data[1];
               	if ($rootScope.greeting)
        			{
               		//greeting message
       				$rootScope.startAlert('success', 'Success', 'Welcome to gForce, ' + $scope.s + '!', 'md md-done');
            		$rootScope.greeting = false;
        			}
			}
        });
	
	
	}
 
    
//    $scope.$on('$userIdle', function () {
//           console.log('user is idle in dashboard');
//        }); 

    


 }]);
