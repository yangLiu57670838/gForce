app.controller('incompliancelistCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$rootScope', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $rootScope) {

    //check role and redirect for sole roles
    if (($scope.staffRole == 'superadmin') || ($scope.staffRole == 'compliance')) {
        console.log('works fine');
    } else {
        console.log('no permission dude');
        $location.path("/");
    }

//    getWantedInfo();
//    function getWantedInfo() {
//        $http.get('/getWantedInfo').success(function (data) {
//            
//            console.log('this one test:' + data);
//                $scope.listTable = new NgTableParams({
//                    page: 1,
//                    count: 10,
//                }, {
//                    total: data.length,
//                    getData: function (params) {
//                        $scope.data = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
//                        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
//                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
//                        //$defer.resolve($scope.data);
//                        return $scope.data;
//                    }
//                });    
//         
//            
//        });  
//    };
//    
    
	
//later guys
//    getComplianceCustomer();
//    function getComplianceCustomer() {
//        $http.get('/getComplianceCustomer').success(function (data) {
//            
//            console.log('this one test:' + data);
//                $scope.listTable = new NgTableParams({
//                    page: 1,
//                    count: 10,
//                }, {
//                    total: data.length,
//                    getData: function (params) {
//                        $scope.data = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
//                        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
//                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
//                        //$defer.resolve($scope.data);
//                        return $scope.data;
//                    }
//                });    
//         
//            
//        });  
//    };
     
    getInComplianceCustomer();
    function getInComplianceCustomer() {
        $http.get('/getInComplianceCustomer').success(function (data) {
            
            console.log('this one test:' + data);
                $scope.listTable = new NgTableParams({
                    page: 1,
                    count: 10,
                }, {
                    total: data.length,
                    getData: function (params) {
                        $scope.data = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
                        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        //$defer.resolve($scope.data);
                        return $scope.data;
                    }
                });    
         
            
        });  
    };

//    $scope.myArray = [];
//    getsubmission();
//
//    function getsubmission() {
//        $http.get('/getsubmission').success(function (data) {
//            
//            //need to fix this process later using angularjs apply or something else
//            $scope.allDateCidflag = data;
//            $http.get('/getAllinfo').success(function (data2) {
//                $scope.allNamePhoneCid = data2;
//                for (i = 0; i < $scope.allDateCidflag.length; i++) {
//
//                    for (j = 0; j < $scope.allNamePhoneCid.length; j++) {
//                        if ($scope.allDateCidflag[i].cid == $scope.allNamePhoneCid[j].cid) {
//                            var phone = $scope.allNamePhoneCid[j].prefferd_contact_no;
//                            var f = $scope.allNamePhoneCid[j].first_name;
//                            var l = $scope.allNamePhoneCid[j].last_name;
//                            var cid = $scope.allDateCidflag[i].cid;
//                            var date = $scope.allDateCidflag[i].date;
//                            var redflag = $scope.allDateCidflag[i].redflag;
//                            var yellowflag = $scope.allDateCidflag[i].yellowflag;
//                            var qid = $scope.allDateCidflag[i].qid;
//                            $scope.myArray.push({
//                                cid: cid,
//                                first_name: f,
//                                last_name: l,
//                                date: date,
//                                prefferd_contact_no: phone,
//                                redflag: redflag,
//                                yellowflag: yellowflag,
//                                qid: qid
//                            });
//                            break;
//                        }
//                    }
//                }
//
//                $scope.listTable = new NgTableParams({
//                    page: 1,
//                    count: 10,
//                }, {
//                    total: $scope.myArray.length,
//                    getData: function (params) {
//                        $scope.data = params.sorting() ? $filter('orderBy')($scope.myArray, params.orderBy()) : $scope.myArray;
//                        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
//                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
//                        //$defer.resolve($scope.data);
//                        return $scope.data;
//                    }
//                });
//
//            });
//
//
//
//        });
//    };


    

    $scope.viewDetails = function (user) {
		
		$rootScope.complianceActive = true;

        var cid = user.cid;
   		$location.path("/viewProfile/" + cid);

    };



}]);
