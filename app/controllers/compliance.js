//var app = angular.module('myApp', []);
app.controller('complianceCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$rootScope', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $rootScope) {
    $scope.all = [];


    //check role and redirect for sole roles
    if (($scope.staffRole == 'superadmin') || ($scope.staffRole == 'compliance')) {
        console.log('works fine');
    } else {
        console.log('no permission dude');
        $location.path("/");
    }






    searchallName();

    function searchallName() {
        $http.get('/searchComplianceName').success(function (data) {

            $scope.all = data;
            console.log($scope.all);
        });
    }



    function searchComplianceName() {

        var fullname = [];
        for (i = 0; i < $scope.all.length; i++) {
            var f = $scope.all[i].first_name + ', ' + $scope.all[i].last_name;
            fullname.push(f);
        }

        $scope.customerss = fullname;


    };


    function searchComplianceNamefromcid() {

        //        var fullname = [];
        //       
        //        for (i = 0; i < $scope.all.length; i++) {
        //
        //            var f = $scope.all[i].first_name + ' ' + $scope.all[i].last_name;
        //            fullname.push(f);
        //
        //
        //            if ($scope.all[i].cid.indexOf($scope.selectedCustomer) > -1) {
        //               
        //                
        //            }
        //        }
        //
        //        $scope.customerss = fullname;
        //



    };


    $scope.showChanged = function () {

        if (!isNaN($scope.selectedCustomer)) {

            console.log("......");
            //check cid, fix later

        } else {
            //check name
            searchComplianceName();
        }



    };








    $scope.addCompliance = function () {
               
        if ((!$scope.introCheckA) || (!$scope.introCheckB) || (!$scope.qualificationCheckA) || (!$scope.qualificationCheckB) || (!$scope.qualificationCheckC) || (!$scope.qualificationCheckD) || (!$scope.qualificationCheckE) || (!$scope.backgroundCheckA) || (!$scope.selectionCheckA) || (!$scope.selectionCheckB) || (!$scope.selectionCheckC) || (!$scope.selectionCheckD) || (!$scope.selectionCheckE) || (!$scope.selectionCheckF) || (!$scope.selectionCheckG) || (!$scope.costCheckA) || (!$scope.costCheckB) || (!$scope.costCheckC) || (!$scope.costCheckD) || (!$scope.costCheckE) || (!$scope.costCheckF) || (!$scope.costCheckG) || (!$scope.urgencyCheckA) || (!$scope.urgencyCheckB) || (!$scope.urgencyCheckC) || (!$scope.urgencyCheckD) || (!$scope.urgencyCheckE))
    {
         //didnt select every input radio question
        $rootScope.startAlert('danger', 'Error', 'Please fullfill every question', 'md md-error');
        $location.path("/compliance");
    }
    else{
                $scope.redflag = 0;
        $scope.yellowflag = 0;
        if ($scope.introCheckB == 'no') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if ($scope.qualificationCheckC == 'no') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if ($scope.qualificationCheckD == 'no') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if ($scope.selectionCheckC == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if ($scope.selectionCheckD == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if ($scope.selectionCheckE == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if ($scope.selectionCheckF == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if ($scope.selectionCheckG == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if ($scope.costCheckC == 'no') {
            $scope.redflag = $scope.redflag + 1;
        }
        if ($scope.costCheckD == 'no') {
            $scope.redflag = $scope.redflag + 1;
        }
        if ($scope.costCheckE == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if ($scope.costCheckG == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if ($scope.urgencyCheckA == 'yes') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if ($scope.urgencyCheckB == 'yes') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if ($scope.urgencyCheckC == 'yes') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if ($scope.urgencyCheckE == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }



        getCID();

        function getCID() {
            $http.get('/getCID2?customerName2=' + $scope.selectedCustomer).success(function (data) {
                console.log('test return data', data);
                if (data.length == 1) {
                    console.log('cid is:', data[0].cid);
                    console.log('input is:', $scope.selectedCustomer);
                    $scope.cid = data[0].cid;
                    addcompliance();
                }else
                    {
                        console.log($scope.selectedCustomer, 'test test test')
                        //not the right customer name
        $rootScope.startAlert('danger', 'Error', 'Please type a correct customer name', 'md md-error');
        $location.path("/compliance");
                    }
            });
        };




        function addcompliance() {
            $http.post('/addcompliance?introCheckA=' + $scope.introCheckA + '&introCommentsA=' + $scope.introCommentsA + '&introCheckB=' + $scope.introCheckB + '&introCommentsB=' + $scope.introCommentsB + '&qualificationCheckA=' + $scope.qualificationCheckA + '&qualificationCommentsA=' + $scope.qualificationCommentsA + '&qualificationCheckB=' + $scope.qualificationCheckB + '&qualificationCommentsB=' + $scope.qualificationCommentsB + '&qualificationCheckC=' + $scope.qualificationCheckC + '&qualificationCommentsC=' + $scope.qualificationCommentsC + '&qualificationCheckD=' + $scope.qualificationCheckD + '&qualificationCommentsD=' + $scope.qualificationCommentsD + '&qualificationCheckE=' + $scope.qualificationCheckE + '&qualificationCommentsE=' + $scope.qualificationCommentsE + '&backgroundCheckA=' + $scope.backgroundCheckA + '&backgroundCommentsA=' + $scope.backgroundCommentsA + '&selectionCheckA=' + $scope.selectionCheckA + '&selectionCommentsA=' + $scope.selectionCommentsA + '&selectionCheckB=' + $scope.selectionCheckB + '&selectionCommentsB=' + $scope.selectionCommentsB + '&selectionCheckC=' + $scope.selectionCheckC + '&selectionCommentsC=' + $scope.selectionCommentsC + '&selectionCheckD=' + $scope.selectionCheckD + '&selectionCommentsD=' + $scope.selectionCommentsD + '&selectionCheckE=' + $scope.selectionCheckE + '&selectionCommentsE=' + $scope.selectionCommentsE + '&selectionCheckF=' + $scope.selectionCheckF + '&selectionCommentsF=' + $scope.selectionCommentsF + '&selectionCheckG=' + $scope.selectionCheckG + '&selectionCommentsG=' + $scope.selectionCommentsG + '&costCheckA=' + $scope.costCheckA + '&costCommentsA=' + $scope.costCommentsA + '&costCheckB=' + $scope.costCheckB + '&costCommentsB=' + $scope.costCommentsB + '&costCheckC=' + $scope.costCheckC + '&costCommentsC=' + $scope.costCommentsC + '&costCheckD=' + $scope.costCheckD + '&costCommentsD=' + $scope.costCommentsD + '&costCheckE=' + $scope.costCheckE + '&costCommentsE=' + $scope.costCommentsE + '&costCheckF=' + $scope.costCheckF + '&costCommentsF=' + $scope.costCommentsF + '&costCheckG=' + $scope.costCheckG + '&costCommentsG=' + $scope.costCommentsG + '&urgencyCheckA=' + $scope.urgencyCheckA + '&urgencyCommentsA=' + $scope.urgencyCommentsA + '&urgencyCheckB=' + $scope.urgencyCheckB + '&urgencyCommentsB=' + $scope.urgencyCommentsB + '&urgencyCheckC=' + $scope.urgencyCheckC + '&urgencyCommentsC=' + $scope.urgencyCommentsC + '&urgencyCheckD=' + $scope.urgencyCheckD + '&urgencyCommentsD=' + $scope.urgencyCommentsD + '&urgencyCheckE=' + $scope.urgencyCheckE + '&urgencyCommentsE=' + $scope.urgencyCommentsE + '&othersCheckA=' + $scope.othersCheckA + '&othersCommentsA=' + $scope.othersCommentsA + '&othersCheckB=' + $scope.othersCheckB + '&othersCommentsB=' + $scope.othersCommentsB + '&othersCheckC=' + $scope.othersCheckC + '&othersCommentsC=' + $scope.othersCommentsC + '&othersCheckD=' + $scope.othersCheckD + '&othersCommentsD=' + $scope.othersCommentsD + '&othersCheckE=' + $scope.othersCheckE + '&othersCommentsE=' + $scope.othersCommentsE + '&othersCheckF=' + $scope.othersCheckF + '&othersCommentsF=' + $scope.othersCommentsF + '&cid=' + $scope.cid + '&yellowflag=' + $scope.yellowflag + '&redflag=' + $scope.redflag).success(function (data) {

                
                                        //successfully submit
       $rootScope.startAlert('success', 'Success', 'Well done! You have successfully submitted a new compliance form.', 'md md-done');
                $location.path("/listCompliance");


            });

        };
        
        
        
    }

    };







}]);
