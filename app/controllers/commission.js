app.controller('commissionCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$rootScope', '$aside', '$window', '$route', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $rootScope, $aside, $window, $route) {

    //check role and redirect for sole roles
    if (($scope.staffRole == 'superadmin') || ($scope.staffRole == 'sales')) {
        console.log('works fine');
    } else {
        console.log('no permission dude');
        $location.path("/");
    }


	$scope.tableFee = 0;
    
    
	
	var addPresentationTPL = $aside({
        scope: $scope,
        template: '../sales/addPresentationTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
 	findAllBambooStaff();
	function findAllBambooStaff() {
		$http.get('/findAllBambooStaff').success(function (data) {
			
			console.log('bamboo data', data);
			
			$scope.allStaffs = [];
			$scope.allBambooList = [];
			
			for (i=0; i<data.length; i++)
				{
					if(data[i].fields.department == 'Sales')
						{
							var name = data[i].fields.firstName + ' ' + data[i].fields.lastName;
							$scope.allStaffs.push(name);
							
							var one = {
								name: name,
								office: data[i].fields.location 
							};
							$scope.allBambooList.push(one);
						}				
				}
			
			console.log('staff name list', $scope.allStaffs);
			console.log('all Bamboo List', $scope.allBambooList);
			  
			$scope.selected = { value: 'Select Staff Name' };
			
//payrun date list
			$scope.payrunDateList = {
        			availableOptions: [
            			{
                			id: '1',
                			string: 'Pay Run 1 (28/12/2015 - 08/01/2016)',
							begin: '2015-12-28',
							end: '2016-01-08'
            			},
						{
                			id: '2',
                			string: 'Pay Run 2 (11/01/2016 - 22/01/2016)',
							begin: '2016-01-11',
							end: '2016-01-22'
            			},
						{
                			id: '3',
                			string: 'Pay Run 3 (25/01/2016 - 05/02/2016)',
							begin: '2016-01-25',
							end: '2016-02-05'
            			},
						{
                			id: '4',
                			string: 'Pay Run 4 (08/02/2016 - 19/02/2016)',
							begin: '2016-02-08',
							end: '2016-02-19'
            			},
						{
                			id: '5',
                			string: 'Pay Run 5 (22/02/2016 - 04/03/2016)',
							begin: '2016-02-22',
							end: '2016-03-04'
            			},
						{
                			id: '6',
                			string: 'Pay Run 6 (07/03/2016 - 18/03/2016)',
							begin: '2016-03-07',
							end: '2016-03-18'
            			},
						{
                			id: '7',
                			string: 'Pay Run 7 (21/03/2016 - 01/04/2016)',
							begin: '2016-03-21',
							end: '2016-04-01'
            			},
						{
                			id: '8',
                			string: 'Pay Run 8 (04/04/2016 - 15/04/2016)',
							begin: '2016-04-04',
							end: '2016-04-15'
            			},
						{
                			id: '9',
                			string: 'Pay Run 9 (18/04/2016 - 29/04/2016)',
							begin: '2016-04-18',
							end: '2016-04-29'
            			},
						{
                			id: '10',
                			string: 'Pay Run 10 (02/05/2016 - 13/05/2016)',
							begin: '2016-05-02',
							end: '2016-05-13'
            			},
						{
                			id: '11',
                			string: 'Pay Run 11 (16/05/2016 - 27/05/2016)',
							begin: '2016-05-16',
							end: '2016-05-27'
            			},
						{
                			id: '12',
                			string: 'Pay Run 12 (30/05/2016 - 10/06/2016)',
							begin: '2016-05-30',
							end: '2016-06-10'
            			},
						{
                			id: '13',
                			string: 'Pay Run 13 (13/06/2016 - 24/06/2016)',
							begin: '2016-06-13',
							end: '2016-06-24'
            			},
						{
                			id: '14',
                			string: 'Pay Run 14 (27/06/2016 - 08/07/2016)',
							begin: '2016-06-27',
							end: '2016-07-08'
            			},
						{
                			id: '15',
                			string: 'Pay Run 15 (11/07/2016 - 22/07/2016)',
							begin: '2016-07-11',
							end: '2016-07-22'
            			},
						{
                			id: '16',
                			string: 'Pay Run 16 (25/07/2016 - 05/08/2016)',
							begin: '2016-07-25',
							end: '2016-08-05'
            			},
						{
                			id: '17',
                			string: 'Pay Run 17 (08/08/2016 - 19/08/2016)',
							begin: '2016-08-08',
							end: '2016-08-19'
            			},
						{
                			id: '18',
                			string: 'Pay Run 18 (22/08/2016 - 02/09/2016)',
							begin: '2016-08-22',
							end: '2016-09-02'
            			},
						{
                			id: '19',
                			string: 'Pay Run 19 (05/09/2016 - 16/09/2016)',
							begin: '2016-09-05',
							end: '2016-09-16'
            			},
						{
                			id: '20',
                			string: 'Pay Run 20 (19/09/2016 - 30/09/2016)',
							begin: '2016-09-19',
							end: '2016-09-30'
            			},
						{
                			id: '21',
                			string: 'Pay Run 21 (03/10/2016 - 14/10/2016)',
							begin: '2016-10-03',
							end: '2016-10-14'
            			},
						{
                			id: '22',
                			string: 'Pay Run 22 (17/10/2016 - 28/10/2016)',
							begin: '2016-10-17',
							end: '2016-10-28'
            			},
						{
                			id: '23',
                			string: 'Pay Run 23 (31/10/2016 - 11/11/2016)',
							begin: '2016-10-31',
							end: '2016-11-11'
            			},
						{
                			id: '24',
                			string: 'Pay Run 24 (14/11/2016 - 25/11/2016)',
							begin: '2016-11-14',
							end: '2016-11-25'
            			},
						{
                			id: '25',
                			string: 'Pay Run 25 (28/11/2016 - 09/12/2016)',
							begin: '2016-11-28',
							end: '2016-12-09'
            			},
						{
                			id: '26',
                			string: 'Pay Run 26 (12/12/2016 - 23/12/2016)',
							begin: '2016-12-12',
							end: '2016-12-23'
            			}
    			],
        			selectedOption: {
            			id: '1',
						string: 'Pay Run 1 (28/12/2015 - 08/01/2016)',
						begin: '2015-12-28',
						end: '2016-01-08'
        			}
    			};
		
			$scope.payrunSelectChange = function () {
				
			
//				console.log(parseInt($scope.presentationAmount1) + 1);
//				console.log($scope.presentationAmount1 + 1);
//				console.log($scope.presentationAmount1 + $scope.presentationAmount1);
			};
			
			$scope.searchCommissions = function () {

				console.log($scope.selected.value);
				searchCommissionList();
		
				//search presentation list
				searchPresentationList();
				
				
				//add new presentation for this staff
$scope.presentationStatusAdding = {
        availableOptions: [
            {
                id: 'pending',
                name: 'Pending'
            },
{
                id: 'declined',
                name: 'Declined'
            },
            {
                id: 'approved',
                name: 'Approved'
            }
    ],
        selectedOption: {
            id: 'pending',
            name: 'Pending'
        }
    };
$scope.addNewPresentation = function () {
	addPresentationTPL.show();
	$scope.staffAdding = $scope.selected.value;
	
	for (i=0; i<$scope.allBambooList.length; i++)
		{
			if ($scope.allBambooList[i].name == $scope.selected.value)
				{
					$scope.officeAdding = $scope.allBambooList[i].office;
				}
		}	
};
				
$scope.hideAddPresentationTPL = function () {
	addPresentationTPL.hide();
};
				
$scope.addP = function (attendDateAdding, presentationAdding, presentationAmountAdding) {
$http.post('/addP?attendDateAdding=' + attendDateAdding + '&presentationAdding=' + presentationAdding + '&presentationAmountAdding=' + presentationAmountAdding + '&staffAdding=' + $scope.staffAdding + '&officeAdding=' + $scope.officeAdding + '&status=' + $scope.presentationStatusAdding.selectedOption.id).success(function (data) {
	addPresentationTPL.hide();
    searchPresentationList();     

        });
};
      
		};
			
			$scope.searchAllArchive = function () {
				$http.get('/searchAllArchive').success(function (data2) {
						 $scope.list = data2;
					for (var i=0; i<$scope.list.length; i++)
						{
							$scope.list[i].tableIndex = i + 1;  
                            
                            if ($scope.list[i].first_name)
                            {
                                $scope.list[i].fullname = $scope.list[i].first_name + ' ' + $scope.list[i].last_name;
                            }else
                                {
                                    $scope.list[i].fullname = 'NA'
                                }
                            
                            
                            
                            if ($scope.list[i].cid)
								{
									$scope.list[i].bookingStatus = 'Received';
								}
							else
								{
									$scope.list[i].bookingStatus = 'Not Received';
								}
						}
					
					
							$scope.resumesTable = new NgTableParams({
                					page: 1,
                					count: 10,
									sorting: {
        								tableIndex: 'desc' // initial sorting
    								}
            					}, {
                					total: $scope.list.length,
                					getData: function (params) {
                    						$scope.data = params.sorting() ? $filter('orderBy')($scope.list, params.orderBy()) : $scope.list;
                    						$scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                    						$scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    						//$defer.resolve($scope.data);
                    						return $scope.data;
                					}
            					});
					
				 });
				
				
            $http.get('/searchAllPresentationArchive').success(function (data3) {
						 $scope.presentationList = data3;
						
                for (var i=0; i<$scope.presentationList.length; i++)
                    {
                        $scope.presentationList[i].tableIndex = i + 1;   
                    }
                    
						$scope.presentationTable = new NgTableParams({
                page: 1,
                count: 10,
sorting: {
        tableIndex: 'desc' // initial sorting
    }
            }, {
                total: $scope.presentationList.length,
                getData: function (params) {
                    $scope.data2 = params.sorting() ? $filter('orderBy')($scope.presentationList, params.orderBy()) : $scope.presentationList;
                    $scope.data2 = params.filter() ? $filter('filter')($scope.data2, params.filter()) : $scope.data2;
                    $scope.data2 = $scope.data2.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    //$defer.resolve($scope.data);
                    return $scope.data2;
                }
            });
					
					
				 });
				
				
			};
			
//switch button for staff role in form

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
            			id: 'AUD',
            			name: 'AUD'
        			}
    			};
			
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
            			id: 'AUD',
            			name: 'AUD'
        			}
    			};
		
//	 $scope.todoList = [];
//    
//        $scope.todoAdd = function() {
//			
//			if($scope.todoList.length == 9){
//                console.log('rearch maximum number');
//            }else
//				{
//					$scope.dis = true;  
//        			$scope.todoList.push({done:false});
//				}
//   
//    };
//        $scope.remove = function(index) {
//         
//        $scope.todoList.splice(index, 1);
//            if($scope.todoList.length == 0){
//                $scope.dis = false;
//            }
//    };		
			
			
$scope.updateThisPage = function() {
			
	console.log($scope.data[0].commission);
	console.log('all data', $scope.data);
	$scope.commission_ids = '';
	
	$scope.allChangedCommissions = [];
	$scope.totalCommission = 0;
	
	//counting commissions
					for (var i=0; i<$scope.data.length; i++)
					{
						if ($scope.data[i].sales_status != 'pending')
							{
								
								$scope.commission_ids = $scope.commission_ids + $scope.data[i].sales_id + ',';
						

								var oneChangedCommission = 
									{
										id: $scope.data[i].sales_id,
										status: $scope.data[i].sales_status,
										amount: $scope.data[i].commission
									}
								$scope.allChangedCommissions.push(oneChangedCommission);
								
								if ($scope.data[i].sales_status == 'approved')
									{
										$scope.totalCommission = $scope.totalCommission + parseInt($scope.data[i].commission);
										
									}
								
								
							}
						
					}
	
	//counting presentations amount and ids
	$scope.approvedPresentation_ids = '';
						for (var j=0; j<$scope.data2.length; j++)
					{
						if ($scope.data2[j].status == 'approved')
							{
								var pid = $scope.data2[j].presentation_id;
								$scope.approvedPresentation_ids = $scope.approvedPresentation_ids + pid + ',';
								$scope.totalCommission = $scope.totalCommission + parseInt($scope.data2[j].amount);	
							}
							
						
					}

	console.log('changed status commissions', $scope.allChangedCommissions);
	$scope.totalCommission = $scope.totalCommission + parseInt($scope.bonusAmount) - parseInt($scope.deductionAmount) - parseInt($scope.tableFee);
	
	console.log('total commission is ', $scope.totalCommission);
//				var todoListJSON = JSON.stringify($scope.todoList);     
				$http.post('/addPayroll?approvedPresentation_ids=' + $scope.approvedPresentation_ids + '&tableFee=' + $scope.tableFee + '&bonusAmount=' + $scope.bonusAmount + '&bonusCurrency=' + $scope.bonuscurrency.selectedOption.id + '&bonusDescription=' + $scope.bonusDescription + '&deductionAmount=' + $scope.deductionAmount + '&deductionCurrency=' + $scope.deductioncurrency.selectedOption.id + '&deductionDescription=' + $scope.deductionDescription + '&commissionIds=' + $scope.commission_ids + '&staff=' + $scope.selected.value + '&user=' + $rootScope.name + '&payrollNo=' + $scope.payrunDateList.selectedOption.id + '&totalcommissionamount=' + $scope.totalCommission).success(function (datar) {
					
					$scope.tableFee = 0;
					
                    console.log('success', datar);		
					$rootScope.startAlert('success', 'Success', 'Well done! You have successfully saved a new payroll recoreds.', 'md md-done');
					//update sales table multiple rows now
					$scope.updateEnd = false;
					$scope.presentationUpdateEnd = false;
					for (var j=0; j<$scope.allChangedCommissions.length; j++)
						{
							
							if (j == ($scope.allChangedCommissions.length - 1))
								{
									$scope.updateEnd = true;
								}
							updatecommission($scope.allChangedCommissions[j].id, $scope.allChangedCommissions[j].amount, $scope.allChangedCommissions[j].status);
						}
					
						for (var t=0; t<$scope.data2.length; t++)
						{
							
							if (t == ($scope.data2.length - 1))
								{
									$scope.presentationUpdateEnd = true;
								}
							updatePresentation($scope.data2[t].presentation_id, $scope.data2[t].attend_day, $scope.data2[t].presentation, $scope.data2[t].status, $scope.data2[t].amount);
						}
					
			  	});
	
				
	
   
 };
			
			
			
			
//commission details and editing
	var editCommissionTPL = $aside({
        scope: $scope,
        template: '../sales/editCommissionTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
			
			
			$scope.viewCommissionDetail = function (r) {
				//view slide page now
				editCommissionTPL.show();
				$scope.editingCommission = r;
				$scope.editingCommission.commission = parseInt(r.commission);
				
				$scope.editingCommissionCurrency = {
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
            			id: $scope.editingCommission.currency,
            			name: $scope.editingCommission.currency
        			}
    			};
				
				$scope.editingCommissionStatus = {
        			availableOptions: [
            			{
                			id: 'pending',
                			name: 'pending'
            			},
						{
                			id: 'declined',
                			name: 'declined'
            			},
            			{
                			id: 'approved',
                			name: 'approved'
            			}
    			],
        			selectedOption: {
            			id: $scope.editingCommission.sales_status,
            			name: $scope.editingCommission.sales_status
        			}
    			};
				
				$scope.editingCommissionOffice = {
        			availableOptions: [
            			{
                			id: 'Australia',
                			name: 'Australia'
            			},
            			{
                			id: 'Canada',
                			name: 'Canada'
            			},
            			{
                			id: 'UK',
                			name: 'UK'
            			}
    			],
        			selectedOption: {
            			id: $scope.editingCommission.office,
            			name: $scope.editingCommission.office
        			}
    			};
				
				
				//update one commission
				$scope.updateCommissionDetail = function (editingCommission) {
					console.log('testg test tesgt', editingCommission);
					$http.post('/updateCommissionDetail?id=' + editingCommission.sales_id + '&amount=' + editingCommission.commission + '&currency=' + $scope.editingCommissionCurrency.selectedOption.id + '&status=' + $scope.editingCommissionStatus.selectedOption.id + '&staff=' + editingCommission.staff + '&office=' + $scope.editingCommissionOffice.selectedOption.id + '&note=' + editingCommission.note + '&email=' + editingCommission.customer_email).success(function (data) {
					editCommissionTPL.hide();	
          

        			});
					
				};	
				
				
				
			};
			
			$scope.hideEditCommissionTPL = function () {
				editCommissionTPL.hide();
                
			};
	
//presentation table details and editing
	var editPresentationTPL = $aside({
        scope: $scope,
        template: '../sales/editPresentationTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
            
   $scope.viewPresentationDetail = function (p) {     
       editPresentationTPL.show();
       $scope.editingPresentation = p;
       
          $scope.editingPresentationStatus = {
        availableOptions: [
            {
                id: 'pending',
                name: 'Pending'
            },
            {
                id: 'declined',
                name: 'Declined'
            },
            {
                id: 'approved',
                name: 'Approved'
            }
        ],
            selectedOption: {
                id: $scope.editingPresentation.status,
                name: $scope.editingPresentation.status
            }
        };
       
       $scope.editingPresentation.presentation = parseInt(p.presentation);
       $scope.editingPresentation.amount = parseInt(p.amount);
       
       
       
   $scope.hideEditPresentationTPL = function () {
        editPresentationTPL.hide();
        $scope.editingPresentation = p;//
    };
       
    $scope.cancelPresentationDetail = function () {
         $scope.editingPresentation = p;//
    };
       
       
   };
   


    $scope.updatePresentationDetail = function (editingPresentation) {
					$http.post('/updatePresentationDetail?pid=' + editingPresentation.presentation_id + '&attenday=' + editingPresentation.attend_day + '&presentation=' + editingPresentation.presentation + '&status=' + $scope.editingPresentationStatus.selectedOption.id + '&amount=' + editingPresentation.amount).success(function (data) {
					editPresentationTPL.hide();	
          

        			});
					
				};	
            
//visit profile in a new tab
			$scope.viewprofile = function (cid) {
				
				$window.open($rootScope.remoteURL + '/views/main/main.html#/viewProfile/' + cid, '_blank');
			};
			
		
     });
		
	};		
    
	
	function updatecommission(id, amount, status) {
        $http.post('/updatecommission?id=' + id + '&amount=' + amount + '&status=' + status).success(function (data) {
			
           console.log('one record', data);
			if ($scope.updateEnd)
				{
					$scope.updateEnd = false;
					 $rootScope.startAlert('success', 'Success', 'Well done! You have successfully updated all commission recoreds.', 'md md-done');
					
					//reload page
//					$route.reload();
				}

        });
    };


	function updatePresentation(pid, attendDay, presentation, status, amount) {
        $http.post('/updatePresentation?pid=' + pid + '&attendDay=' + attendDay + '&presentation=' + presentation + '&status=' + status + '&amount=' + amount).success(function (data) {
			
           console.log('one record', data);
			if ($scope.presentationUpdateEnd)
				{
					$scope.presentationUpdateEnd = false;
				 	$rootScope.startAlert('success', 'Success', 'Well done! You have successfully updated all presentation recoreds.', 'md md-done');
					
					//reload page
//					$route.reload();
				}

        });
    };
	

		function adddate(originaldate, addDay) {
				var date = new Date(originaldate);
				var newdate = new Date(originaldate);
			 	newdate.setDate(newdate.getDate() + addDay);
			  	var dd = newdate.getDate();
				var mm = newdate.getMonth() + 1;
				var y = newdate.getFullYear();
				var newDay = y + '-' + mm + '-' + dd;
			console.log('aaaa', newdate);
			console.log(newDay);
			console.log(dd);
			console.log(mm);
			console.log(y);
        		return newDay;
    };
	
	function searchCommissionList() {
        $http.get('/searchCommissions?staff=' + $scope.selected.value + '&startdate=' + $scope.payrunDateList.selectedOption.begin + '&enddate=' + $scope.payrunDateList.selectedOption.end).success(function (data) {
$scope.list = data;
            
for (var i=0; i<$scope.list.length; i++)
{
 $scope.list[i].tableIndex = i + 1;   
console.log('repeat', $scope.list[i].cid);

if ($scope.list[i].first_name)
    {
        $scope.list[i].fullname = $scope.list[i].first_name + ' ' + $scope.list[i].last_name;
    }else
        {
            $scope.list[i].fullname = 'NA'
        }
    
if ($scope.list[i].cid)
{
$scope.list[i].bookingStatus = 'Received';
}
else
{
$scope.list[i].bookingStatus = 'Not Received';
}
}
$scope.resumesTable = new NgTableParams({
                page: 1,
                count: 10,
sorting: {
        tableIndex: 'desc' // initial sorting
    }
            }, {
                total: $scope.list.length,
                getData: function (params) {
                    $scope.data = params.sorting() ? $filter('orderBy')($scope.list, params.orderBy()) : $scope.list;
                    $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                    $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    //$defer.resolve($scope.data);
                    return $scope.data;
                }
            });
});
    };
	
	
	function searchPresentationList() {
        $http.get('/searchPresentation?staff=' + $scope.selected.value + '&startdate=' + $scope.payrunDateList.selectedOption.begin + '&enddate=' + $scope.payrunDateList.selectedOption.end).success(function (data) {
$scope.presentationList = data;
console.log(data);
            
for (var i=0; i<$scope.presentationList.length; i++)
{
 $scope.presentationList[i].tableIndex = i + 1;   
}
            
$scope.presentationTable = new NgTableParams({
                page: 1,
                count: 10,
sorting: {
        tableIndex: 'desc' // initial sorting
    }
            }, {
                total: $scope.presentationList.length,
                getData: function (params) {
                    $scope.data2 = params.sorting() ? $filter('orderBy')($scope.presentationList, params.orderBy()) : $scope.presentationList;
                    $scope.data2 = params.filter() ? $filter('filter')($scope.data2, params.filter()) : $scope.data2;
                    $scope.data2 = $scope.data2.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    //$defer.resolve($scope.data);
                    return $scope.data2;
                }
            });

});
    };
	

}]);
