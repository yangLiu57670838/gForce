//customers controller 
app.controller('resumeCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location) {

    //check role and redirect for sole roles
    if (($scope.staffRole == 'superadmin') || ($scope.staffRole == 'coordinator') || ($scope.staffRole == 'arrivals')) {
        console.log('works fine');
    } else {
        console.log('no permission dude');
        $location.path("/");
    }

	$scope.actionQuery = 'incomplete';
	
    findResumes();
    function findResumes() {
        $http.get('/findResumes?action=' + $scope.actionQuery).success(function (data) {
            console.log(data);
            $scope.resumes = data;
			

								$scope.resumesTable = new NgTableParams({
                					page: 1,
                					count: 10,
									sorting: {
        								submission_date: 'desc' // initial sorting
    								}
            					}, {
                					total: $scope.resumes.length,
                					getData: function (params) {
                    						$scope.data = params.sorting() ? $filter('orderBy')($scope.resumes, params.orderBy()) : $scope.resumes;
                    						$scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                    						$scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    						//$defer.resolve($scope.data);
                    						return $scope.data;
                					}
            					});
						
						
						
						
			
			



        });
    };

	$scope.actionQueryChange = function () {
		findResumes();
    };
	
    $scope.viewForm = function (r) {

        var id = r.r_id;
        $location.path("/viewForm/" + id);

    };



}]);
