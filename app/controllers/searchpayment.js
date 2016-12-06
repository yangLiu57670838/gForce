app.controller('searchPaymentCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$rootScope', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $rootScope) {

    //check role and redirect for sole roles
    if (($scope.staffRole == 'superadmin') || ($scope.staffRole == 'coordinator')) {
        console.log('works fine');
    } else {
        console.log('no permission dude');
        $location.path("/");
    }


    //reset payment list 
    $scope.reset = function () {


        window.location.reload();
    };



    //find all payments table
    $scope.overduess = false;
    
    findmergePayments();
    function findmergePayments() {
		
        $http.get('/findmergePayments').success(function (data) {
            $scope.allpayments = data;
            $scope.data = data;
            for (i=0; i<$scope.data.length; i++)
                {
                    var a = $scope.data[i].first_name.trim();//trim the space from wrong typing
					var b = $scope.data[i].last_name.trim();
					$scope.data[i].customerName = a + ' ' + b;
                }
            
            
                     $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 10,
                sorting: {
                    firstname: 'asc' // initial sorting
                }
            }, {
                filterDelay: 50,
                total: $scope.data.length, // length of data
                getData: function ($defer, params) {
                    var searchStr = params.filter().search;
                    var searchStr2 = params.filter().search2;//for staff filter
                    var startStr = params.filter().start;
                    var endStr = params.filter().end;
					var status = params.filter().statusSelect;
                    console.log('search: ' + searchStr);
                    console.log('search2: ' + searchStr2);
                    console.log('start: ' + startStr);
                    console.log('end: ' + endStr);
				 	console.log('status: ' + status);
                    //var filter = params.filter();
                    //console.log(filter);

                    var mydata = [];
					mydata = $scope.data;
					//change total amount
					$scope.totalNextAmount = 0;
					$scope.totalPaidAmount = 0;
					
                    if (searchStr) {
						console.log('test test');
                        searchStr = searchStr.toLowerCase();
                        mydata = mydata.filter(function (item) {
                            return item.customerName.toLowerCase().indexOf(searchStr) > -1;
                        });

                    } 
					
					if (searchStr2){
                        searchStr2 = searchStr2.toLowerCase();
                       mydata = mydata.filter(function (item) {
                            return item.Staff.toLowerCase().indexOf(searchStr2) > -1;
                     });
                    }
					
                    if ((startStr) && (endStr)) {
                        mydata = mydata.filter(function (item) {
                            return item.paymentDate >= startStr && item.paymentDate <= endStr;
                        });

                    } else if (startStr) {

                        mydata = mydata.filter(function (item) {
                            return item.paymentDate >= startStr;
                        });

                    } else if (endStr) {
                        mydata = mydata.filter(function (item) {
                            return item.paymentDate <= endStr;
                        });
                    }

					
					if (status) {
                        mydata = mydata.filter(function (item) {
                            return item.paymentStatus == status;
                        });

                    }
					
					console.log(mydata);

							for (i=0; i<mydata.length; i++)
									{
										if(mydata[i].paymentStatus == 'Next')
											{
												$scope.totalNextAmount = $scope.totalNextAmount + parseInt(mydata[i].paymentAmount);	
											}else if (mydata[i].paymentStatus == 'Paid')
												{
													$scope.totalPaidAmount = $scope.totalPaidAmount + parseInt(mydata[i].paymentAmount);
												}
										
										if(i == (mydata.length-1))
												{
													$scope.totalNextAmount = $scope.totalNextAmount.toLocaleString();
													$scope.totalPaidAmount = $scope.totalPaidAmount.toLocaleString();
												}
										
										
									}
						

                    mydata = params.sorting() ? $filter('orderBy')(mydata, params.orderBy()) : mydata;
                    $defer.resolve(mydata.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        
    
    });
      };
    
    
//    findAllPayments();
//
//    function findAllPayments() {
//        $http.get('/findAllPayments').success(function (data) {
//            //console.log(data);
//            $scope.allpayments = data;
//
//            $scope.data = data;
//        
//            function findcidname(i) {
//                        $http.get('/findcidname?cid=' + data[i].cid).success(function (data2) {
//                           
//                                var name = data2[0].first_name + ' ' + data2[0].last_name;
//                                $scope.data[i].customerName = name;
//                                console.log(name);
//                            
//                        
//                        });
//                
//                
//                 };
//            
//            
////callback
//             for (var i = 0; i < data.length; i++) {
//                    findcidname(i);
//                    console.log('test', i);
//                    if (i == (data.length-1))
//                        {
//          $scope.tableParams = new NgTableParams({
//                page: 1, // show first page
//                count: 10,
//                sorting: {
//                    firstname: 'asc' // initial sorting
//                }
//            }, {
//                filterDelay: 50,
//                total: $scope.data.length, // length of data
//                getData: function ($defer, params) {
//                    var searchStr = params.filter().search;
//                    var searchStr2 = params.filter().search2;//for staff filter
//                    var startStr = params.filter().start;
//                    var endStr = params.filter().end;
//                    console.log('search: ' + searchStr);
//                    console.log('search2: ' + searchStr2);
//                    console.log('start: ' + startStr);
//                    console.log('end: ' + endStr);
//                    //var filter = params.filter();
//                    //console.log(filter);
//
//                    var mydata = [];
//
//                    
//                    if (searchStr) {
//                        searchStr = searchStr.toLowerCase();
//                        mydata = $scope.data.filter(function (item) {
//                            return item.customerName.toLowerCase().indexOf(searchStr) > -1;
//                        });
//
//                    } else if (searchStr2){
//                        searchStr2 = searchStr2.toLowerCase();
//                       mydata = $scope.data.filter(function (item) {
//                            return item.Staff.toLowerCase().indexOf(searchStr2) > -1;
//                     });
//                    } else
//                        {
//                            mydata = $scope.data;
//                        }
//                    
//
//                    
//                    
//                    if ((startStr) && (endStr)) {
//                        mydata = mydata.filter(function (item) {
//                            return item.paymentDate >= startStr && item.paymentDate <= endStr;
//                        });
//
//                    } else if (startStr) {
//
//                        mydata = mydata.filter(function (item) {
//                            return item.paymentDate >= startStr;
//                        });
//
//                    } else if (endStr) {
//                        mydata = mydata.filter(function (item) {
//                            return item.paymentDate <= endStr;
//                        });
//                    }
//
//
//
//
//                    mydata = params.sorting() ? $filter('orderBy')(mydata, params.orderBy()) : mydata;
//                    $defer.resolve(mydata.slice((params.page() - 1) * params.count(), params.page() * params.count()));
//                }
//            });
//                        }
//                }
//                
//  
//
//        });
//    };

    //check checkbox
    $scope.checkboxCheck = function () {


        if ($scope.overduess) {

            load_pictures();

            function load_pictures() {
                $http.get('/findOverdues').success(function (data) {
                    $scope.data = data;
                    console.log(data);
              for (i=0; i<$scope.data.length; i++)
                {
                    var a = $scope.data[i].first_name.trim();//trim the space from wrong typing
					var b = $scope.data[i].last_name.trim();
					$scope.data[i].customerName = a + ' ' + b;
                }
                    

                    //repeat ng table work here..
                    $scope.tableParams = new NgTableParams({
                        page: 1, // show first page
                        count: 10,
                        sorting: {
                            firstname: 'asc' // initial sorting
                        }
                    }, {
                        filterDelay: 50,
                        total: data.length, // length of data
                        getData: function ($defer, params) {
                            var searchStr = params.filter().search;
                            var searchStr2 = params.filter().search2;//for staff filter
                            var startStr = params.filter().start;
                            var endStr = params.filter().end;
							var status = params.filter().statusSelect;
                            console.log('search: ' + searchStr);
                            console.log('search2: ' + searchStr2);
                            console.log('start: ' + startStr);
                            console.log('end: ' + endStr);
							console.log('status: ' + status);
                           
					var mydata = [];
					mydata = $scope.data;
					$scope.totalNextAmount = 0;
					$scope.totalPaidAmount = 0;
					
                    if (searchStr) {
						console.log('test test');
                        searchStr = searchStr.toLowerCase();
                        mydata = mydata.filter(function (item) {
                            return item.customerName.toLowerCase().indexOf(searchStr) > -1;
                        });

                    } 
					
					if (searchStr2){
                        searchStr2 = searchStr2.toLowerCase();
                       mydata = mydata.filter(function (item) {
                            return item.Staff.toLowerCase().indexOf(searchStr2) > -1;
                     });
                    }
					
                    if ((startStr) && (endStr)) {
                        mydata = mydata.filter(function (item) {
                            return item.paymentDate >= startStr && item.paymentDate <= endStr;
                        });

                    } else if (startStr) {

                        mydata = mydata.filter(function (item) {
                            return item.paymentDate >= startStr;
                        });

                    } else if (endStr) {
                        mydata = mydata.filter(function (item) {
                            return item.paymentDate <= endStr;
                        });
                    }

					
					if (status) {
                        mydata = mydata.filter(function (item) {
                            return item.paymentStatus == status;
                        });

                    }
							
							

							for (i=0; i<mydata.length; i++)
									{
										if(mydata[i].paymentStatus == 'Next')
											{
												$scope.totalNextAmount = $scope.totalNextAmount + parseInt(mydata[i].paymentAmount);
											}else if (mydata[i].paymentStatus == 'Paid')
												{
													$scope.totalPaidAmount = $scope.totalPaidAmount + parseInt(mydata[i].paymentAmount);	
												}
										
										if(i == (mydata.length-1))
												{
													$scope.totalNextAmount = $scope.totalNextAmount.toLocaleString();
													$scope.totalPaidAmount = $scope.totalPaidAmount.toLocaleString();
												}
										
										
									}
						
							

                            mydata = params.sorting() ? $filter('orderBy')(mydata, params.orderBy()) : mydata;
                            $defer.resolve(mydata.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }
                    });

                });
            };


            console.log("overdue data");
        } else {
            console.log("all data");
            findmergePayments();
        }

    };




    //update payment info
    $scope.update = function (p) {
        //console.log("hello ", data.customerName);
        var payment = [];
        payment[0] = p['paymentID'];
        payment[1] = p['paymentAmount'];
        payment[2] = p['paymentStatus'];
		payment[3] = p['paymentDate'];
        var paymentID = payment[0];
        var paymentAmount = payment[1];
        var paymentStatus = payment[2];
		var paymentDate= payment[3];
        console.log("test array", payment);

        changePayment();

        function changePayment() {
            $http.get('/changePayment?paymentID=' + paymentID + '&paymentAmount=' + paymentAmount + '&paymentStatus=' + paymentStatus + '&paymentDate=' + paymentDate).success(function (d) {
                    $rootScope.startAlert('info', 'Success', 'Well done! You have successfully updated.', 'md md-done');
                
            });
        };




    };

}]);
