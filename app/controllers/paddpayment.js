// Add Payment Controller to Mysql
app.controller('addPaymentCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', 'ngDialog', '$timeout', '$rootScope', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, ngDialog, $timeout, $rootScope) {


    //check role and redirect for sole roles
    if (($scope.staffRole == 'superadmin') || ($scope.staffRole == 'coordinator')) {
        console.log('works fine');
    } else {
        console.log('no permission dude');
        $location.path("/");
    }
    
    
   console.log('rootscope', $rootScope.name);


    $scope.remove = function () {
        

        console.log('alert starting');
        var myEl = angular.element(document.querySelector('#divID'));
      	
		myEl.empty(); 
 
    };



   
    $scope.data2 = {
        availableOptions: [
            {
                id: 'Paid',
                name: 'Paid'
            },
            {
                id: 'Next',
                name: 'Next'
            },
            {
                id: 'Error',
                name: 'Error'
            },
            {
                id: 'Refund',
                name: 'Refund'
            },
            {
                id: 'Discount',
                name: 'Discount'
            },
            {
                id: 'On Hold',
                name: 'On Hold'
            }
    ],
        selectedOption: {
            id: 'Paid',
            name: 'Paid'
        }
    };

    $scope.data3 = {
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
    
        $scope.data4 = {
        availableOptions: [
            {
                id: 'Week',
                name: 'Week'
            },
            {
                id: 'Month',
                name: 'Month'
            }
    ],
        selectedOption: {
            id: 'Week',
            name: 'Week'
        }
    };
    checkOffice();
    function checkOffice() {
        $http.get('/checkOffice').success(function (data) {
            if(data == 'canada')
                {
                    $scope.data3.selectedOption.name = 'CAD';
                    $scope.data3.selectedOption.id = 'CAD';
                }
            if(data == 'uk')
                {
                    $scope.data3.selectedOption.name = 'GBP';
                    $scope.data3.selectedOption.id = 'GBP';
                }
            if(data == 'australia')
                {
                    $scope.data3.selectedOption.name = 'AUD';
                    $scope.data3.selectedOption.id = 'AUD';
                }

        });
    };
    
$scope.dis = false;    
$scope.repeatCheck = 'NO';
$scope.isDisabled = true;
    $scope.myFunction = function () {
        if ($scope.repeatCheck == 'YES')
            {
                $scope.isDisabled = false;
            }else
                {
                    $scope.isDisabled = true;
                }
    };
    
    
    //find all customers name
    findcustomersName();

    function findcustomersName() {
        $http.get('/findcustomersName').success(function (data) {
            $scope.customerName2 = "";
            var fullname = [];
            for (i = 0; i < data.length; i++) {

                var f = data[i].first_name + ', ' + data[i].last_name;
                    
                fullname.push(f);
            }
            //console.log(fullname);
            $scope.states = fullname;
        });
    };
    $scope.addpayment = function () {

            
        console.log('testttttt', $scope.selectedState);
        
        var customerName2 = $scope.customerName2;
        var paymentStatus = $scope.data2.selectedOption.name;
        var paymentAmount = $scope.paymentAmount;
        var paymentDate = $scope.paymentDate;
        var currency = $scope.data3.selectedOption.name;
        console.log('1', paymentDate);
        getCID();
//if input second time too fast, will add more alerts, need to check later
        function getCID() {
            $http.get('/getCID?customerName2=' + customerName2).success(function (data) {
                if (data.length == 1) {
                    console.log('this is not a test ok?????', data[0].cid);
         if ($scope.repeatCheck == 'NO'){
                        
		 $http.post('/addPayment?customerName2=' + customerName2 + '&paymentStatus=' + paymentStatus + '&paymentAmount=' + paymentAmount + '&paymentDate=' + paymentDate + '&currency=' + currency + '&cid=' + data[0].cid + '&staffname=' + $rootScope.name).success(function (data2) {
                        
                if($scope.todoList.length > 0)
                 {
                       console.log('ok, here is the list');       
                      for (i=0; i<$scope.todoList.length; i++)
                          {
                              addtodopayments(i,data[0].cid);
                              
                              console.log(i);
                          }
                     
                     
                 }else
                     {
                         $scope.customerName2 = null;
                        $scope.paymentAmount = null;
                        $scope.paymentDate = null;
                       
                        $rootScope.startAlert('success', 'Success', 'Well done! You successfully submit new payment form.', 'md md-done');
                     }
                                                            
                                                                         
                                                                         
                    });
                  
                    
             
                    }else
                        {
                            if ((!$scope.repeatTime) || (!$scope.repeatPeriod))
                                {
                                    console.log('another test ok?????');             
                    $scope.customerName2 = null;
                    $scope.paymentAmount = null;
                    $scope.paymentDate = null;
                 
                    $rootScope.startAlert('danger', 'Error', 'Well, you must enter the repeat times and period', 'md md-error');
                                }else
                                    {
                                        
                                        if ($scope.data4.selectedOption.name == 'Week')
                                {
                                             $http.post('/addPaymentRepeatweek?customerName2=' + customerName2 + '&paymentStatus=' + paymentStatus + '&paymentAmount=' + paymentAmount + '&paymentDate=' + paymentDate + '&currency=' + currency + '&cid=' + data[0].cid + '&staffname=' + $rootScope.name + '&period=' + $scope.repeatPeriod + '&times=' + $scope.repeatTime).success(function (data) {
                        $scope.customerName2 = null;
                        $scope.paymentAmount = null;
                        $scope.paymentDate = null;
                       
                        $rootScope.startAlert('success', 'Success', 'Well done! You successfully submit MULTIPLE new payments.', 'md md-done');
                    });
                                                    
                                }else if ($scope.data4.selectedOption.name == 'Month')
                                    {
                                                                                         $http.post('/addPaymentRepeatmonth?customerName2=' + customerName2 + '&paymentStatus=' + paymentStatus + '&paymentAmount=' + paymentAmount + '&paymentDate=' + paymentDate + '&currency=' + currency + '&cid=' + data[0].cid + '&staffname=' + $rootScope.name + '&period=' + $scope.repeatPeriod + '&times=' + $scope.repeatTime).success(function (data) {
                        $scope.customerName2 = null;
                        $scope.paymentAmount = null;
                        $scope.paymentDate = null;
                       
                        $rootScope.startAlert('success', 'Success', 'Well done! You successfully submit MULTIPLE new payments monthly.', 'md md-done');
                    });
                                        
                                        
                                        
                                    }

                                        
                                        
                                    }
                            
                            
                         
                            

                        }
                    
                    
                    
                    
                    
                    
                    

                } else {
                    console.log('another test ok?????');             
                    $scope.customerName2 = null;
                    $scope.paymentAmount = null;
                    $scope.paymentDate = null;
                 
                    $rootScope.startAlert('danger', 'Error', 'Well, you must type a wrong customer name', 'md md-error');
                }
            });
        };
    };
    

    
    $scope.change = function () {
         $scope.totalAmountPaid = 0;
		 $scope.totalAmountNext = 0;
		 $scope.totalAmountDiscount = 0;
        
     $http.get('/getCID?customerName2=' + $scope.customerName2).success(function (data11) {
                if (data11.length == 1) {
                    console.log('show payments for cid', data11[0].cid);
                    $http.get('/getpayment?cid=' + data11[0].cid).success(function (data) {
                        if (data.length > 0)
                            {
                                $scope.n = $scope.customerName2;
                                $scope.list = data;
                                for (i=0; i<data.length; i++)
                                {
                                    if (data[i].paymentStatus == 'Paid')
										{
											$scope.totalAmountPaid = $scope.totalAmountPaid + data[i].paymentAmount;
										}else if (data[i].paymentStatus == 'Next')
											{
												$scope.totalAmountNext = $scope.totalAmountNext + data[i].paymentAmount;
											}else if (data[i].paymentStatus == 'Discount')
												{
													$scope.totalAmountDiscount = $scope.totalAmountDiscount + data[i].paymentAmount;
												}else
													{
														console.log('no need to count this status payment');
													}
									
                                    $scope.list[i].paymentAmount = Number(data[i].paymentAmount).toLocaleString('en');
                                    //add commas between numbers
                                }
                                $scope.currency = data[0].Currency;
                                 
                            }
                        else
                        {
                            $scope.list = {};
                            $scope.totalAmountPaid = 0;
		 					$scope.totalAmountNext = 0;
		 					$scope.totalAmountDiscount = 0;
                        }
            });

                } else {
                    console.log('not this customer');             

                    
                }
            });
        
        
        
        

        

    };

function addtodopayments(i,c) {
       $http.post('/addPayment?customerName2=' + $scope.customerName2 + '&paymentStatus=' + $scope.todoList[i].paymentStatus.name + '&paymentAmount=' + $scope.todoList[i].paymentAmount + '&paymentDate=' + $scope.todoList[i].paymentDate + '&currency=' + $scope.data3.selectedOption.name + '&cid=' + c + '&staffname=' + $rootScope.name).success(function (data) {
            if (i == ($scope.todoList.length - 1))
                    {
                        $scope.customerName2 = null;
                        $scope.paymentAmount = null;
                        $scope.paymentDate = null;
                       
                        $rootScope.startAlert('success', 'Success', 'Well done! You successfully submit multiple payments.', 'md md-done');
                        
                        
                    }
           
            $scope.todoList[i].paymentDate = null;
           $scope.todoList[i].paymentAmount = null;
           console.log('one added');
                    });
                
                
                 };
    
    
    //{done:false}
    $scope.todoList = [];
    
        $scope.todoAdd = function() {
            $scope.dis = true;  
        $scope.todoList.push({done:false});
//        console.log($scope.todoList[0].paymentStatus.name);
        
    };
        $scope.remove = function(index) {
         
        $scope.todoList.splice(index, 1);
            if($scope.todoList.length == 0){
                $scope.dis = false;
            }
    };
    
  

    

}]);
