//customers controller 
app.controller('customersCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$rootScope', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $rootScope) {


	$rootScope.complianceActive = false;
	
    findCustomers();

    function findCustomers() {
        $http.get('/findCustomers').success(function (data) {
            console.log('test all data', data);
            $scope.customers = data;
            for (i = 0; i < data.length; i++) {
                //console.log(data[i].time.substring(0, 9));
                $scope.customers[i].time = data[i].time.substring(0, 10);
            }

            $scope.customersTable = new NgTableParams({
                page: 1,
                count: 10,

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


    $scope.addRawCustomer = function () {
		
	 	$http.get('/getAllCID').success(function (data) {
			 console.log('cid list', data);
			 $scope.cidList = data;
					
	
	do {
		var j = 0;	
    	var cid = createCID();
		console.log(cid);

		for (var i=0; i<$scope.cidList.length; i++)
			{
						
				if ($scope.cidList[i] == cid)
				{
					console.log('not this cid', cid);
					j = 1;
				}
			}

	}
	while (j == 1);
			
	console.log('this cid is fine', cid);
		
	$http.post('/addRawCustomer?cid=' + cid).success(function (data) {
					console.log('success', data);
					$location.path("/viewProfile/" + cid);

		});		
			
			 
			
 });
		
		
		



		

    };
	
function createCID() {
	
 		var rand = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
		var date = new Date();
		var dd = date.getDate();
		var mm = date.getMonth() + 1;
		if (mm < 10)
			{
				mm = '0' + mm;
			}
		var y = date.getFullYear();
		y = y + '';
		y = y.slice(2);
		var todayrd = y + '' + mm + '' + dd;
	
    	var cid = todayrd + '' + rand;
		return cid;
	};
	
//function checkCID(cid) {
//		 $http.get('/checkCIDExist?cid=' + cid).success(function (data) {
//			 console.log('length is', data.length);
//
//			 return data.length;
//		 });
//			 
//	};
	
	
}]);
