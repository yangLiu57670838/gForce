app.controller('searchccCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location) {

    //check role and redirect for sole roles
    if (($scope.staffRole == 'superadmin') || ($scope.staffRole == 'coordinator')) {
        console.log('works fine');
    } else {
        console.log('no permission dude');
        $location.path("/");
    }


    //find info from cid 
    $scope.findcid = function () {

        // console.log($scope.CID);
        findfromcid();

        function findfromcid() {
            $http.get('/findfromcid?cid=' + $scope.CID).success(function (data) {
                $scope.cinfo = data[0];
                console.log($scope.cinfo);
            });
        };

    };


}]);
