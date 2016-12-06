app.controller('payrollCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$rootScope', '$aside', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $rootScope, $aside) {

	
    findPayroll();
    function findPayroll() {
        $http.get('/findPayroll').success(function (data) {
            console.log('test all payroll', data);
            $scope.payrollList = data;

            $scope.payrollListTable = new NgTableParams({
                page: 1,
                count: 10,

            }, {
                total: $scope.payrollList.length,
                getData: function (params) {
                    $scope.data = params.sorting() ? $filter('orderBy')($scope.payrollList, params.orderBy()) : $scope.payrollList;
                    $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                    $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    //$defer.resolve($scope.data);
                    return $scope.data;
                }
            });

			$scope.hidePending = true;
			$scope.hideArchive = false;

        });
    };
	
	
  	$scope.findArchivedPayrun = function () {
		  $http.get('/findArchivedPayrun').success(function (data2) {
        
            $scope.payrollList = data2;

            $scope.payrollListTable = new NgTableParams({
                page: 1,
                count: 10,

            }, {
                total: $scope.payrollList.length,
                getData: function (params) {
                    $scope.data = params.sorting() ? $filter('orderBy')($scope.payrollList, params.orderBy()) : $scope.payrollList;
                    $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                    $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    //$defer.resolve($scope.data);
                    return $scope.data;
                }
            });

			  
			$scope.hidePending = false;
			$scope.hideArchive = true;  
			  
        });
		  
	};	
	
	
	$scope.findPendingPayrun = function () {
			findPayroll();
		  
	};	
	
	var editPayrollTPL = $aside({
        scope: $scope,
        template: '../sales/editPayrollTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-right'
    });

	$scope.hideEditPayrollTPL = function () {
		
		$scope.resetThisPayroll();
		//need to reset later
		editPayrollTPL.hide();
 	};

	
	
    $scope.checkPayroll = function (user) {
		
		$scope.totalPresentation = 0;
		editPayrollTPL.show();
		$scope.editingPayroll = user;
		$scope.totalClamingAmount = 0;
		
		if($scope.editingPayroll.presentation_ids != '')
			{
					var presentationIds = $scope.editingPayroll.presentation_ids.slice(0, -1);
					console.log('presentationIds', presentationIds);
					$http.get('/getApprovedPresentation?pids=' + presentationIds).success(function (data) {
						console.log('all approved presentations detail', data);
						
						$scope.approvedPresentationList = data;
						
						for (var i=0; i<$scope.approvedPresentationList.length; i++)
							{
									$scope.totalPresentation = $scope.totalPresentation + parseInt($scope.approvedPresentationList[i].amount);
									
							}
					
			 		});
			}
			
		
		if($scope.editingPayroll.commission_ids != '')
			{
					var commissionIds = $scope.editingPayroll.commission_ids.slice(0, -1);
					console.log('commissionids', commissionIds);
					$http.get('/getChangedCommissions?ids=' + commissionIds).success(function (data) {
						console.log('all changed commissions detail', data);
						$scope.changedCommissionList = data;
						
						for (var i=0; i<$scope.changedCommissionList.length; i++)
							{
								if($scope.changedCommissionList[i].sales_status == 'approved')
									{
										$scope.totalClamingAmount = $scope.totalClamingAmount + parseInt($scope.changedCommissionList[i].commission);
									}
							}
					
			 		});
			}

	
		
		$scope.bonuscurrency = {
				availableOptions: [
					{
						id: 'GBP',
						name: 'GBP'
					},
					{
						id: 'USD',
						name: 'USD'
					},
					{
						id: 'AUD',
						name: 'AUD'
					},
					{
						id: 'CAD',
						name: 'CAD'
					}
				],
				selectedOption: {
					id: $scope.editingPayroll.bonus_currency,
					name: $scope.editingPayroll.bonus_currency
				}
			};
		
		$scope.deductioncurrency = {
				availableOptions: [
					{
						id: 'GBP',
						name: 'GBP'
					},
					{
						id: 'USD',
						name: 'USD'
					},
					{
						id: 'AUD',
						name: 'AUD'
					},
					{
						id: 'CAD',
						name: 'CAD'
					}
    			],
				selectedOption: {
					id: $scope.editingPayroll.deduction_currency,
					name: $scope.editingPayroll.deduction_currency
				}
			};
		
		$scope.approveThisPayroll = function () {
			console.log($scope.editingPayroll.payroll_id);
			        $http.post('/approveThisPayroll?id=' + $scope.editingPayroll.payroll_id).success(function (data) {
					findPayroll();
					editPayrollTPL.hide();
					$rootScope.startAlert('success', 'Success', 'Fine! You have successfully approved this payroll.', 'md md-done');
				

        });
			
 	};

		
		
			$scope.updateThisPayroll = function () {
				$scope.totalResult = 0;
				
				console.log('test presentation list', $scope.approvedPresentationList);
				
						
				$scope.totalResult = $scope.totalResult + $scope.totalClamingAmount;
							
					
				$scope.totalResult = $scope.totalResult + parseInt($scope.editingPayroll.bonus_amount) - parseInt($scope.editingPayroll.deduction_amount) + $scope.totalPresentation - parseInt($scope.editingPayroll.table_fee);
				
				
			        $http.post('/updateThisPayroll?id=' + $scope.editingPayroll.payroll_id + '&tableFee=' + $scope.editingPayroll.table_fee + '&bonusAmount=' + $scope.editingPayroll.bonus_amount + '&bonusCurrency=' + $scope.bonuscurrency.selectedOption.id + '&bonusDescription=' + $scope.editingPayroll.bonus_description + '&deductionAmount=' + $scope.editingPayroll.deduction_amount + '&deductionCurrency=' + $scope.deductioncurrency.selectedOption.id + '&deductionDescription=' + $scope.editingPayroll.deduction_description + '&total=' + $scope.totalResult).success(function (data) {
					findPayroll();
					editPayrollTPL.hide();
					$rootScope.startAlert('success', 'Success', 'Fine! You have successfully updated this payroll.', 'md md-done');
				

        });
 	};
		

		$scope.resetThisPayroll = function () {
			 $http.get('/refreshPayrollData?id=' + user.payroll_id).success(function (data) {
				 	
				 	$scope.editingPayroll = data[0];
				 	console.log($scope.editingPayroll);
				 	console.log('user', user);
				 	user = $scope.editingPayroll;//why??..
				 
				  });
			
	};
		
		
};



}]);
