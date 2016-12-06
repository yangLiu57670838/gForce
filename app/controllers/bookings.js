//customers controller 
app.controller('bookingsCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$rootScope', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $rootScope) {

    //check role and redirect for sole roles
    if (($scope.staffRole == 'superadmin') || ($scope.staffRole == 'sales')) {
        console.log('works fine');
    } else {
        console.log('no permission dude');
        $location.path("/");
    }
	
	$rootScope.complianceActive = false;

    findCustomers();
    function findCustomers() {
        $http.get('/findNewBookingCustomers?office=' + $rootScope.office).success(function (data) {
			console.log('looking for customers in:', $rootScope.office);
            console.log('test all data', data);
            $scope.customers = data;
            for (i = 0; i < data.length; i++) {
                //console.log(data[i].time.substring(0, 9));
                $scope.customers[i].time = data[i].time.substring(0, 10);
            }

            $scope.customersTable = new NgTableParams({
                page: 1,
                count: 10,
				sorting: {
        			time: 'asc' // initial sorting
    			}
            }, {
                total: $scope.customers.length,
                getData: function (params) {
                    $scope.data = params.sorting() ? $filter('orderBy')($scope.customers, params.orderBy()) : $scope.customers;
                    $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                    $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    //$defer.resolve($scope.data);
                    return $scope.data;
                }
            });


        });
    };

    $scope.viewProfile = function (user) {


        //window.location.replace("/viewProfile.html");
        var cid = user.cid;
        console.log(user.cid);
        $location.path("/viewProfile/" + cid);

    };



}]);
