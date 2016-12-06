app.controller('newCustomerCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location) {


    //check role and redirect for sole roles
    if (($scope.staffRole == 'superadmin') || ($scope.staffRole == 'admin') || ($scope.staffRole == 'finance') || ($scope.staffRole == 'coordinator')) {
        console.log('works fine');
    } else {
        console.log('no permission dude');
        $location.path("/");
    }


    $scope.data1 = {
        availableOptions: [
            {
                id: 'Working Holiday',
                name: 'Working Holiday'
            },
            {
                id: 'Volunteer',
                name: 'Volunteer'
            },
            {
                id: 'Au Pair',
                name: 'Au Pair'
            },
            {
                id: 'Teach',
                name: 'Teach'
            },
            {
                id: 'Internship',
                name: 'Internship'
            }
    ],
        selectedOption: {
            id: 'Working Holiday',
            name: 'Working Holiday'
        }
    };


}]);
