app.controller('complianceDetailsCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location) {

    //check role and redirect for sole roles
    if (($scope.staffRole == 'superadmin') || ($scope.staffRole == 'compliance')) {
        console.log('works fine');
    } else {
        console.log('no permission dude');
        $location.path("/");
    }



    $scope.cid = $routeParams.cid;
    $scope.qid = $routeParams.qid;

    getComplianceDetails();

    function getComplianceDetails() {
        $http.get('/getComplianceDetails?qid=' + $scope.qid).success(function (data) {
            $scope.date = data[0].date;
            $scope.redflag = data[0].redflag;
            $scope.yellowflag = data[0].yellowflag;

            $scope.introCheckA = data[0].consultant_name_check;
            $scope.introCommentsA = data[0].consultant_name_comments;
            $scope.introCheckB = data[0].company_name_check;
            $scope.introCommentsB = data[0].company_name_comments;
            //console.log($scope.introCommentsA);
            $scope.qualificationCheckA = data[0].age_check;
            $scope.qualificationCommentsA = data[0].age_comments;
            $scope.qualificationCheckB = data[0].citizenship_check;
            $scope.qualificationCommentsB = data[0].citizenship_comments;
            $scope.qualificationCheckC = data[0].driving_offense_check;
            $scope.qualificationCommentsC = data[0].driving_offense_comments;
            $scope.qualificationCheckD = data[0].criminal_convictions_check;
            $scope.qualificationCommentsD = data[0].criminal_convictions_comments;
            $scope.qualificationCheckE = data[0].wh_visa_check;
            $scope.qualificationCommentsE = data[0].wh_visa_comments;
            $scope.backgroundCheckA = data[0].amount_travellers_check;
            $scope.backgroundCommentsA = data[0].amount_travellers_comments;

            $scope.selectionCheckA = data[0].departure_date_check;
            $scope.selectionCommentsA = data[0].departure_date_comments;
            $scope.selectionCheckB = data[0].min_time_check;
            $scope.selectionCommentsB = data[0].min_time_comments;
            $scope.selectionCheckC = data[0].job_placement_check;
            $scope.selectionCommentsC = data[0].job_placement_comments;
            $scope.selectionCheckD = data[0].job_type_check;
            $scope.selectionCommentsD = data[0].job_type_comments;
            $scope.selectionCheckE = data[0].location_check;
            $scope.selectionCommentsE = data[0].location_comments;
            $scope.selectionCheckF = data[0].wage_check;
            $scope.selectionCommentsF = data[0].wage_comments;
            $scope.selectionCheckG = data[0].work_hour_check;
            $scope.selectionCommentsG = data[0].work_hour_comments;

            $scope.costCheckA = data[0].money_save_check;
            $scope.costCommentsA = data[0].money_save_comments;
            $scope.costCheckB = data[0].cost_estimate_check;
            $scope.costCommentsB = data[0].cost_estimate_comments;
            $scope.costCheckC = data[0].program_price_check;
            $scope.costCommentsC = data[0].program_price_comments;
            $scope.costCheckD = data[0].exclusions_check;
            $scope.costCommentsD = data[0].exclusions_comments;
            $scope.costCheckE = data[0].flight_cost_check;
            $scope.costCommentsE = data[0].flight_cost_comments;
            $scope.costCheckF = data[0].visa_cost_check;
            $scope.costCommentsF = data[0].visa_cost_comments;
            $scope.costCheckG = data[0].insurance_cost_check;
            $scope.costCommentsG = data[0].insurance_cost_comments;

            $scope.urgencyCheckA = data[0].remaining_spots_check;
            $scope.urgencyCommentsA = data[0].remaining_spots_comments;
            $scope.urgencyCheckB = data[0].closing_week_check;
            $scope.urgencyCommentsB = data[0].closing_week_comments;
            $scope.urgencyCheckC = data[0].promotion_check;
            $scope.urgencyCommentsC = data[0].promotion_comments;
            $scope.urgencyCheckD = data[0].drop_price_check;
            $scope.urgencyCommentsD = data[0].drop_price_comments;
            $scope.urgencyCheckE = data[0].deposit_refund_check;
            $scope.urgencyCommentsE = data[0].deposit_refund_comments;

            $scope.othersCheckA = data[0].payment_plan_check;
            $scope.othersCommentsA = data[0].payment_plan_comments;
            $scope.othersCheckB = data[0].cooling_period_check;
            $scope.othersCommentsB = data[0].cooling_period_comments;
            $scope.othersCheckC = data[0].working_together_check;
            $scope.othersCommentsC = data[0].working_together_comments;
            $scope.othersCheckD = data[0].tax_return_check;
            $scope.othersCommentsD = data[0].tax_return_comments;
            $scope.othersCheckE = data[0].travell_global_check;
            $scope.othersCommentsE = data[0].travell_global_comments;
            $scope.othersCheckF = data[0].inclusions_check;
            $scope.othersCommentsF = data[0].inclusions_comments;
            //ng-class="{yellowFlag: urgencyyellowflagA}"

            if ($scope.introCheckB == 'no') {
                $scope.introyellowflag = true;
            }
            if ($scope.qualificationCheckC == 'no') {
                $scope.qualificationyellowflagC = true;
            }
            if ($scope.qualificationCheckD == 'no') {
                $scope.qualificationyellowflagD = true;
            }
            if ($scope.selectionCheckC == 'yes') {
                $scope.selectionredflagC = true;
            }
            if ($scope.selectionCheckD == 'yes') {
                $scope.selectionredflagD = true;
            }
            if ($scope.selectionCheckE == 'yes') {
                $scope.selectionredflagE = true;
            }
            if ($scope.selectionCheckF == 'yes') {
                $scope.selectionredflagF = true;
            }
            if ($scope.selectionCheckG == 'yes') {
                $scope.selectionredflagG = true;
            }
            if ($scope.costCheckC == 'no') {
                $scope.costredflagC = true;
            }
            if ($scope.costCheckD == 'no') {
                $scope.costredflagD = true;
            }
            if ($scope.costCheckE == 'yes') {
                $scope.costredflagE = true;
            }
            if ($scope.costCheckG == 'yes') {
                $scope.costredflagG = true;
            }
            if ($scope.urgencyCheckA == 'yes') {
                $scope.urgencyyellowflagA = true;
            }
            if ($scope.urgencyCheckB == 'yes') {
                $scope.urgencyyellowflagB = true;
            }
            if ($scope.urgencyCheckC == 'yes') {
                $scope.urgencyyellowflagC = true;
            }
            if ($scope.urgencyCheckE == 'yes') {
                $scope.urgencyredflagE = true;
            }

        });
    };

    getComplianceNames();

    function getComplianceNames() {
        $http.get('/getinfo?cid=' + $scope.cid).success(function (data) {
            $scope.firstname = data[0].first_name;
            $scope.lastname = data[0].last_name;

        });
    };

}]);
