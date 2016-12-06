app.directive('navbarSearch', ['$timeout', '$http', '$location', function ($timeout, $http, $location) { //for example: ng-repeat, data-picker are all directives
    return {
        restrict: 'A', //the way this directive can be used
        scope: false,
        templateUrl: 'navbar-search.html', //the makeup url which will be produce 
//        controller: function($scope) {
//           $scope.showNavbarSearch = false;
//           console.log('test test');
//            
//    $scope.toggleSearch = function () {
//                $scope.showNavbarSearch = !$scope.showNavbarSearch;
//                if ($scope.showNavbarSearch == true)
//                    {
//                        findAllCustomer();
//                        function findAllCustomer() {
//        $http.get('/findAllCustomer').success(function (data) {
//            console.log(data);
//            $scope.allC = data;
//
//
//        });
//    };
//                    }
//            };
//            
//            
//     $scope.submitNavbarSearch = function () {
//
//                console.log($scope.navsearch);
//                console.log('search input', navsearch);
//                
//
//            };
//            
//        
//        },
        link: function (scope, element, attrs) {
//          scope.showNavbarSearch = false;
//            
//            scope.toggleSearch = function () {
//                scope.showNavbarSearch = !scope.showNavbarSearch;
//                if (scope.showNavbarSearch == true)
//                    {
//                        findAllCustomer();
//                        function findAllCustomer() {
//        $http.get('/findAllCustomer').success(function (data) {
//            console.log(data);
//            scope.allC = data;
//
//
//        });
//    };
//
//                        
//                        
//                    }
//            };

            scope.submitNavbarSearch = function (searchText) {
                
                 console.log('search input', searchText);
                console.log('please select from the list');
                
//                     var a = navsearch.split(" ");
//                    var cid = a[a.length-1];
//                $location.path("/viewProfile/" + cid);
                
//             $http.get('/searchCustomer?input=' + navsearch).success(function (data) {
//                        console.log(data);
//                        
//                        scope.showNavbarSearch = false;
//                 
//                        $location.path("/viewProfile/" + navsearch);
//                    });

            };
        }
    };
}]);



app.directive('menuToggle', ['$location', function ($location) {
    return {
        restrict: 'A',
        transclude: true,
        replace: true,
        scope: {
            name: '@',
            icon: '@'
        },
        templateUrl: 'menu-toggle.html',
        link: function (scope, element, attrs) {
            icon = attrs.icon;
            if (icon) {
                element.children().first().prepend('<i class="' + icon + '"></i>&nbsp;');
            }

            element.children().first().on('click', function (e) {
                e.preventDefault();
                link = angular.element(e.currentTarget);

                if (link.hasClass('active')) {
                    link.removeClass('active');
                } else {
                    link.addClass('active');
                }
            });

            //element.find('a').ripples();??????

            scope.isOpen = function () {
                folder = '/' + $location.path().split('/')[1];
                return folder == attrs.path;
            };
        }
    };
}]);


app.directive('menuLink', function () {
    return {
        restrict: 'A',
        transclude: true,
        replace: true,
        scope: {
            href: '@',
            icon: '@',
            name: '@'
        },
        templateUrl: 'menu-link.html',
        controller: ['$element', '$location', '$rootScope', function ($element, $location, $rootScope) {
            this.getName = function (name) {
                if (name !== undefined) {
                    return name;
                } else {
                    return $element.find('a').text().trim();
                }
            };

            this.setBreadcrumb = function (name) {
                $rootScope.pageTitle = this.getName(name);
            };

            this.isSelected = function (href) {
                return $location.path() == href.slice(1, href.length);
            };
    }],
        link: function (scope, element, attrs, linkCtrl) {
            icon = attrs.icon;
            if (icon) {
                element.children().first().prepend('<i class="' + icon + '"></i>&nbsp;');
            }

            if (linkCtrl.isSelected(attrs.href)) {
                linkCtrl.setBreadcrumb(attrs.name);
            }

            element.click(function () {
                linkCtrl.setBreadcrumb(attrs.name);
            });

            //element.find('a').ripples();??????

            scope.isSelected = function () {
                return linkCtrl.isSelected(attrs.href);
            };
        }
    };
});


app.directive('scrollSpy', ['$window', function ($window) {
    return {
        link: function (scope, element, attrs) {
            angular.element($window).bind('scroll', function () {
                scope.scroll = this.pageYOffset;
                if (!scope.$$phase) {
                    scope.$apply();
                }
            });
        }
    };
}]);


app.directive('navbarScroll', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            var navbar = angular.element('.main-container .navbar');
            angular.element($window).bind('scroll', function () {
                if (this.pageYOffset > 0) {
                    navbar.addClass('scroll');
                } else {
                    navbar.removeClass('scroll');
                }
            });
        }
    };
});


app.directive('nouiSlider', function () {

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var bind = angular.element(attrs.bind);
            var bindRange = angular.element(attrs.bindRange);
            var indicator = angular.element(attrs.indicator);

            if (bind.length) start = bind.val();

            // setting range or start
            start = (attrs.start ? attrs.start : 0);
            range = (attrs.range ? attrs.range : 0);

            if (range) {
                startPoint = [start, range];
                element.addClass('noUi-range');
            } else {
                startPoint = [start];
            }

            // settings
            step = (attrs.step ? parseInt(attrs.step) : 0);
            min = (attrs.min ? parseInt(attrs.min) : 0);
            max = (attrs.max ? parseInt(attrs.max) : 10);

            $(element).noUiSlider({
                start: startPoint,
                step: step,
                range: {
                    'min': [min],
                    'max': [max]
                }
            });

            if (indicator.selector === 'true') {
                $(element).on('slide set change', function (a, b) {
                    if (!$(this).find('.noUi-handle div').length) {
                        $(this).find('.noUi-handle').append('<div>' + b + '</div>');
                    }
                    $(this).find('.noUi-handle div').html(b);
                });
            }

            $(element).on('slide', function (a, b) {

                if (bindRange.length) {
                    v = parseInt(b[0]);
                    v2 = parseInt(b[1]);
                } else {
                    v = parseInt(b);
                }

                if (bind.length) {
                    if (bind[0].value !== undefined) {
                        bind.val(v);
                    } else {
                        bind.html(v);
                    }
                }

                if (bindRange.length) {
                    if (bindRange[0].value !== undefined) {
                        bindRange.val(v2);
                    } else {
                        bindRange.html(v2);
                    }
                }
            });
        }
    };

});


//click to edit
//app.directive("clickToEdit", function() {
//    var editorTemplate = '<div class="click-to-edit">' +
//        '<div ng-hide="view.editorEnabled" ng-mouseleave="toggleCustom2()">' + '<span ng-mouseover="toggleCustom()">' + '{{value}} ' + '</span>' + 
//            '<a ng-click="enableEditor()" ng-hide="custom"><i class="md md-mode-edit"></i></a>' +
//        '</div>' +
//        '<div ng-show="view.editorEnabled">' +
//            '<input ng-model="view.editableValue">' +
//            '<a ng-click="save()">Save</a>' +
//            ' or ' +
//            '<a ng-click="disableEditor()">cancel</a>.' +
//        '</div>' +
//    '</div>';
//
//    return {
//        restrict: "A",
//        replace: true,
//        template: editorTemplate,
//        scope: {
//            value: "=clickToEdit",
//        },
//        controller: function($scope) {
//            $scope.view = {
//                editableValue: $scope.value,
//                editorEnabled: false
//            };
//
//            $scope.enableEditor = function() {
//                $scope.view.editorEnabled = true;
//                $scope.view.editableValue = $scope.value;
//            };
//
//            $scope.disableEditor = function() {
//                $scope.view.editorEnabled = false;
//            };
//
//            $scope.save = function() {
//                $scope.value = $scope.view.editableValue;
//                $scope.disableEditor();
//                console.log('avc test');
//            };
//            $scope.custom = true;
//            $scope.toggleCustom = function() {
//               $scope.custom = false;
//            };
//            $scope.toggleCustom2 = function() {
//                $scope.custom = true;
//            };
//        }
//    };
//});



app.filter('nospace', function () {
    return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
});

//app.config(['$animateProvider', function ($animateProvider) {
//    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
//}])

//app.service('uploadProfileFileService', function(){
//    this.open= function(text){
//        return "Service says \"Hello " + text + "\"";
//    };        
//});
//customers controller 
app.controller('adminbookingsCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$rootScope', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $rootScope) {

    //check role and redirect for sole roles
    if (($scope.staffRole == 'superadmin') || ($scope.staffRole == 'admin')) {
        console.log('works fine');
    } else {
        console.log('no permission dude');
        $location.path("/");
    }
	
	$rootScope.complianceActive = false;

    findCustomers();
    function findCustomers() {
        $http.get('/findNewBookingCustomersSalesdone?office=' + $rootScope.office).success(function (data) {
			console.log('looking for customers in:', $rootScope.office);
            console.log('test all data', data);

			
            $scope.customers = data;
            for (i = 0; i < data.length; i++) {
                //console.log(data[i].time.substring(0, 9));
                $scope.customers[i].time = data[i].time.substring(0, 10);
            }

            $scope.customersTable = new NgTableParams({
                page: 1,
                count: 10,
				sorting: {
        			time: 'asc' // initial sorting
    			}
            }, {
                total: $scope.customers.length,
                getData: function (params) {
                    $scope.data = params.sorting() ? $filter('orderBy')($scope.customers, params.orderBy()) : $scope.customers;
                    $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                    $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    //$defer.resolve($scope.data);
                    return $scope.data;
                }
            });


        });
    };

    $scope.viewProfile = function (user) {


        //window.location.replace("/viewProfile.html");
        var cid = user.cid;
        console.log(user.cid);
        $location.path("/viewProfile/" + cid);

    };



}]);

//customers controller 
app.controller('bookingsCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$rootScope', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $rootScope) {

    //check role and redirect for sole roles
    if (($scope.staffRole == 'superadmin') || ($scope.staffRole == 'sales')) {
        console.log('works fine');
    } else {
        console.log('no permission dude');
        $location.path("/");
    }
	
	$rootScope.complianceActive = false;

    findCustomers();
    function findCustomers() {
        $http.get('/findNewBookingCustomers?office=' + $rootScope.office).success(function (data) {
			console.log('looking for customers in:', $rootScope.office);
            console.log('test all data', data);
            $scope.customers = data;
            for (i = 0; i < data.length; i++) {
                //console.log(data[i].time.substring(0, 9));
                $scope.customers[i].time = data[i].time.substring(0, 10);
            }

            $scope.customersTable = new NgTableParams({
                page: 1,
                count: 10,
				sorting: {
        			time: 'asc' // initial sorting
    			}
            }, {
                total: $scope.customers.length,
                getData: function (params) {
                    $scope.data = params.sorting() ? $filter('orderBy')($scope.customers, params.orderBy()) : $scope.customers;
                    $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                    $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    //$defer.resolve($scope.data);
                    return $scope.data;
                }
            });


        });
    };

    $scope.viewProfile = function (user) {


        //window.location.replace("/viewProfile.html");
        var cid = user.cid;
        console.log(user.cid);
        $location.path("/viewProfile/" + cid);

    };



}]);

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

app.controller('compliancelistCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$rootScope', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $rootScope) {

    //check role and redirect for sole roles
    if (($scope.staffRole == 'superadmin') || ($scope.staffRole == 'compliance')) {
        console.log('works fine');
    } else {
        console.log('no permission dude');
        $location.path("/");
    }

    getWantedInfo();
    function getWantedInfo() {
        $http.get('/getWantedInfo').success(function (data) {
            
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

//customers controller 
app.controller('customersCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$rootScope', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $rootScope) {


	$rootScope.complianceActive = false;
	
    findCustomers();

    function findCustomers() {
        $http.get('/findCustomers').success(function (data) {
            console.log('test all data', data);
            $scope.customers = data;
            for (i = 0; i < data.length; i++) {
                //console.log(data[i].time.substring(0, 9));
                $scope.customers[i].time = data[i].time.substring(0, 10);
            }

            $scope.customersTable = new NgTableParams({
                page: 1,
                count: 10,

            }, {
                total: $scope.customers.length,
                getData: function (params) {
                    $scope.data = params.sorting() ? $filter('orderBy')($scope.customers, params.orderBy()) : $scope.customers;
                    $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                    $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    //$defer.resolve($scope.data);
                    return $scope.data;
                }
            });


        });
    };

    $scope.viewProfile = function (user) {


        //window.location.replace("/viewProfile.html");
        var cid = user.cid;
        console.log(user.cid);
        $location.path("/viewProfile/" + cid);

    };


    $scope.addRawCustomer = function () {
		
	 	$http.get('/getAllCID').success(function (data) {
			 console.log('cid list', data);
			 $scope.cidList = data;
					
	
	do {
		var j = 0;	
    	var cid = createCID();
		console.log(cid);

		for (var i=0; i<$scope.cidList.length; i++)
			{
						
				if ($scope.cidList[i] == cid)
				{
					console.log('not this cid', cid);
					j = 1;
				}
			}

	}
	while (j == 1);
			
	console.log('this cid is fine', cid);
		
	$http.post('/addRawCustomer?cid=' + cid).success(function (data) {
					console.log('success', data);
					$location.path("/viewProfile/" + cid);

		});		
			
			 
			
 });
		
		
		



		

    };
	
function createCID() {
	
 		var rand = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
		var date = new Date();
		var dd = date.getDate();
		var mm = date.getMonth() + 1;
		if (mm < 10)
			{
				mm = '0' + mm;
			}
		var y = date.getFullYear();
		y = y + '';
		y = y.slice(2);
		var todayrd = y + '' + mm + '' + dd;
	
    	var cid = todayrd + '' + rand;
		return cid;
	};
	
//function checkCID(cid) {
//		 $http.get('/checkCIDExist?cid=' + cid).success(function (data) {
//			 console.log('length is', data.length);
//
//			 return data.length;
//		 });
//			 
//	};
	
	
}]);

app.controller('DashboardController', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$timeout', 'promiseTracker', '$rootScope', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $timeout, promiseTracker, $rootScope) {

    checkStaff();
    function checkStaff() {
        $http.get('/checkStaff').success(function (data) {
            console.log(data);
            if (data[0] == "true") {
                $scope.s = data[1];
               	if ($rootScope.greeting)
        			{
               		//greeting message
       				$rootScope.startAlert('success', 'Success', 'Welcome to gForce, ' + $scope.s + '!', 'md md-done');
            		$rootScope.greeting = false;
        			}
			}
        });
	
	
	}
 
    
//    $scope.$on('$userIdle', function () {
//           console.log('user is idle in dashboard');
//        }); 

    


 }]);

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

app.controller('loginCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$timeout', 'promiseTracker', '$rootScope', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $timeout, promiseTracker, $rootScope) {

    $scope.showform = false;
    $scope.hideform = true;
    $scope.hideLoading = true;
    $scope.se = false;
    

    //Create a new tracker
    $scope.loadingTracker = promiseTracker();
    
    function addFakeSession() {
            $http.get('/addFakeSession').success(function (data) {
                console.log(data);
    
            });
        };
    addFakeSession();
    

    checkIP();

    function checkIP() {
        $http.get('/checkIP').success(function (data) {
            console.log(data);
            if (data == "true") {

                console.log("Welcome Staff");
                delaySomething();
            } else {
//                window.location.replace("../../views/wronglocation.html");
				
				console.log("Test log in");
                delaySomething();
            }

        });
    };


    //use `addPromise` to add any old promise to our tracker
    function delaySomething() {
        var promise = $timeout(function () {
            $scope.showform = true;
            $scope.hideform = false;
            $scope.hideLoading = false;
			$scope.se = true;

            delaySomething2();

        }, 2000);
        $scope.loadingTracker.addPromise(promise);
    };
    
    function delaySomething2() {
        var promise = $timeout(function () {
             window.location.replace("../../views/main/main.html");

        }, 3000);
        $scope.loadingTracker.addPromise(promise);
    };

    $scope.doLogin = function () {
//        var email = $scope.loginEmail;
//        var password = $scope.loginPassword;
//
//        function findPassword() {
//            $http.get('/findPassword?email=' + email + '&password=' + password).success(function (data) {
//
//                console.log(data);
//
//                if (data == "true") {
//                    window.location.replace("../../views/main/main.html");
//
//                } else if (data == "wrongemail"){
//                    
//                    $scope.se = true;
////window.location.replace("/");
//
//                }else
//                    {
//                       $scope.se = true;
////window.location.replace("/");
//                    }
//                
//            });
//        };
//        findPassword();
    };
    
        $scope.dismiss = function () {
            $scope.se = false;
    };


	
	//redirect to new website 
//    function redirect() {
//        var promise2 = $timeout(function () {
//			window.location.replace("http://gforce.team/");
//			
//        }, 5000);
//        $scope.loadingTracker.addPromise(promise2);
//    };
	

 }]);

//var app = angular.module('myApp', []);
app.controller('mainCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$alert', 'localStorageService', '$timeout', '$animate', 'todoService', '$rootScope', '$window','$q', '$log', '$idle', '$keepalive', '$modal', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $alert, localStorageService, $timeout, $animate, todoService, $rootScope, $window, $q, $log, $idle, $keepalive, $modal) {
    // theme changing
    $scope.theme_colors = [
    'pink', 'red', 'purple', 'indigo', 'blue',
    'light-blue', 'cyan', 'teal', 'green', 'light-green',
    'lime', 'yellow', 'amber', 'orange', 'deep-orange'
  ];
    
    

    //re-login modal when staff idle
    var loginModal = $modal({scope: $scope, template: 'loginModal.html', show: false, backdrop: 'static', keyboard: false});//

    // Add todoService to scope
    service = new todoService($scope);
    $scope.todosCount = service.count();
    $scope.$on('todos:count', function (event, count) {
        $scope.todosCount = count;
        element = angular.element('#todosCount');

        if (!element.hasClass('animated')) {
            $animate.addClass(element, 'animated bounce', function () {
                $animate.removeClass(element, 'animated bounce');
            });
        }
    });

    $scope.fillinContent = function () {
        $scope.htmlContent = 'content content';
    };


    // theme changing
    $scope.changeColorTheme = function (cls) {
        $rootScope.$broadcast('theme:change', 'Choose template'); //@grep dev
        $scope.theme.color = cls;
    };

    $scope.changeTemplateTheme = function (cls) {
        $rootScope.$broadcast('theme:change', 'Choose color'); //@grep dev
        $scope.theme.template = cls;
    };

    if (!localStorageService.get('theme')) {
        theme = {
            color: 'theme-pink',
            template: 'theme-template-dark'
        };
        localStorageService.set('theme', theme);
    }
    localStorageService.bind($scope, 'theme');




    checkLogin();

    function checkLogin() {
        $http.get('/checkLogin').success(function (data) {
            console.log(data);
            if (data[0] == "true") {
                $scope.staffName = data[1];
                $scope.staffEmail = data[2];
                $scope.staffRole = data[3];
                $rootScope.name = data[5];
				$rootScope.office = data[4];
				$rootScope.staffRole = data[3];
				$rootScope.staffID = data[6];
                console.log('office is ', data[4]);
                if (data[3] == 'admin') {
                    $scope.adminShow = true;
                } else if (data[3] == 'travel') {
                    $scope.travelShow = true;
                } else if (data[3] == 'coordinator') {
                    $scope.coordinationShow = true;
                } else if (data[3] == 'finance') {
                    $scope.financeShow = true;
                } else if (data[3] == 'compliance') {
                    $scope.complianceShow = true;
                } else if (data[3] == 'sales') {
                    $scope.salesShow = true;
                } else if (data[3] == 'arrivals') {
					$scope.arrivalsShow = true;
				} else if (data[3] == 'cancellation') {
					$scope.cancellationShow = true;
				} else if (data[3] == 'superadmin') {
					$scope.adminShow = true;
					$scope.travelShow = true;
					$scope.coordinationShow = true;
					$scope.financeShow = true;
					$scope.complianceShow = true;
					$scope.salesShow = true;
					$scope.arrivalsShow = true;
					$scope.cancellationShow = true;
					$scope.emptyShow = true;
					$scope.settingsShow = true;
                }               
       //idle staff monitor if login already   
        $idle.watch();
        $rootScope.$on('$keepalive', function () {
            console.log('Keeping alive...');
        });
        $rootScope.$on('$keepaliveResponse', function (data, status) {
            console.log("Status: " + status);
            console.log(data);
        });
        $rootScope.$on('$userIdle', function () {
            console.log('You are idle...', $scope.staffEmail);
            $scope.idlePassword = "";
            
            $http.get('/logout').success(function (data) {

                console.log('session killed');
                loginModal.show();
                
                $scope.idleLogin = function(idlePassword) {
                    console.log(idlePassword);
                
                    $http.get('/findFakePassword?email=' + $scope.staffEmail + '&password=' + idlePassword).success(function (data) {

                    console.log(data);

                    if (data == "true") {
                        console.log('session back');
                        loginModal.hide();
                        $idle.watch();

                    } else if (data == "wrongemail"){
                    
                         console.log('wrong email'); 
                        window.location.replace("/");

                    }else
                        {
                              window.location.replace("/");

                        }
                
                    });
                
                
            };
                
                $scope.idleLogout = function () {
                     window.location.replace("/");
                };
                
            });

        });
        $rootScope.$on('$userTimeout', function () {
            console.log('You timed out');
            load_pictures();
        });
        $rootScope.$on('$userBack', function () {
            console.log('Now you are not idle, but session killed already');
        });
                
                
                
            } else {
                window.location.replace("/");
            }

        });
    };


    $scope.logout = function () {


        load_pictures();

        function load_pictures() {
            $http.get('/logout').success(function (data) {

                window.location.replace("/");
            });
        };



    };


    //check permission
//    checkpermission();

    function checkpermission() {
        $http.get('/checkpermission').success(function (data) {

            window.location.replace("/");
        });
    };


    var introductionAlert = $alert({
        title: 'Welcome to Materialism',
        content: 'Stay a while and listen',
        placement: 'top-right',
        type: 'theme',
        container: '.alert-container-top-right',
        show: false,
        template: 'alert-introduction.html',
        animation: 'mat-grow-top-right'
    });


    if (!localStorageService.get('alert-introduction')) {
        $timeout(function () {
            $scope.showIntroduction();
            localStorageService.set('alert-introduction', 1);
        }, 2500);
    }

    $scope.showIntroduction = function () {
        introductionAlert.show();
        // refererNotThemeforest.show();
        console.log('test alert');
    };

    var refererNotThemeforest = $alert({
        title: 'Hi there!',
        content: 'You like what you see and interested in using our theme? You can find it at <a href="http://themeforest.net/item/materialism-angular-bootstrap-admin-template/11322821" target="_blank"><img style="height:20px;" src="../../assets/img/icons/themeforest-icon.png" /> Themeforest</a>.',
        placement: 'top-right',
        type: 'theme',
        container: '.alert-container-top-right',
        show: false,
        animation: 'mat-grow-top-right'
    });

    if (document.referrer === '' || document.referrer.indexOf('themeforest.net') !== 0) {
        $timeout(function () {
            refererNotThemeforest.show();
        }, 1750);
    }
    
//search box suggestion
 
    
//     var self = this;
//                    this.simulateQuery = false;
//
//
//            
//                            this.states = loadAll();
//                            this.querySearch = querySearch;
//                            this.selectedItemChange = selectedItemChange;
//                            this.searchTextChange = searchTextChange;
//
//                            this.newState = newState;
//    
    
//    $scope.navsearch = 'aaaaa';
//    $scope.showNavbarSearch = false;
	$scope.showNavbarSearch = true;
    
    $scope.toggleSearch = function () {
        console.log('toggle close here, nothing else');
    $scope.showNavbarSearch = !$scope.showNavbarSearch;
                if ($scope.showNavbarSearch == true)
                    {
                          
                    }else
                        {
                            
                        }
            };
    
    
    
    
//md-autocomplete


   

//    function newState(state) {
////      alert("Sorry! You'll need to create a Constituion for " + state + " first!");
//    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
//    function querySearch (query) {
//      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
//          deferred;
//      if (self.simulateQuery) {
//        deferred = $q.defer();
//        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
//        return deferred.promise;
//      } else {
//        return results;
//      }
//    }

//    function searchTextChange(text) {
////      $log.info('Text changed to ' + text);
//    }
//
//    function selectedItemChange(item) {
////      $log.info('Item changed to ' + JSON.stringify(item));
//    }

    /**
     * Build `states` list of key/value pairs
     */
//    function loadAll() {
                   
    
//        var allStates = $scope.states;
        
//      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
//              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
//              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
//              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
//              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
//              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
//              Wisconsin, Wyoming';
        

//  /, +/g
//      return allStates.split(/, +/g).map( function (state) {
//          console.log(state);
//        return {
//          value: state.toLowerCase(),
//          display: state
//            
//        };
//      });
//    }

    /**
     * Create filter function for a query string
     */
//    function createFilterFor(query) {
//      var lowercaseQuery = angular.lowercase(query);
//
//      return function filterFn(state) {
//        return (state.value.indexOf(lowercaseQuery) === 0);
//      };
//
//    }
//   findAllCustomer();
//       function findAllCustomer() {
//        $http.get('/findAllCustomer').success(function (data) {
//            console.log(data);
//            $scope.allC = data;
//        $scope.getInterest1 = function(searchText) {
////      var results = [
////        {
////          'name': 'Broccoli',
////          'type': 'Brassica'
////        },
////        {
////          'name': 'Aroccoli',
////          'type': 'Arassica'
////        }];
//            console.log(searchText);
//          
//            var results = $scope.allC;
//            for (i=0; i<results.length; i++)
//                {
//                   if((results[i].first_name.toLowerCase().indexOf(searchText) < 0) && (results[i].last_name.toLowerCase().indexOf(searchText) < 0) && (results[i].email.toLowerCase().indexOf(searchText) < 0) && (results[i].cid.toLowerCase().indexOf(searchText) < 0))
//                       {
//                           results.splice(i, 1);
//                           console.log('111');
//                       }
//
//                }
//            
//              
//        console.log('results', JSON.stringify(results));
//        return results;
//        };
//
//        });
//    };
//    

    function findallsearch() {
        $http.get('/findAllCustomer').success(function (data) {
           
            var fullresult = '';
            for (i = 0; i < data.length; i++) {

                var f = data[i].first_name + ' ' + data[i].last_name + ' ' + data[i].email + ' ' + data[i].cid;
                    
                fullresult =  f + ', ' + fullresult;
            }
            //console.log(fullname);
            $scope.states = fullresult;
            console.log($scope.states);
            
            


        });
    };


    
$scope.getInterest1 = function(searchText) {
    return $http.get('/findSearchedCustomer?input=' + searchText)
        .then(function(results) { 
        console.log(results.data);
        return results.data; });
};
    
$scope.selectedItemChange = function(item) {
   	console.log(item);
    if(item)
        {
            $scope.showNavbarSearch = false;
			relocate(item.cid);
        }
    
};
    
    function relocate(cid) {
//       $location.url("/viewProfile/" + cid);
			$location.path("/viewProfile/" + cid);

    };
	

    
}]);

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

app.controller('profileCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$window', '$timeout', '$rootScope', '$compile', '$aside', '$animate', '$q', '$modal', 'Upload', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $window, $timeout, $rootScope, $compile, $aside, $animate, $q, $modal, Upload) {
    //console.log("welcome", $routeParams.cid);


    $scope.c = $routeParams.cid;
	$scope.showComplianceSection = false;
	
	$scope.changingFieldArray = [];
	$scope.changingFinalData = [];
	
	$scope.timelineData = [];
	$scope.position = 'left';
	
	
	if($rootScope.complianceActive)
		{
				var personalClassContent = angular.element( document.querySelector( '#personalClass' ) );
				personalClassContent.removeClass('active');
//				$animate.removeClass(personalClassContent, 'active');
				var personaldetailsContent = angular.element( document.querySelector( '#personal-details' ) );
				personaldetailsContent.removeClass('active');
//				$animate.removeClass(personaldetailsContent, 'active');
			
				var complianceClassContent = angular.element( document.querySelector( '#complianceClass' ) );
				complianceClassContent.addClass('active');
//				$animate.addClass(complianceClassContent, 'active');
				var complianceContent = angular.element( document.querySelector( '#compliance' ) );
				complianceContent.addClass('active'); 
//				$animate.addClass(complianceContent, 'active');
		}
	
//check permission if compliance or not
	if (($rootScope.staffRole == 'superadmin') || ($rootScope.staffRole == 'compliance'))
		{
			console.log('congrats, you have the compliance permission');
			$scope.showComplianceSection = true;
		}
	
	var editingProfileButtonsTPL = $aside({
        scope: $scope,
        template: '../bookings/editingProfileButtonsTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	//approve button
	var approveRedFlagsTpl = $aside({
        scope: $scope,
        template: '../bookings/approveRedFlagsTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	var invoiceTPL = $aside({
        scope: $scope,
        template: '../bookings/invoiceTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	var addFlightTPL = $aside({
        scope: $scope,
        template: '../bookings/addFlightTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
		
	var addInsuranceTPL = $aside({
        scope: $scope,
        template: '../bookings/addInsuranceTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	
	var addAccommodationTPL = $aside({
        scope: $scope,
        template: '../bookings/addAccommodationTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	var addTransferTPL = $aside({
        scope: $scope,
        template: '../bookings/addTransferTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	var addAddonTPL = $aside({
        scope: $scope,
        template: '../bookings/addAddonTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });

	var addCharityTPL = $aside({
        scope: $scope,
        template: '../bookings/addCharityTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	var addVoucherTPL = $aside({
        scope: $scope,
        template: '../bookings/addVoucherTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
		
	var addOtherChargesTPL = $aside({
        scope: $scope,
        template: '../bookings/addOtherChargesTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	var addNewTripTPL = $aside({
        scope: $scope,
        template: '../bookings/tpl/addNewTripTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	var editTripTPL = $aside({
        scope: $scope,
        template: '../bookings/tpl/editTripTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
	$scope.tripTableNodata = false;
	$scope.flightTableNodata = false;
	$scope.insuranceTableNodata = false;
	$scope.accommodationTableNodata = false;
	$scope.transferTableNodata = false;
	$scope.addonTableNodata = false;
	$scope.charityTableNodata = false;
	$scope.travelVoucherTableNodata = false;
	$scope.otherChargesTableNodata = false;
	
 	findFileRecords();
	
    findprofile();
    function findprofile() {
        $http.get('/findProfile?cid=' + $routeParams.cid).success(function (data) {

			
            console.log(data[0]);
            $scope.profile = data[0];
            var email = data[0].email;
            
            //add tc details html
            if ($scope.profile.tc_details == '')
                {
                    $scope.showTC = false;
                }
            else{
                $scope.showTC = true;
                var tcDetails = angular.element(document.querySelector('#tcDetails'));
                tcDetails.append($scope.profile.tc_details);
            }
            
			getFlightsList();
            getInsuranceList();
			getAccommodationList();
			getTransferList();
			getAddonList();
			getCharityList();
			getVoucherList();
			getOtherChargesList();
            //find red notifications
			
				//find all approve status for this customer
			$scope.ApproveMedication = false;
			$scope.ApproveAge = false;
			$scope.ApproveSubject = false;
			$scope.ApproveDrink_driving_convictions = false;
			$scope.ApproveCriminal_convictions = false;
			$scope.ApproveDriving_offences = false;
			$scope.ApproveHealth_conditions = false;
			$scope.ApproveIllicit = false;
			$scope.ApproveDietary = false;
			$scope.ApprovePromotion = false;
			$scope.ApproveTransactionNO = false;
			$scope.ApproveConsultant_guarantee = false;
			$scope.ApproveComments = false;
			
			findApprove('approve').then(function(d) {
    			console.log('test all approve number for this customer', d.length);
				for (var i=0; i<d.length; i++)
					{
						if (d[i].field_name == 'medication')
							{
								$scope.ApproveMedication = true;
							}
						if (d[i].field_name == 'age')
							{
								$scope.ApproveAge = true;
							}
						if (d[i].field_name == 'subject')
							{
								$scope.ApproveSubject = true;
							}
						if (d[i].field_name == 'drink_driving_convictions')
							{
								$scope.ApproveDrink_driving_convictions = true;
							}
						if (d[i].field_name == 'criminal_convictions')
							{
								$scope.ApproveCriminal_convictions = true;
							}
						if (d[i].field_name == 'driving_offences')
							{
								$scope.ApproveDriving_offences = true;
							}
						if (d[i].field_name == 'health_conditions')
							{
								$scope.ApproveHealth_conditions = true;
							}
						if (d[i].field_name == 'illicit')
							{
								$scope.ApproveIllicit = true;
							}
						if (d[i].field_name == 'dietary')
							{
								$scope.ApproveDietary = true;
							}
						if (d[i].field_name == 'promotion')
							{
								$scope.ApprovePromotion = true;
							}
						if (d[i].field_name == 'transactionNO')
							{
								$scope.ApproveTransactionNO = true;
							}
						if (d[i].field_name == 'consultant_guarantee')
							{
								$scope.ApproveConsultant_guarantee = true;
							}
						if (d[i].field_name == 'comments')
							{
								$scope.ApproveComments = true;
							}
					}
				
				
			
				//start set notification
		    $scope.personalNotification = 0;
            $scope.hidePersonalNotification = true;
			var ageIcon = angular.element(document.querySelector('#ageIcon'));
            if ((parseInt($scope.profile.age) < 18) || (parseInt($scope.profile.age) > 30))
                {
                    if ($scope.ApproveAge)
						{
							$scope.checkagered = false;
							ageIcon.empty();
							ageIcon.append('<i class="md md-done green icon-color"></i>');
						}else
							{
								$scope.checkagered = true;
								$scope.personalNotification = $scope.personalNotification + 1;
                    			$scope.hidePersonalNotification = false;
								ageIcon.empty();							
								var ageIconString = '<span ng-mouseover="changeIcon(1)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var ageIconStringCompiled = $compile(ageIconString)($scope);		
								ageIcon.append(ageIconStringCompiled);	
							}
					

                }else
					{
						ageIcon.empty();
						ageIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
            
            $scope.tripNotification = 0;
            $scope.hideTripNotification = true;
			var subjectIcon = angular.element(document.querySelector('#subjectIcon'));
			if ($scope.profile.subject == '')
                {
                    if ($scope.ApproveSubject)
						{
							$scope.checksubjectred = false;
							subjectIcon.empty();
							subjectIcon.append('<i class="md md-done green icon-color"></i>');
						}else
							{
								$scope.checksubjectred = true;
                    			$scope.tripNotification = $scope.tripNotification + 1;
                    			$scope.hideTripNotification = false;
								subjectIcon.empty();															
								var subjectIconString = '<span ng-mouseover="changeIcon(2)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var subjectIconStringCompiled = $compile(subjectIconString)($scope);		
								subjectIcon.append(subjectIconStringCompiled);	
							}
					
                }else
					{
						subjectIcon.empty();
						subjectIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
          
            $scope.otherNotification = 0;
            $scope.hideOtherNotification = true;
			var drinkDrivingIcon = angular.element(document.querySelector('#drinkDrivingIcon'));
            if ($scope.profile.drink_driving_convictions == 'Yes')
                {
                    if ($scope.ApproveDrink_driving_convictions)
						{
							$scope.checkDrinkDriveRed = false;
							drinkDrivingIcon.empty();
							drinkDrivingIcon.append('<i class="md md-done green icon-color"></i>');
						}else
							{
								$scope.checkDrinkDriveRed = true;
                    			$scope.otherNotification = $scope.otherNotification + 1;
                    			$scope.hideOtherNotification = false;
								drinkDrivingIcon.empty();													
								var drinkDrivingIconString = '<span ng-mouseover="changeIcon(3)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var drinkDrivingIconStringCompiled = $compile(drinkDrivingIconString)($scope);		
								drinkDrivingIcon.append(drinkDrivingIconStringCompiled);	
							}
				
                }else
					{
						drinkDrivingIcon.empty();
						drinkDrivingIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
			var criminalIcon = angular.element(document.querySelector('#criminalIcon'));
            if ($scope.profile.criminal_convictions == 'Yes')
                {
                    if ($scope.ApproveCriminal_convictions)
						{
							$scope.checkCriminalRed = false;
							criminalIcon.empty();
							criminalIcon.append('<i class="md md-done green icon-color"></i>');
							
						}else
							{
								$scope.checkCriminalRed = true;
                    			$scope.otherNotification = $scope.otherNotification + 1;
                    			$scope.hideOtherNotification = false;
								criminalIcon.empty();						
								var criminalIconString = '<span ng-mouseover="changeIcon(4)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var criminalIconStringCompiled = $compile(criminalIconString)($scope);		
								criminalIcon.append(criminalIconStringCompiled);
							}
                }else
					{
						criminalIcon.empty();
						criminalIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
			var drivingOffencesIcon = angular.element(document.querySelector('#drivingOffencesIcon'));
            if ($scope.profile.driving_offences == 'Yes')
                {
                    if ($scope.ApproveDriving_offences)
						{
							$scope.checkDrivingOffencesRed = false;
							drivingOffencesIcon.empty();
							drivingOffencesIcon.append('<i class="md md-done green icon-color"></i>');
							
						}else
							{
								$scope.checkDrivingOffencesRed = true;
                    			$scope.otherNotification = $scope.otherNotification + 1;
                    			$scope.hideOtherNotification = false;
								drivingOffencesIcon.empty();
								var drivingOffencesIconString = '<span ng-mouseover="changeIcon(5)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var drivingOffencesIconStringCompiled = $compile(drivingOffencesIconString)($scope);		
								drivingOffencesIcon.append(drivingOffencesIconStringCompiled);
							}
					
                }else
					{
						drivingOffencesIcon.empty();
						drivingOffencesIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
			var medicationIcon = angular.element(document.querySelector('#medicationIcon'));
            if ($scope.profile.medication == 'Yes')
                {
                    
					if ($scope.ApproveMedication)
						{
							console.log('this customer is approved for medication issuie');
							$scope.checkMedicationRed = false;
							medicationIcon.empty();
							medicationIcon.append('<i class="md md-done green icon-color"></i>');
							
						}else
							{
								$scope.checkMedicationRed = true;
								$scope.otherNotification = $scope.otherNotification + 1;
								$scope.hideOtherNotification = false;
								medicationIcon.empty();
								var medicationIconString = '<span ng-mouseover="changeIcon(6)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var medicationIconStringCompiled = $compile(medicationIconString)($scope);		
								medicationIcon.append(medicationIconStringCompiled);
							}

                }else
					{
						medicationIcon.empty();
						medicationIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
			var healthIcon = angular.element(document.querySelector('#healthIcon'));
            if ($scope.profile.health_conditions == 'Yes')
                {
                    if ($scope.ApproveHealth_conditions)
						{
							$scope.checkMentalRed = false;
							healthIcon.empty();
							healthIcon.append('<i class="md md-done green icon-color"></i>');
						}else
							{
								$scope.checkMentalRed = true;
								$scope.otherNotification = $scope.otherNotification + 1;
                    			$scope.hideOtherNotification = false;
								healthIcon.empty();
								var healthIconString = '<span ng-mouseover="changeIcon(7)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var healthIconStringCompiled = $compile(healthIconString)($scope);		
								healthIcon.append(healthIconStringCompiled);
							}
					
                }else
					{
						healthIcon.empty();
						healthIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
			var illicitIcon = angular.element(document.querySelector('#illicitIcon'));
            if ($scope.profile.illicit != 'Never')
                {
                    if ($scope.ApproveIllicit)
						{
							$scope.checkIllicitRed = false;
							illicitIcon.empty();
							illicitIcon.append('<i class="md md-done green icon-color"></i>');
						}else
							{
								$scope.checkIllicitRed = true;
                    			$scope.otherNotification = $scope.otherNotification + 1;
                    			$scope.hideOtherNotification = false;
								illicitIcon.empty();
								var illicitIconString = '<span ng-mouseover="changeIcon(8)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var illicitIconStringCompiled = $compile(illicitIconString)($scope);		
								illicitIcon.append(illicitIconStringCompiled);
							}
					
                }else
					{
						illicitIcon.empty();
						illicitIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
			var dietaryIcon = angular.element(document.querySelector('#dietaryIcon'));
            if ($scope.profile.dietary == 'Yes')
                {
                    if ($scope.ApproveDietary)
						{
							$scope.checkDietaryRed = false;
							dietaryIcon.empty();
							dietaryIcon.append('<i class="md md-done green icon-color"></i>');
						}else
							{
								$scope.checkDietaryRed = true;
                    			$scope.otherNotification = $scope.otherNotification + 1;
                    			$scope.hideOtherNotification = false;
								dietaryIcon.empty();
								var dietaryIconString = '<span ng-mouseover="changeIcon(9)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var dietaryIconStringCompiled = $compile(dietaryIconString)($scope);		
								dietaryIcon.append(dietaryIconStringCompiled);
							}
						
                }else
					{
						dietaryIcon.empty();
						dietaryIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
            
			$scope.paymentNotification = 0;
            $scope.hidePaymentNotification = true;
			var promotionIcon = angular.element(document.querySelector('#promotionIcon'));
			if ($scope.profile.promotion == '')
                {
                     if ($scope.ApprovePromotion)
						 {
							$scope.checkpromotionred = false;
							promotionIcon.empty();
							promotionIcon.append('<i class="md md-done green icon-color"></i>');
						 }else
							 {
								$scope.checkpromotionred = true;
								$scope.paymentNotification = $scope.paymentNotification + 1;
                    			$scope.hidePaymentNotification = false;
								promotionIcon.empty();
								var promotionIconString = '<span ng-mouseover="changeIcon(10)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var promotionIconStringCompiled = $compile(promotionIconString)($scope);		
								promotionIcon.append(promotionIconStringCompiled);
							 }
						
                }else
					{
						promotionIcon.empty();
						promotionIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
			var transactionIcon = angular.element(document.querySelector('#transactionIcon'));
			if ($scope.profile.transactionNO == '')
                {
                     if ($scope.ApproveTransactionNO)
						 {
							$scope.checktransactionNOred = false;
							transactionIcon.empty();
							transactionIcon.append('<i class="md md-done green icon-color"></i>');
						 }else
							 {
								$scope.checktransactionNOred = true;
                    			$scope.paymentNotification = $scope.paymentNotification + 1;
                    			$scope.hidePaymentNotification = false;
								transactionIcon.empty();
								var transactionIconString = '<span ng-mouseover="changeIcon(11)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var transactionIconStringCompiled = $compile(transactionIconString)($scope);		
								transactionIcon.append(transactionIconStringCompiled);	 
							 }

                }else
					{
						transactionIcon.empty();
						transactionIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
            $scope.surveyNotification = 0;
            $scope.hideSurveyNotification = true;
			var consultantGuaranteeIcon = angular.element(document.querySelector('#consultantGuaranteeIcon'));
            if ($scope.profile.consultant_guarantee == 'Yes')
                {
                    if ($scope.ApproveConsultant_guarantee)
						{
							$scope.checkConsultantGuaranteeRed = false;
							consultantGuaranteeIcon.empty();
							consultantGuaranteeIcon.append('<i class="md md-done green icon-color"></i>');
						}else
							{
								$scope.checkConsultantGuaranteeRed = true;
                    			$scope.surveyNotification = $scope.surveyNotification + 1;
								$scope.hideSurveyNotification = false;
								consultantGuaranteeIcon.empty();
								var consultantGuaranteeIconString = '<span ng-mouseover="changeIcon(12)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var consultantGuaranteeIconStringCompiled = $compile(consultantGuaranteeIconString)($scope);				
								consultantGuaranteeIcon.append(consultantGuaranteeIconStringCompiled);
							}

                }else
					{
						consultantGuaranteeIcon.empty();
						consultantGuaranteeIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
			
			var commentsIcon = angular.element(document.querySelector('#commentsIcon'));
            if ($scope.profile.comments != '')
                {
                    if ($scope.ApproveComments)
						{
							$scope.checkCommentsRed = false;
							commentsIcon.empty();
							commentsIcon.append('<i class="md md-done green icon-color"></i>');
						}else
							{
								$scope.checkCommentsRed = true;
								$scope.surveyNotification = $scope.surveyNotification + 1;
                    			$scope.hideSurveyNotification = false;
								commentsIcon.empty();
								var commentsIconString = '<span ng-mouseover="changeIcon(13)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var commentsIconStringCompiled = $compile(commentsIconString)($scope);				
								commentsIcon.append(commentsIconStringCompiled);
							}
                }else
					{
						commentsIcon.empty();
						commentsIcon.append('<i class="md md-chevron-right lime darken-2 icon-color"></i>');
					}
				
				
			$scope.changeIcon = function(no) {
                console.log('change icon ');

				if (no == 1)
					{
						var ageIcon = angular.element(document.querySelector('#ageIcon'));
						ageIcon.empty();
					
						var ageIconString = '<span ng-mouseleave="changeIconBack(1)" ng-click="approveIt(1)"><i class="md md-done red icon-color"></i></span>';
						var ageIconStringCompiled = $compile(ageIconString)($scope);		
						ageIcon.append(ageIconStringCompiled);
						
					}else if (no == 2)
						{		
							var subjectIcon = angular.element(document.querySelector('#subjectIcon'));
							subjectIcon.empty();
							
							var subjectIconString = '<span ng-mouseleave="changeIconBack(2)" ng-click="approveIt(2)"><i class="md md-done red icon-color"></i></span>';
							var subjectIconStringCompiled = $compile(subjectIconString)($scope);		
							subjectIcon.append(subjectIconStringCompiled);
						}else if (no == 3)
							{
								
								var drinkDrivingIcon = angular.element(document.querySelector('#drinkDrivingIcon'));
								drinkDrivingIcon.empty();
								
								var drinkDrivingIconString = '<span ng-mouseleave="changeIconBack(3)" ng-click="approveIt(3)"><i class="md md-done red icon-color"></i></span>';
								var drinkDrivingIconStringCompiled = $compile(drinkDrivingIconString)($scope);		
								drinkDrivingIcon.append(drinkDrivingIconStringCompiled);
								
							}else if (no == 4)
								{
									
									var criminalIcon = angular.element(document.querySelector('#criminalIcon'));
									criminalIcon.empty();
									
									var criminalIconString = '<span ng-mouseleave="changeIconBack(4)" ng-click="approveIt(4)"><i class="md md-done red icon-color"></i></span>';
									var criminalIconStringCompiled = $compile(criminalIconString)($scope);		
									criminalIcon.append(criminalIconStringCompiled);
								}else if (no == 5)
									{
										
										var drivingOffencesIcon = angular.element(document.querySelector('#drivingOffencesIcon'));
										drivingOffencesIcon.empty();
										
										var drivingOffencesIconString = '<span ng-mouseleave="changeIconBack(5)" ng-click="approveIt(5)"><i class="md md-done red icon-color"></i></span>';
										var drivingOffencesIconStringCompiled = $compile(drivingOffencesIconString)($scope);		
										drivingOffencesIcon.append(drivingOffencesIconStringCompiled);
									}else if (no == 6)
										{
											
											var medicationIcon = angular.element(document.querySelector('#medicationIcon'));
											medicationIcon.empty();
											
											var medicationIconString = '<span ng-mouseleave="changeIconBack(6)" ng-click="approveIt(6)"><i class="md md-done red icon-color"></i></span>';
											var medicationIconStringCompiled = $compile(medicationIconString)($scope);		
											medicationIcon.append(medicationIconStringCompiled);
										}else if (no == 7)
											{
												
												var healthIcon = angular.element(document.querySelector('#healthIcon'));
												healthIcon.empty();
												
												var healthIconString = '<span ng-mouseleave="changeIconBack(7)" ng-click="approveIt(7)"><i class="md md-done red icon-color"></i></span>';
												var healthIconStringCompiled = $compile(healthIconString)($scope);		
												healthIcon.append(healthIconStringCompiled);
											}else if (no == 8)
												{
													
													var illicitIcon = angular.element(document.querySelector('#illicitIcon'));
													illicitIcon.empty();
													
													var illicitIconString = '<span ng-mouseleave="changeIconBack(8)" ng-click="approveIt(8)"><i class="md md-done red icon-color"></i></span>';
													var illicitIconStringCompiled = $compile(illicitIconString)($scope);		
													illicitIcon.append(illicitIconStringCompiled);
												}else if (no == 9)
													{
														
														var dietaryIcon = angular.element(document.querySelector('#dietaryIcon'));
														dietaryIcon.empty();
														
														var dietaryIconString = '<span ng-mouseleave="changeIconBack(9)" ng-click="approveIt(9)"><i class="md md-done red icon-color"></i></span>';
														var dietaryIconStringCompiled = $compile(dietaryIconString)($scope);		
														dietaryIcon.append(dietaryIconStringCompiled);
													}else if (no == 10)
														{
															
															var promotionIcon = angular.element(document.querySelector('#promotionIcon'));
															promotionIcon.empty();
															
															var promotionIconString = '<span ng-mouseleave="changeIconBack(10)" ng-click="approveIt(10)"><i class="md md-done red icon-color"></i></span>';
															var promotionIconStringCompiled = $compile(promotionIconString)($scope);		
															promotionIcon.append(promotionIconStringCompiled);
														}else if (no == 11)
															{
																var transactionIcon = angular.element(document.querySelector('#transactionIcon'));
																transactionIcon.empty();
																
																var transactionIconString = '<span ng-mouseleave="changeIconBack(11)" ng-click="approveIt(11)"><i class="md md-done red icon-color"></i></span>';
																var transactionIconStringCompiled = $compile(transactionIconString)($scope);		
																transactionIcon.append(transactionIconStringCompiled);
															}else if (no == 12)
																{
																	
																	var consultantGuaranteeIcon = angular.element(document.querySelector('#consultantGuaranteeIcon'));
																	consultantGuaranteeIcon.empty();
																	
																	var consultantGuaranteeIconString = '<span ng-mouseleave="changeIconBack(12)" ng-click="approveIt(12)"><i class="md md-done red icon-color"></i></span>';
																	var consultantGuaranteeIconStringCompiled = $compile(consultantGuaranteeIconString)($scope);		
																	consultantGuaranteeIcon.append(consultantGuaranteeIconStringCompiled);
																}else if (no == 13)
																	{
																		var commentsIcon = angular.element(document.querySelector('#commentsIcon'));
																		commentsIcon.empty();
																		
																		var commentsIconString = '<span ng-mouseleave="changeIconBack(13)" ng-click="approveIt(13)"><i class="md md-done red icon-color"></i></span>';
																		var commentsIconStringCompiled = $compile(commentsIconString)($scope);		
																		commentsIcon.append(commentsIconStringCompiled);
																	}
				
				
            };
				
			$scope.changeIconBack = function(no) {
                console.log('change icon back');
				
				if (no == 1)
					{
						var ageIcon = angular.element(document.querySelector('#ageIcon'));
						ageIcon.empty();
						var ageIconString = '<span ng-mouseover="changeIcon(1)"><i class="fa fa-exclamation red icon-color"></i></span>';
						var ageIconStringCompiled = $compile(ageIconString)($scope);		
						ageIcon.append(ageIconStringCompiled);
						
					}else if (no == 2)
						{				
							var subjectIcon = angular.element(document.querySelector('#subjectIcon'));
							subjectIcon.empty();
							var subjectIconString = '<span ng-mouseover="changeIcon(2)"><i class="fa fa-exclamation red icon-color"></i></span>';
							var subjectIconStringCompiled = $compile(subjectIconString)($scope);		
							subjectIcon.append(subjectIconStringCompiled);	
						}else if (no == 3)
							{
								
								var drinkDrivingIcon = angular.element(document.querySelector('#drinkDrivingIcon'));
								drinkDrivingIcon.empty();
								var drinkDrivingIconString = '<span ng-mouseover="changeIcon(3)"><i class="fa fa-exclamation red icon-color"></i></span>';
								var drinkDrivingIconStringCompiled = $compile(drinkDrivingIconString)($scope);		
								drinkDrivingIcon.append(drinkDrivingIconStringCompiled);
							}else if (no == 4)
								{
									
									var criminalIcon = angular.element(document.querySelector('#criminalIcon'));
									criminalIcon.empty();
									var criminalIconString = '<span ng-mouseover="changeIcon(4)"><i class="fa fa-exclamation red icon-color"></i></span>';
									var criminalIconStringCompiled = $compile(criminalIconString)($scope);		
									criminalIcon.append(criminalIconStringCompiled);
								}else if (no == 5)
									{
										
										var drivingOffencesIcon = angular.element(document.querySelector('#drivingOffencesIcon'));
										drivingOffencesIcon.empty();
										var drivingOffencesIconString = '<span ng-mouseover="changeIcon(5)"><i class="fa fa-exclamation red icon-color"></i></span>';
										var drivingOffencesIconStringCompiled = $compile(drivingOffencesIconString)($scope);		
										drivingOffencesIcon.append(drivingOffencesIconStringCompiled);
									}else if (no == 6)
										{
											
											var medicationIcon = angular.element(document.querySelector('#medicationIcon'));
											medicationIcon.empty();
											var medicationIconString = '<span ng-mouseover="changeIcon(6)"><i class="fa fa-exclamation red icon-color"></i></span>';
											var medicationIconStringCompiled = $compile(medicationIconString)($scope);		
											medicationIcon.append(medicationIconStringCompiled);
										}else if (no == 7)
											{
												
												var healthIcon = angular.element(document.querySelector('#healthIcon'));
												healthIcon.empty();
												var healthIconString = '<span ng-mouseover="changeIcon(7)"><i class="fa fa-exclamation red icon-color"></i></span>';
												var healthIconStringCompiled = $compile(healthIconString)($scope);		
												healthIcon.append(healthIconStringCompiled);
											}else if (no == 8)
												{
													
													var illicitIcon = angular.element(document.querySelector('#illicitIcon'));
													illicitIcon.empty();
													var illicitIconString = '<span ng-mouseover="changeIcon(8)"><i class="fa fa-exclamation red icon-color"></i></span>';
													var illicitIconStringCompiled = $compile(illicitIconString)($scope);		
													illicitIcon.append(illicitIconStringCompiled);
												}else if (no == 9)
													{
														
														var dietaryIcon = angular.element(document.querySelector('#dietaryIcon'));
														dietaryIcon.empty();
														var dietaryIconString = '<span ng-mouseover="changeIcon(9)"><i class="fa fa-exclamation red icon-color"></i></span>';
														var dietaryIconStringCompiled = $compile(dietaryIconString)($scope);		
														dietaryIcon.append(dietaryIconStringCompiled);
													}else if (no == 10)
														{
															
															var promotionIcon = angular.element(document.querySelector('#promotionIcon'));
															promotionIcon.empty();
															var promotionIconString = '<span ng-mouseover="changeIcon(10)"><i class="fa fa-exclamation red icon-color"></i></span>';
															var promotionIconStringCompiled = $compile(promotionIconString)($scope);		
															promotionIcon.append(promotionIconStringCompiled);
														}else if (no == 11)
															{
																var transactionIcon = angular.element(document.querySelector('#transactionIcon'));
																transactionIcon.empty();
																var transactionIconString = '<span ng-mouseover="changeIcon(11)"><i class="fa fa-exclamation red icon-color"></i></span>';
																var transactionIconStringCompiled = $compile(transactionIconString)($scope);		
																transactionIcon.append(transactionIconStringCompiled);
															}else if (no == 12)
																{
																	
																	var consultantGuaranteeIcon = angular.element(document.querySelector('#consultantGuaranteeIcon'));
																	consultantGuaranteeIcon.empty();
																	var consultantGuaranteeIconString = '<span ng-mouseover="changeIcon(12)"><i class="fa fa-exclamation red icon-color"></i></span>';
																	var consultantGuaranteeIconStringCompiled = $compile(consultantGuaranteeIconString)($scope);		
																	consultantGuaranteeIcon.append(consultantGuaranteeIconStringCompiled);
																}else if (no == 13)
																	{
																		
																		var commentsIcon = angular.element(document.querySelector('#commentsIcon'));
																		commentsIcon.empty();
																		var commentsIconString = '<span ng-mouseover="changeIcon(13)"><i class="fa fa-exclamation red icon-color"></i></span>';
																		var commentsIconStringCompiled = $compile(commentsIconString)($scope);		
																		commentsIcon.append(commentsIconStringCompiled);
																	}
				
            };	
				
				$scope.approveIt = function(p) {
					$scope.fieldname = '';
					
					approveRedFlagsTpl.show();
					
					$scope.p = p;
					console.log('test field', p);
					if (p == 1)
						{
							$scope.fieldname = 'age';
						}else if (p == 2)
							{
								$scope.fieldname = 'subject';
							}else if (p == 3)
								{
									$scope.fieldname = 'drink_driving_convictions';
								}else if (p == 4)
									{
										$scope.fieldname = 'criminal_convictions';
									}else if (p == 5)
										{
											$scope.fieldname = 'driving_offences';
										}else if (p ==6)
											{
												$scope.fieldname = 'medication';
											}else if (p == 7)
												{
													$scope.fieldname = 'health_conditions';
												}else if (p == 8)
													{
														$scope.fieldname = 'illicit';
													}else if (p == 9)
														{
															$scope.fieldname = 'dietary';
														}else if (p == 10)
															{
																$scope.fieldname = 'promotion';
															}else if (p == 11)
																{
																	$scope.fieldname = 'transactionNO';
																}else if (p == 12)
																	{
																		$scope.fieldname = 'consultant_guarantee';
																	}else if (p == 13)
																		{
																			$scope.fieldname = 'comments';
																		}
					
				};
				
				$scope.submitApprove = function() {
					console.log('test field name', $scope.fieldname);
					addNewLog($scope.fieldname, 'NA', 'approve').then(function(data) {
						console.log(data);
						approveRedFlagsTpl.hide();
						
						if ($scope.p == 1)
						{
							$scope.fieldname = 'age';
						}else if ($scope.p == 2)
							{
								$scope.fieldname = 'subject';
							}else if ($scope.p == 3)
								{
									$scope.fieldname = 'drink_driving_convictions';
								}else if ($scope.p == 4)
									{
										$scope.fieldname = 'criminal_convictions';
									}else if ($scope.p == 5)
										{
											$scope.fieldname = 'driving_offences';
										}else if ($scope.p ==6)
											{
												$scope.fieldname = 'medication';
											}else if ($scope.p == 7)
												{
													$scope.fieldname = 'health_conditions';
												}else if ($scope.p == 8)
													{
														$scope.fieldname = 'illicit';
													}else if ($scope.p == 9)
														{
															$scope.fieldname = 'dietary';
														}else if ($scope.p == 10)
															{
																$scope.fieldname = 'promotion';
															}else if ($scope.p == 11)
																{
																	$scope.fieldname = 'transactionNO';
																}else if ($scope.p == 12)
																	{
																		$scope.fieldname = 'consultant_guarantee';
																	}else if ($scope.p == 13)
																		{
																			$scope.fieldname = 'comments';
																		}
						
					});
															
					
				};
				
				$scope.cancelApprove = function() {
					approveRedFlagsTpl.hide();
				};
				
				
				
  			});
			

            
            

            $http.get('/getHubspotData?email=' + email).success(function (data2) {

                if (data2.hs_analytics_source) {
                    $scope.os = data2.hs_analytics_source['value'];
                } else {
                    $scope.os = "NA";
                }

                if (data2.createdate) {
                    $scope.cd = data2.createdate['value'];
                } else {
                    $scope.cd = "NA";
                }




                if (data2.hs_analytics_source_data_1) {
                    $scope.osd = data2.hs_analytics_source_data_1['value'];
                } else {
                    $scope.osd = "NA";
                }

                if (data2.closedate) {
                    $scope.closedate = data2.closedate['value'];
                } else {
                    $scope.closedate = "NA";
                }

                //console.log('ownerid', data2.hubspot_owner_id['value']);
                if (data2.hubspot_owner_id) {
                    var ownerID = data2.hubspot_owner_id['value'];
                    getOwnerName(ownerID);
                } else {
                    $scope.ownerName = "NA";
                }




                function getOwnerName(ownerID) {
                    $http.get('/getOwnerName?ownerID=' + ownerID).success(function (data3) {
                        console.log(data3);
                        if (data3) {
                            $scope.ownerName = data3;
                        } else {
                            $scope.ownerName = "NA";
                        }

                    });
                };



            });
			
//edit contents
			$scope.saveProfileChange = function() {
//                    editingProfileButtonsTPL.hide();
				console.log('saving profile changes starting..');
				$scope.savecontact();
				$scope.savepersonal();
				$scope.savetrip();
				$scope.saveaddons();
				$scope.savetravel();
				$scope.saveother();
				$scope.savepayment();
				$scope.savesurvey();
						
				console.log($scope.changingFieldArray);
				
				for (var i=0; i<$scope.changingFieldArray.length; i++)
					{
						var one = {};
						one.field = $scope.changingFieldArray[i];
						one.value = $scope.profile[one.field];
						one.cid = $routeParams.cid;
						$scope.changingFinalData.push(one);
						
					}
				console.log($scope.changingFinalData);
				var changingFinalDataJSON = JSON.stringify($scope.changingFinalData);     
				$http.post('/updateChangedData?changingFinalDataJSON=' + changingFinalDataJSON).success(function (datar) {
                    console.log(datar);		
					$http.post('/addEditLog?changingFinalDataJSON=' + changingFinalDataJSON + '&cid=' + $routeParams.cid + '&staff=' + $rootScope.name + '&staffid=' + $rootScope.staffID).success(function (datar2) {
                         console.log(datar2);
						editingProfileButtonsTPL.hide();
						$scope.changingFieldArray = [];
						$scope.changingFinalData = [];
						
                      });
					
					
					
                      });
				
            };
			
			$scope.cancelProfileChange = function() {
                editingProfileButtonsTPL.hide();
				console.log('cancel profile changes');
				$scope.view.editableValue = $scope.profile.email;
                $scope.view.editableValue2 = $scope.profile.prefferd_contact_no;
                $scope.view.editableValue3 = $scope.profile.skype;
                $scope.view.editableValue4 = $scope.profile.address;
                $scope.view.editableValue5 = $scope.profile.suburb;
                $scope.view.editableValue6 = $scope.profile.state;
                $scope.view.editableValue7 = $scope.profile.country;
                $scope.view.editableValue8 = $scope.profile.post_code;
                $scope.view.editableValue9 = $scope.profile.first_name;
               	$scope.view.editableValue10 = $scope.profile.last_name;
				
				$scope.viewPersonal.editableValue = $scope.profile.nationality;
                $scope.viewPersonal.editableValue2 = $scope.profile.valid_passport;
                $scope.viewPersonal.editableValue3 = $scope.profile.gender;
                $scope.viewPersonal.editableValue4 = $scope.profile.secondary_contact_no;
                $scope.viewPersonal.editableValue5 = $scope.profile.age;
                $scope.viewPersonal.editableValue6 = $scope.profile.dob;
                $scope.viewPersonal.editableValue7 = $scope.profile.weight;
                $scope.viewPersonal.editableValue8 = $scope.profile.height;
				
				$scope.viewTrip.editableValue = $scope.profile.trip_experience_name; 
                $scope.viewTrip.editableValue2 = $scope.profile.trip_destination;
                $scope.viewTrip.editableValue3 = $scope.profile.trip_code;
                $scope.viewTrip.editableValue4 = $scope.profile.trip_duration;
                $scope.viewTrip.editableValue5 = $scope.profile.trip_price;
				$scope.viewTrip.editableValue6 = $scope.profile.subject;
				
				$scope.viewAddons.editableValue = $scope.profile.addon;
				
				$scope.viewTravel.editableValue = $scope.profile.date_departure;    
                $scope.viewTravel.editableValue2 = $scope.profile.travel_before_exp;
                $scope.viewTravel.editableValue3 = $scope.profile.travel_before_exp_how_long;
                $scope.viewTravel.editableValue4 = $scope.profile.traveL_with_someone;
                $scope.viewTravel.editableValue5 = $scope.profile.traveL_with_someone_who;   
                $scope.viewTravel.editableValue6 = $scope.profile.stay_longer;
				
				$scope.viewOther.editableValue = $scope.profile.emrg_contact_name;     
                $scope.viewOther.editableValue2 = $scope.profile.emrg_contact_relation;
                $scope.viewOther.editableValue3 = $scope.profile.emrg_contact_email;
                $scope.viewOther.editableValue4 = $scope.profile.emrg_contact_number;
                $scope.viewOther.editableValue5 = $scope.profile.drink_driving_convictions;   
                $scope.viewOther.editableValue6 = $scope.profile.drink_driving_convictions_date; 
                $scope.viewOther.editableValue7 = $scope.profile.drink_driving_convictions_bac;
                $scope.viewOther.editableValue8 = $scope.profile.drink_driving_convictions_describe;
                $scope.viewOther.editableValue9 = $scope.profile.criminal_convictions;
                $scope.viewOther.editableValue10 = $scope.profile.criminal_convictions_date;
                $scope.viewOther.editableValue11 = $scope.profile.criminal_convictions_describe;
                $scope.viewOther.editableValue12 = $scope.profile.driving_offences;
                $scope.viewOther.editableValue13 = $scope.profile.driving_offences_date;
                $scope.viewOther.editableValue14 = $scope.profile.driving_offences_describe;
                $scope.viewOther.editableValue15 = $scope.profile.tattoos;
                $scope.viewOther.editableValue16 = $scope.profile.tattoos_describe;
                $scope.viewOther.editableValue17 = $scope.profile.medication;
                $scope.viewOther.editableValue18 = $scope.profile.medication_describe;
                $scope.viewOther.editableValue19 = $scope.profile.health_conditions;
                $scope.viewOther.editableValue20 = $scope.profile.health_conditions_describe;
                $scope.viewOther.editableValue21 = $scope.profile.smoke;
                $scope.viewOther.editableValue22 = $scope.profile.alcohol;
                $scope.viewOther.editableValue23 = $scope.profile.illicit;
                $scope.viewOther.editableValue24 = $scope.profile.dietary;
                $scope.viewOther.editableValue25 = $scope.profile.dietary_describe;
				
				$scope.viewPayment.editableValue = $scope.profile.promotion;     
                $scope.viewPayment.editableValue2 = $scope.profile.transactionNO;
				$scope.viewPayment.editableValue3 = $scope.profile.promotion_detail1;
				$scope.viewPayment.editableValue4 = $scope.profile.promotion_detail2;
				$scope.viewPayment.editableValue5 = $scope.profile.promotion_detail3;
				
				$scope.viewPayment.editableValue6 = $scope.profile.payment_status;
				$scope.viewPayment.editableValue7 = $scope.profile.paid_amount;
				$scope.viewPayment.editableValue8 = $scope.profile.paid_date;
				$scope.viewPayment.editableValue9 = $scope.profile.paid_tc;
				$scope.viewPayment.editableValue10 = $scope.profile.wish_payment_type;
				$scope.viewPayment.editableValue11 = $scope.profile.wish_payment_promotional;
				$scope.viewPayment.editableValue12 = $scope.profile.wish_payment_method;
				$scope.viewPayment.editableValue13 = $scope.profile.wish_payment_amount;
				
				$scope.viewSurvey.editableValue = $scope.profile.hear;     
                $scope.viewSurvey.editableValue2 = $scope.profile.hear_other;
                $scope.viewSurvey.editableValue3 = $scope.profile.friend_name;
                $scope.viewSurvey.editableValue4 = $scope.profile.friend_email;
                $scope.viewSurvey.editableValue5 = $scope.profile.friend_number;   
                $scope.viewSurvey.editableValue6 = $scope.profile.consultant_name;
                $scope.viewSurvey.editableValue7 = $scope.profile.consultant_answer; 
                $scope.viewSurvey.editableValue8 = $scope.profile.consultant_answer_describe; 
                $scope.viewSurvey.editableValue9 = $scope.profile.consultant_guarantee; 
                $scope.viewSurvey.editableValue10 = $scope.profile.consultant_guarantee_describe; 
                $scope.viewSurvey.editableValue11 = $scope.profile.rate;
                $scope.viewSurvey.editableValue12 = $scope.profile.comments;
            };
			
//contact section editing
            $scope.view = {
                editableValue: $scope.profile.email,
                editableValue2: $scope.profile.prefferd_contact_no,
                editableValue3: $scope.profile.skype,
                editableValue4: $scope.profile.address,
                editableValue5: $scope.profile.suburb,
                editableValue6: $scope.profile.state,
                editableValue7: $scope.profile.country,
                editableValue8: $scope.profile.post_code,
                editableValue9: $scope.profile.first_name,
                editableValue10: $scope.profile.last_name,
				id: 'email',
				id2: 'prefferd_contact_no',
				id3: 'skype',
				id4: 'address',
				id5: 'suburb',
				id6: 'state',
				id7: 'country',
				id8: 'post_code',
				id9: 'first_name',
				id10: 'last_name'
            };

			$scope.enableEditorButtons = function(field) {
				
				if($scope.changingFieldArray.indexOf(field) === -1)
					{		
						$scope.changingFieldArray.push(field);
					}
                editingProfileButtonsTPL.show();
            };	

            $scope.savecontact = function() {
                $scope.profile.email = $scope.view.editableValue;
                $scope.profile.prefferd_contact_no = $scope.view.editableValue2;
                $scope.profile.skype = $scope.view.editableValue3;
                $scope.profile.address = $scope.view.editableValue4;
                $scope.profile.suburb = $scope.view.editableValue5;
                $scope.profile.state = $scope.view.editableValue6;
                $scope.profile.country = $scope.view.editableValue7;
                $scope.profile.post_code = $scope.view.editableValue8;
                $scope.profile.first_name = $scope.view.editableValue9;
                $scope.profile.last_name = $scope.view.editableValue10;
                
//                $http.post('/updateProfileContact?cid=' + $routeParams.cid + '&f=' + $scope.profile.first_name + '&l=' + $scope.profile.last_name + '&email=' + $scope.profile.email + '&phone=' + $scope.profile.prefferd_contact_no + '&skype=' + $scope.profile.skype + '&address=' + $scope.profile.address + '&suburb=' + $scope.profile.suburb + '&state=' + $scope.profile.state + '&country=' + $scope.profile.country + '&postcode=' + $scope.profile.post_code).success(function (data) {
//                         console.log('data updated');  
//                      });

            };
			       
//personal section editing
            $scope.viewPersonal = {
                editableValue: $scope.profile.nationality,
                editableValue2: $scope.profile.valid_passport,
                editableValue3: $scope.profile.gender,
                editableValue4: $scope.profile.secondary_contact_no,
                editableValue5: $scope.profile.age,
                editableValue6: $scope.profile.dob,
                editableValue7: $scope.profile.weight,
                editableValue8: $scope.profile.height,
				id: 'nationality',
				id2: 'valid_passport',
				id3: 'gender',
				id4: 'secondary_contact_no',
				id5: 'age',
				id6: 'dob',
				id7: 'weight',
				id8: 'height'
            };

            $scope.savepersonal = function() {
                $scope.profile.nationality = $scope.viewPersonal.editableValue;
                $scope.profile.valid_passport = $scope.viewPersonal.editableValue2;
                $scope.profile.gender = $scope.viewPersonal.editableValue3;
                $scope.profile.secondary_contact_no = $scope.viewPersonal.editableValue4;
                $scope.profile.age = $scope.viewPersonal.editableValue5;
                $scope.profile.dob = $scope.viewPersonal.editableValue6;
                $scope.profile.weight = $scope.viewPersonal.editableValue7;
                $scope.profile.height = $scope.viewPersonal.editableValue8;
                
//                $http.post('/updateProfilePersonal?cid=' + $routeParams.cid + '&nationality=' + $scope.profile.nationality + '&passport=' + $scope.profile.valid_passport + '&gender=' + $scope.profile.gender + '&secondphone=' + $scope.profile.secondary_contact_no + '&age=' + $scope.profile.age + '&dob=' + $scope.profile.dob + '&weight=' + $scope.profile.weight + '&height=' + $scope.profile.height).success(function (data) {
//                         console.log('data updated');  
//                      });

            };

            
//trip section editing
            $scope.viewTrip = {
                editableValue: $scope.profile.trip_experience_name,     
                editableValue2: $scope.profile.trip_destination,
                editableValue3: $scope.profile.trip_code,
                editableValue4: $scope.profile.trip_duration,
                editableValue5: $scope.profile.trip_price,
				editableValue6: $scope.profile.subject,
				id: 'trip_experience_name',
				id2: 'trip_destination',
				id3: 'trip_code',
				id4: 'trip_duration',
				id5: 'trip_price',
				id6: 'subject'
            };

            $scope.savetrip = function() {
                $scope.profile.trip_experience_name = $scope.viewTrip.editableValue;
                $scope.profile.trip_destination = $scope.viewTrip.editableValue2;
                $scope.profile.trip_code = $scope.viewTrip.editableValue3;
                $scope.profile.trip_duration = $scope.viewTrip.editableValue4;
                $scope.profile.trip_price = $scope.viewTrip.editableValue5;
				$scope.profile.subject = $scope.viewTrip.editableValue6;
                
//                $http.post('/updateProfileTrip?cid=' + $routeParams.cid + '&experiencename=' + $scope.profile.trip_experience_name + '&destination=' + $scope.profile.trip_destination + '&code=' + $scope.profile.trip_code + '&duration=' + $scope.profile.trip_duration + '&price=' + $scope.profile.trip_price + '&subject=' + $scope.profile.subject).success(function (data) {
//                         console.log('data updated');  
//                      });

            };
            
            
//add ons section editing
            $scope.viewAddons = {
                editableValue: $scope.profile.addon,
				id: 'addon'
            };

            $scope.saveaddons = function() {
                $scope.profile.addon = $scope.viewAddons.editableValue;
                
//                $http.post('/updateProfileAddons?cid=' + $routeParams.cid + '&addon=' + $scope.profile.addon).success(function (data)                       {
//                         console.log('data updated');  
//                      });

            };
            

//travel section editing
            $scope.viewTravel = {
                editableValue: $scope.profile.date_departure,     
                editableValue2: $scope.profile.travel_before_exp,
                editableValue3: $scope.profile.travel_before_exp_how_long,
                editableValue4: $scope.profile.traveL_with_someone,
                editableValue5: $scope.profile.traveL_with_someone_who,   
                editableValue6: $scope.profile.stay_longer,
				id: 'date_departure',
				id2: 'travel_before_exp',
				id3: 'travel_before_exp_how_long',
				id4: 'traveL_with_someone',
				id5: 'traveL_with_someone_who',
				id6: 'stay_longer'
            };

            $scope.savetravel = function() {
                $scope.profile.date_departure = $scope.viewTravel.editableValue;
                $scope.profile.travel_before_exp = $scope.viewTravel.editableValue2;
                $scope.profile.travel_before_exp_how_long = $scope.viewTravel.editableValue3;
                $scope.profile.traveL_with_someone = $scope.viewTravel.editableValue4;
                $scope.profile.traveL_with_someone_who = $scope.viewTravel.editableValue5;
                $scope.profile.stay_longer = $scope.viewTravel.editableValue6;
                
//                $http.post('/updateProfileTravel?cid=' + $routeParams.cid + '&date_departure=' + $scope.profile.date_departure + '&travel_before_exp=' + $scope.profile.travel_before_exp + '&travel_before_exp_how_long=' + $scope.profile.travel_before_exp_how_long + '&traveL_with_someone=' + $scope.profile.traveL_with_someone + '&traveL_with_someone_who=' + $scope.profile.traveL_with_someone_who + '&stay_longer=' + $scope.profile.stay_longer).success(function (data) {
//                         console.log('data updated');  
//                      });

            };
            
            
 //other section editing
            $scope.viewOther = {
                editableValue: $scope.profile.emrg_contact_name,     
                editableValue2: $scope.profile.emrg_contact_relation,
                editableValue3: $scope.profile.emrg_contact_email,
                editableValue4: $scope.profile.emrg_contact_number,
                editableValue5: $scope.profile.drink_driving_convictions,   
                editableValue6: $scope.profile.drink_driving_convictions_date, 
                editableValue7: $scope.profile.drink_driving_convictions_bac,
                editableValue8: $scope.profile.drink_driving_convictions_describe,
                editableValue9: $scope.profile.criminal_convictions,
                editableValue10: $scope.profile.criminal_convictions_date,
                editableValue11: $scope.profile.criminal_convictions_describe,
                editableValue12: $scope.profile.driving_offences,
                editableValue13: $scope.profile.driving_offences_date,
                editableValue14: $scope.profile.driving_offences_describe,
                editableValue15: $scope.profile.tattoos,
                editableValue16: $scope.profile.tattoos_describe,
                editableValue17: $scope.profile.medication,
                editableValue18: $scope.profile.medication_describe,
                editableValue19: $scope.profile.health_conditions,
                editableValue20: $scope.profile.health_conditions_describe,
                editableValue21: $scope.profile.smoke,
                editableValue22: $scope.profile.alcohol,
                editableValue23: $scope.profile.illicit,
                editableValue24: $scope.profile.dietary,
                editableValue25: $scope.profile.dietary_describe,
				id: 'emrg_contact_name',
				id2: 'emrg_contact_relation',
				id3: 'emrg_contact_email',
				id4: 'emrg_contact_number',
				id5: 'drink_driving_convictions',
				id6: 'drink_driving_convictions_date',
				id7: 'drink_driving_convictions_bac',
				id8: 'drink_driving_convictions_describe',
				id9: 'criminal_convictions',
				id10: 'criminal_convictions_date',
				id11: 'criminal_convictions_describe',
				id12: 'driving_offences',
				id13: 'driving_offences_date',
				id14: 'driving_offences_describe',
				id15: 'tattoos',
				id16: 'tattoos_describe',
				id17: 'medication',
				id18: 'medication_describe',
				id19: 'health_conditions',
				id20: 'health_conditions_describe',
				id21: 'smoke',
				id22: 'alcohol',
				id23: 'illicit',
				id24: 'dietary',
				id25: 'dietary_describe'		
            };

            $scope.saveother = function() {
                $scope.profile.emrg_contact_name = $scope.viewOther.editableValue;
                $scope.profile.emrg_contact_relation = $scope.viewOther.editableValue2;
                $scope.profile.emrg_contact_email = $scope.viewOther.editableValue3;
                $scope.profile.emrg_contact_number = $scope.viewOther.editableValue4;
                $scope.profile.drink_driving_convictions = $scope.viewOther.editableValue5;
                $scope.profile.drink_driving_convictions_date = $scope.viewOther.editableValue6;
                $scope.profile.drink_driving_convictions_bac = $scope.viewOther.editableValue7;
                $scope.profile.drink_driving_convictions_describe = $scope.viewOther.editableValue8;
                $scope.profile.criminal_convictions = $scope.viewOther.editableValue9;
                $scope.profile.criminal_convictions_date = $scope.viewOther.editableValue10;
                $scope.profile.criminal_convictions_describe = $scope.viewOther.editableValue11;
                $scope.profile.driving_offences = $scope.viewOther.editableValue12;
                $scope.profile.driving_offences_date = $scope.viewOther.editableValue13;
                $scope.profile.driving_offences_describe = $scope.viewOther.editableValue14;
                $scope.profile.tattoos = $scope.viewOther.editableValue15;
                $scope.profile.tattoos_describe = $scope.viewOther.editableValue16;
                $scope.profile.medication = $scope.viewOther.editableValue17;
                $scope.profile.medication_describe = $scope.viewOther.editableValue18;
                $scope.profile.health_conditions = $scope.viewOther.editableValue19;
                $scope.profile.health_conditions_describe = $scope.viewOther.editableValue20;
                $scope.profile.smoke = $scope.viewOther.editableValue21;
                $scope.profile.alcohol = $scope.viewOther.editableValue22;
                $scope.profile.illicit = $scope.viewOther.editableValue23;
                $scope.profile.dietary = $scope.viewOther.editableValue24;
                $scope.profile.dietary_describe = $scope.viewOther.editableValue25;
                
//                $http.post('/updateProfileOther?cid=' + $routeParams.cid + '&emrg_contact_name=' + $scope.profile.emrg_contact_name + '&emrg_contact_relation=' + $scope.profile.emrg_contact_relation + '&emrg_contact_email=' + $scope.profile.emrg_contact_email + '&emrg_contact_number=' + $scope.profile.emrg_contact_number + '&drink_driving_convictions=' + $scope.profile.drink_driving_convictions + '&drink_driving_convictions_date=' + $scope.profile.drink_driving_convictions_date + '&drink_driving_convictions_bac=' + $scope.profile.drink_driving_convictions_bac + '&drink_driving_convictions_describe=' + $scope.profile.drink_driving_convictions_describe + '&criminal_convictions=' + $scope.profile.criminal_convictions + '&criminal_convictions_date=' + $scope.profile.criminal_convictions_date + '&criminal_convictions_describe=' + $scope.profile.criminal_convictions_describe + '&driving_offences=' + $scope.profile.driving_offences + '&driving_offences_date=' + $scope.profile.driving_offences_date + '&driving_offences_describe=' + $scope.profile.driving_offences_describe + '&tattoos=' + $scope.profile.tattoos + '&tattoos_describe=' + $scope.profile.tattoos_describe + '&medication=' + $scope.profile.medication + '&medication_describe=' + $scope.profile.medication_describe + '&health_conditions=' + $scope.profile.health_conditions + '&health_conditions_describe=' + $scope.profile.health_conditions_describe + '&smoke=' + $scope.profile.smoke + '&alcohol=' + $scope.profile.alcohol + '&illicit=' + $scope.profile.illicit + '&dietary=' + $scope.profile.dietary + '&dietary_describe=' + $scope.profile.dietary_describe).success(function (data) {
//                         console.log('data updated');  
//                      });

            };
  
            
//payment section editing			
            $scope.viewPayment = {
                editableValue: $scope.profile.promotion,     
                editableValue2: $scope.profile.transactionNO,
				editableValue3: $scope.profile.promotion_detail1,
				editableValue4: $scope.profile.promotion_detail2,
				editableValue5: $scope.profile.promotion_detail3,
				editableValue6: $scope.profile.payment_status,
				editableValue7: $scope.profile.paid_amount,
				editableValue8: $scope.profile.paid_date,
				editableValue9: $scope.profile.paid_tc,
				editableValue10: $scope.profile.wish_payment_type,
				editableValue11: $scope.profile.wish_payment_promotional,
				editableValue12: $scope.profile.wish_payment_method,
				editableValue13: $scope.profile.wish_payment_amount,
				id: 'promotion',
				id2: 'transactionNO',
				id3: 'promotion_detail1',
				id4: 'promotion_detail2',
				id5: 'promotion_detail3',
				id6: 'payment_status',
				id7: 'paid_amount',
				id8: 'paid_date',
				id9: 'paid_tc',
				id10: 'wish_payment_type',
				id11: 'wish_payment_promotional',
				id12: 'wish_payment_method',
				id13: 'wish_payment_amount'

            };

            $scope.savepayment = function() {
                $scope.profile.promotion = $scope.viewPayment.editableValue;
				if($scope.viewPayment.editableValue == 'yes')
					{
						$scope.profile.promotion_detail1 = $scope.viewPayment.editableValue3;
						$scope.profile.promotion_detail2 = $scope.viewPayment.editableValue4;
						$scope.profile.promotion_detail3 = $scope.viewPayment.editableValue5;
					}else
						{
							$scope.profile.promotion_detail1 = '';
							$scope.profile.promotion_detail2 = '';
							$scope.profile.promotion_detail3 = '';
						}

                $scope.profile.transactionNO = $scope.viewPayment.editableValue2;
				
				$scope.profile.payment_status = $scope.viewPayment.editableValue6;
				$scope.profile.paid_amount = $scope.viewPayment.editableValue7;
				$scope.profile.paid_date = $scope.viewPayment.editableValue8;
				$scope.profile.paid_tc = $scope.viewPayment.editableValue9;
				$scope.profile.wish_payment_type = $scope.viewPayment.editableValue10;
				$scope.profile.wish_payment_promotional = $scope.viewPayment.editableValue11;
				$scope.profile.wish_payment_method = $scope.viewPayment.editableValue12;
				$scope.profile.wish_payment_amount = $scope.viewPayment.editableValue13;


//                $http.post('/updateProfilePayment?cid=' + $routeParams.cid + '&promotion=' + $scope.profile.promotion + '&transactionNO=' + $scope.profile.transactionNO + '&promotion_detail1=' + $scope.profile.promotion_detail1 + '&promotion_detail2=' + $scope.profile.promotion_detail2 + '&promotion_detail3=' + $scope.profile.promotion_detail3).success(function (data) {
//                         console.log('data updated');  
//                      });

            };
			
            
//travel survey editing
            $scope.viewSurvey = {
                editableValue: $scope.profile.hear,     
                editableValue2: $scope.profile.hear_other,
                editableValue3: $scope.profile.friend_name,
                editableValue4: $scope.profile.friend_email,
                editableValue5: $scope.profile.friend_number,   
                editableValue6: $scope.profile.consultant_name,
                editableValue7: $scope.profile.consultant_answer, 
                editableValue8: $scope.profile.consultant_answer_describe, 
                editableValue9: $scope.profile.consultant_guarantee, 
                editableValue10: $scope.profile.consultant_guarantee_describe, 
                editableValue11: $scope.profile.rate, 
                editableValue12: $scope.profile.comments,
				id: 'hear',
				id2: 'hear_other',
				id3: 'friend_name',
				id4: 'friend_email',
				id5: 'friend_number',
				id6: 'consultant_name',
				id7: 'consultant_answer',
				id8: 'consultant_answer_describe',
				id9: 'consultant_guarantee',
				id10: 'consultant_guarantee_describe',
				id11: 'rate',
				id12: 'comments'
            };

            $scope.savesurvey = function() {
                $scope.profile.hear = $scope.viewSurvey.editableValue;
                $scope.profile.hear_other = $scope.viewSurvey.editableValue2;
                $scope.profile.friend_name = $scope.viewSurvey.editableValue3;
                $scope.profile.friend_email = $scope.viewSurvey.editableValue4;
                $scope.profile.friend_number = $scope.viewSurvey.editableValue5;
                $scope.profile.consultant_name = $scope.viewSurvey.editableValue6;
                $scope.profile.consultant_answer = $scope.viewSurvey.editableValue7;
                $scope.profile.consultant_answer_describe = $scope.viewSurvey.editableValue8;
                $scope.profile.consultant_guarantee = $scope.viewSurvey.editableValue9;
                $scope.profile.consultant_guarantee_describe = $scope.viewSurvey.editableValue10;
                $scope.profile.rate = $scope.viewSurvey.editableValue11;
                $scope.profile.comments = $scope.viewSurvey.editableValue12;
                
//                $http.post('/updateProfileSurvey?cid=' + $routeParams.cid + '&hear=' + $scope.profile.hear + '&hear_other=' + $scope.profile.hear_other + '&friend_name=' + $scope.profile.friend_name + '&friend_email=' + $scope.profile.friend_email + '&friend_number=' + $scope.profile.friend_number + '&consultant_name=' + $scope.profile.consultant_name + '&consultant_answer=' + $scope.profile.consultant_answer + '&consultant_answer_describe=' + $scope.profile.consultant_answer_describe + '&consultant_guarantee=' + $scope.profile.consultant_guarantee + '&consultant_guarantee_describe=' + $scope.profile.consultant_guarantee_describe + '&rate=' + $scope.profile.rate + '&comments=' + $scope.profile.comments).success(function (data) {
//                         console.log('data updated');  
//                      });

            };

			
			
			//call functions for resume tab
			findResumeProfile($scope.profile.email);
			
			//assign task list
			
							$scope.allTasklists = [
									{	
										name: 'Payment Confirmation',//sales depart
										tid: '1',
										trip: 'general'
									},
									{
										name: 'Payment Reference No',
										tid: '2',
										trip: 'general'
									},
									{
										name: 'Register',
										tid: '3',
										trip: 'general'
									},
									{
										name: 'Promo Confirmation',
										tid: '4',
										trip: 'general'
									},
									{
										name: 'Booking Approval',
										tid: '5',
										trip: 'general'
									},
									{	
										name: 'Trip Subject Added',//admin depart
										tid: '6',
										trip: 'general'
									},
									{
										name: 'Admin Booking Check',
										tid: '7',
										trip: 'general'
									},
									{
										name: 'Added to Zoho',
										tid: '8',
										trip: 'general'
									},
									{
										name: 'Choose a Coordinator',
										tid: '9',
										trip: 'general'
									},
									{
										name: 'Welcome call',//coordination
										tid: '10',
										trip: 'general'
									},
									{
										name: 'Welcome email sent',
										tid: '11',
										trip: 'general'
									},
									{
										name: 'Follow up call every 2 weeks',
										tid: '12',
										trip: 'general'
									},
									{
										name: 'Trip Balance Paid',
										tid: '13',
										trip: 'general'
									},
									{
										name: 'Passport',
										tid: '14',
										trip: 'general'
									},
									{
										name: 'Visa Approved',
										tid: '15',
										trip: 'general'
									},
									{
										name: 'Traveller Profile Submitted online',
										tid: '16',
										trip: 'general'
									},
									{
										name: 'Sent to Travel Department',
										tid: '17',
										trip: 'general'
									},
									{
										name: 'Resume',
										tid: '18',
										trip: 'WH'
									},
									{
										name: 'Photo',
										tid: '19',
										trip: 'WH'
									},
									{
										name: '2 x References',
										tid: '20',
										trip: 'WH'
									},
									{
										name: 'Sent to Destination',
										tid: '21',
										trip: 'WH'
									},
									{
										name: 'Resume',
										tid: '22',
										trip: 'Au Pair'
									},
									{
										name: 'Family Letter',
										tid: '23',
										trip: 'Au Pair'
									},
									{
										name: 'Photo',
										tid: '24',
										trip: 'Au Pair'
									},
									{
										name: 'Personal Profile',
										tid: '25',
										trip: 'Au Pair'
									},
									{
										name: 'Reference',
										tid: '26',
										trip: 'Au Pair'
									},
									{
										name: 'Police Check',
										tid: '27',
										trip: 'Au Pair'
									},
									{
										name: 'Medical Check',
										tid: '28',
										trip: 'Au Pair'
									},
									{
										name: 'First Aid',
										tid: '29',
										trip: 'Au Pair'
									},
									{
										name: 'Sent to Destination',
										tid: '30',
										trip: 'Au Pair'
									},
									{
										name: 'Placement Form',
										tid: '31',
										trip: 'Vol'
									},
									{
										name: 'Resume',
										tid: '32',
										trip: 'Vol'
									},
									{
										name: 'Cover Letter',
										tid: '33',
										trip: 'Vol'
									},
									{
										name: '2 x Photos',
										tid: '34',
										trip: 'Vol'
									},
									{
										name: 'Police Check',
										tid: '35',
										trip: 'Vol'
									},
									{
										name: 'Booking with Partner',
										tid: '36',
										trip: 'Vol'
									},
									{
										name: 'Send Global Experience Pack',
										tid: '37',
										trip: 'Vol'
									},
									{
										name: 'In country follow up',
										tid: '38',
										trip: 'Vol'
									},
									{
										name: 'Resume',
										tid: '39',
										trip: 'Teach'
									},
									{
										name: 'Cover Letter',
										tid: '40',
										trip: 'Teach'
									},
									{
										name: '2 x Photos',
										tid: '41',
										trip: 'Teach'
									},
									{
										name: 'University Transcripts (if applicable)',
										tid: '42',
										trip: 'Teach'
									},
									{
										name: '90 Days prior to departure: Background Check',
										tid: '43',
										trip: 'Teach'
									},
									{
										name: 'Sent information to Partner',
										tid: '44',
										trip: 'Teach'
									},
									{
										name: 'Send Global Experience Pack',
										tid: '45',
										trip: 'Teach'
									},
									{
										name: 'Resume',
										tid: '46',
										trip: 'internship'
									},
									{
										name: 'Cover Letter',
										tid: '47',
										trip: 'internship'
									},
									{
										name: '2 x Photos',
										tid: '48',
										trip: 'internship'
									},
									{
										name: 'Police Check',
										tid: '49',
										trip: 'internship'
									},
									{
										name: 'Sent information to Partner',
										tid: '50',
										trip: 'internship'
									},
									{
										name: 'Send Global Experience Pack',
										tid: '51',
										trip: 'internship'
									},
								];
			
			$scope.salesDepart = [];
			if ($scope.profile.trip_experience_name == 'Working Holiday')
				{
					$scope.salesD = ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'];//for sending email, each element change to yes only after confirm clicking, 21
						
					for (var a=0; a<$scope.allTasklists.length; a++)
						{
							if (($scope.allTasklists[a].trip == 'general') || ($scope.allTasklists[a].trip == 'WH'))
								{
									var onetask = {
											name: $scope.allTasklists[a].name,
											tid: $scope.allTasklists[a].tid,
											trip: $scope.allTasklists[a].trip
										};
									$scope.salesDepart.push(onetask);
									
								}
						}
					
				}else if ($scope.profile.trip_experience_name == 'Au Pair')
					{
						$scope.salesD = ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'];//26
					 	for (var a=0; a<$scope.allTasklists.length; a++)
						{
							if (($scope.allTasklists[a].trip == 'general') || ($scope.allTasklists[a].trip == 'Au Pair'))
								{
									var onetask = {
											name: $scope.allTasklists[a].name,
											tid: $scope.allTasklists[a].tid,
											trip: $scope.allTasklists[a].trip
										};
									$scope.salesDepart.push(onetask);
									
								}
						}
						
					}else if ($scope.profile.trip_experience_name == 'Teach')
						{
							$scope.salesD = ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'];//24
							
							for (var a=0; a<$scope.allTasklists.length; a++)
						{
							if (($scope.allTasklists[a].trip == 'general') || ($scope.allTasklists[a].trip == 'Teach'))
								{
									var onetask = {
											name: $scope.allTasklists[a].name,
											tid: $scope.allTasklists[a].tid,
											trip: $scope.allTasklists[a].trip
										};
									$scope.salesDepart.push(onetask);
									
								}
						}
							
							
						}else if ($scope.profile.trip_experience_name == 'Volunteer')
							{
								$scope.salesD = ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'];//25
								
									for (var a=0; a<$scope.allTasklists.length; a++)
						{
							if (($scope.allTasklists[a].trip == 'general') || ($scope.allTasklists[a].trip == 'Vol'))
								{
									var onetask = {
											name: $scope.allTasklists[a].name,
											tid: $scope.allTasklists[a].tid,
											trip: $scope.allTasklists[a].trip
										};
									$scope.salesDepart.push(onetask);
									
								}
						}
								
							}else if ($scope.profile.trip_experience_name == 'Internship')
							{
								$scope.salesD = ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'];//23
								
									for (var a=0; a<$scope.allTasklists.length; a++)
						{
							if (($scope.allTasklists[a].trip == 'general') || ($scope.allTasklists[a].trip == 'internship'))
								{
									var onetask = {
											name: $scope.allTasklists[a].name,
											tid: $scope.allTasklists[a].tid,
											trip: $scope.allTasklists[a].trip
										};
									$scope.salesDepart.push(onetask);
									
								}
						}
								
							}
	
			console.log('test saleDepart array', $scope.salesDepart);
			findAllValues($scope.salesDepart);
			
			
        });
    };
    
    findtravel();
    function findtravel() {
        $http.get('/findtravel?cid=' + $routeParams.cid).success(function (data10) {
                    //console.log(data10);
                    $scope.travelDetails = data10[0];
             });
  };
    
    checkMarketingCID();
    function checkMarketingCID() {

        $http.get('/checkMarketingCID?cid=' + $routeParams.cid).success(function (data) {
            console.log('the lenght is: ', data.length);
            if (data.length == 1) {
                //update
                $scope.button = "Update Database";
                $scope.uploadHubspot = function () {

                    if (($scope.os) && ($scope.cd) && ($scope.ownerName) && ($scope.osd) && ($scope.closedate)) {
                        console.log('test', $scope.ownerName);
                        updateHubspot();
                    } else {
                        console.log("data empty");
                    }


                    function updateHubspot() {
                        $http.post('/updateHubspot?cid=' + $scope.c + '&os=' + $scope.os + '&createdate=' + $scope.cd + '&hsOwner=' + $scope.ownerName + '&campName=' + $scope.osd + '&closeDate=' + $scope.closedate).success(function (data5) {
                            console.log(data5);
                            console.log("data updated");
                        });
                    };

                };

            } else {
                //insert
                $scope.button = "Insert Into Database";
                //insert hubspot data into database
                $scope.uploadHubspot = function () {

                    if (($scope.os) && ($scope.cd) && ($scope.ownerName) && ($scope.osd) && ($scope.closedate)) {
                        console.log('test', $scope.ownerName);
                        insertHubspot();
                    } else {
                        console.log("data empty");
                    }


                    function insertHubspot() {
                        $http.post('/insertHubspot?cid=' + $scope.c + '&os=' + $scope.os + '&createdate=' + $scope.cd + '&hsOwner=' + $scope.ownerName + '&campName=' + $scope.osd + '&closeDate=' + $scope.closedate).success(function (data4) {
                            console.log(data4);
                            console.log("data inserted");
                        });
                    };

                };


            }

        });
    };

	
//task list tab
					
	$scope.status = 'Nothing';
		
	function findAllValues(salesDepart) {
		$http.get('/findAllValues?cid=' + $routeParams.cid).success(function (data) {
			if (data.length > 0)
				{
					$scope.tasklist = [];
					console.log('hey hey', salesDepart[0].name);
					for (var i=0; i<salesDepart.length; i++)
						{
							var onetask = {
								taskName: salesDepart[i].name,
								tid: salesDepart[i].tid,
								value: 'no'
							};
							var lastTaskID = -1; //check if it is the last record
							for (var j=0; j<data.length; j++)
								{
									if (data[j].tid == salesDepart[i].tid)
										{
											
											if (data[j].taskID > lastTaskID)	
												{
													lastTaskID = data[j].taskID;
													onetask = data[j];																										
//													if (data[j].value == 'yes')
//													{
//														$scope.status = data[j].taskName;
//													}
												}
											
											
										}
									
								}
							$scope.tasklist.push(onetask);
							
						}
					//console.log($scope.tasklist);
				}else
					{						                        
						console.log('not this cid');
						$scope.tasklist = [];
					
					for (var i=0; i<salesDepart.length; i++)
						{
							var onetask = {
								taskName: salesDepart[i].name,
								tid: salesDepart[i].tid,
								value: 'no'
							};
							$scope.tasklist.push(onetask);
							
						}
//					console.log($scope.tasklist);
					}
						
			
		
//check status 
     	console.log('test how about tasklist now:', $scope.tasklist);
			for (var t=0; t<$scope.tasklist.length; t++)
				{
					if ($scope.tasklist[t].value == 'yes')
						{
							$scope.status = $scope.tasklist[t].taskName;
							$scope.salesD[t] = 'yes';//important
						}
				}
		console.log('final checking array is here:', $scope.salesD);
								
			

//event here
			
//			$scope.testClick = function(t) {
//				console.log(t.tid);
//				var vid = t.currentTarget.getAttribute("data-tid"); 
//				console.log('vid', vid);
//		};
			
			
			$scope.checkClick = function(tid, index) {
				console.log('repeat check', tid);
				
				var confirmHTML = angular.element(document.querySelector('#t' + index));
				var htmlString = '<button class="btn btn-sm green darken-2 global-button confirm-btn" ng-click="confirmCheckChange('+index+')"><i class="md md-check global-button-icon"></i> </button><button class="btn btn-sm red darken-2 global-button cancel-btn" ng-click="cancelCheckChange('+index+')"><i class="md md-close global-button-icon"></i></button>';
				var htmlStringCompiled = $compile(htmlString)($scope);
        		confirmHTML.append(htmlStringCompiled);
				
				$scope.confirmCheckChange = function(i) {
					
					switch ($scope.tasklist[i].tid)
						{
							case '1':
								{
									console.log('Payment Confirmation confirm click..');
									
									insertIntoDatabase(i);
									
								}
							break;
							case '2':
								{
									console.log('Payment Reference No confirm click..');
									
									insertIntoDatabase(i);
								}
							break;	
							case '3':
								{
									console.log('Register confirm click..');
									
									insertIntoDatabase(i);
								}
							break;	
							case '4':
								{
									console.log('Promo Confirmation confirm click..');
									
									insertIntoDatabase(i);
								}
							break;	
							case '5':
								{
									console.log('Booking Approval confirm click..');
									
									insertIntoDatabase(i);
								}
							break;	
							case '6':
								{
									console.log('Trip Subject Added confirm click..');

									insertIntoDatabase(i);
								}
							break;	
							case '7':
								{
									console.log('Admin Booking Check confirm click..');

									insertIntoDatabase(i);
								}
							break;	
							case '8':
								{
									console.log('Added to Zoho confirm click..');
									confirmzohocall(i);//insert into table when success response
									
								}
							break;	
							case '9':
								{
									console.log('Choose Coordinator confirm click..');
									//only can be clicked when all of above has been clicked
									if (($scope.salesD[0] == 'yes') && ($scope.salesD[1] == 'yes') && ($scope.salesD[2] == 'yes') && ($scope.salesD[3] == 'yes') && ($scope.salesD[4] == 'yes') && ($scope.salesD[5] == 'yes') && ($scope.salesD[6] == 'yes') && ($scope.salesD[7] == 'yes'))
									{
										AllocateCoordinatorTpl.show();	
										$scope.addCoordinator = function(selectedCoordinators) {
											console.log('new owner is', selectedCoordinators);
    										$scope.owner = selectedCoordinators.fullname;											
											$http.post('/updateDepStatusAdmin?cid=' + $routeParams.cid + '&owner=' + $scope.owner).success(function (data) {
                         						console.log('dep status updated', data); 
												insertIntoDatabase(i);
												AllocateCoordinatorTpl.hide();
											});	
									};	

											
											
									}else
										{
											$rootScope.startAlert('danger', 'Error', 'Please fullfill all of other task above', 'md md-error');
											var c = angular.element(document.querySelector('#t' + i));
											c.empty();
											$scope.tasklist[i].value = 'no';
										}
								}
							break;	
							case '10':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '11':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '12':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '13':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '14':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '15':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '16':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '17':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '18':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '19':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '20':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '21':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '22':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '23':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '24':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '25':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '26':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '27':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '10':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '28':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '29':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '30':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '31':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '32':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '33':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '34':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '35':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '36':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '37':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '38':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '39':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '40':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '41':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '42':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '43':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '44':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
							case '45':
								{
									
									insertIntoDatabase(i);
									
								}
							break;
						}
							

			};
						
				$scope.cancelCheckChange = function(i) {
					
    				console.log(i);
					
					if ($scope.tasklist[i].value == 'yes')
						{
							$scope.tasklist[i].value = 'no';
						}else
							{	
								$scope.tasklist[i].value = 'yes';
							}
					
					var c = angular.element(document.querySelector('#t' + i));
					c.empty(); 
				};
				
				
			};
				
			
	});
}	
	
function insertIntoDatabase(i) 
	{
									$http.post('/insertOneTask?cid=' + $routeParams.cid + '&taskName=' + $scope.tasklist[i].taskName + '&tid=' + $scope.tasklist[i].tid + '&value=' + $scope.tasklist[i].value + '&user=' + $scope.staffName).success(function (inserteddata)
					{
                        console.log('inserted one task');
						
                        $scope.tasklist[i].time = 'just now';
						$scope.tasklist[i].user = $scope.staffName;
						var c = angular.element(document.querySelector('#t' + i));
						c.empty(); 
						if ($scope.tasklist[i].value == 'yes')
							{
								
								$scope.salesD[i] ='yes';//
								changeProfileStatus(i);
								
								//change dep_status to sales and send email if sales section finished, need to fixed later for other sections
								if (($scope.salesD[0] == 'yes') && ($scope.salesD[1] == 'yes') && ($scope.salesD[2] == 'yes') && ($scope.salesD[3] == 'yes') && ($scope.salesD[4] == 'yes') && ($scope.tasklist[i].tid < 6))
											{
												
											console.log('admin status adding..');
									//old			
//									$http.post('/changeDepStatus?cid=' + $routeParams.cid).success(function (data) {
//                         						console.log('dep status updated', data); 
//												$http.get('/sendSalesLogEmail?lastname=' + $scope.profile.last_name + '&firstname=' + $scope.profile.first_name).success(function (data) {
//                         							console.log('email sending', data);   
//                      								});
//                      						});			
												
										//add new admin status to department table
									$http.post('/addDepStatus?cid=' + $routeParams.cid).success(function (data) {
                         						console.log('dep status added', data); 
												$http.get('/sendSalesLogEmail?lastname=' + $scope.profile.last_name + '&firstname=' + $scope.profile.first_name).success(function (data) {
                         							console.log('email sending', data);   
                      								});
                      						});	
												
												
											}
								//change to admin when sales and admin section all finished
//								if (($scope.salesD[0] == 'yes') && ($scope.salesD[1] == 'yes') && ($scope.salesD[2] == 'yes') && ($scope.salesD[3] == 'yes') && ($scope.salesD[4] == 'yes') && ($scope.salesD[5] == 'yes') && ($scope.salesD[6] == 'yes') && ($scope.salesD[7] == 'yes') && ($scope.salesD[8] == 'yes') && ($scope.tasklist[i].tid < 10) && ($scope.tasklist[i].tid > 5))
//											{
//												$scope.owner = 'test owner here';
//												
//									$http.post('/addDepStatusAdmin?cid=' + $routeParams.cid + '&owner=' + $scope.owner).success(function (data) {
//                         						console.log('dep status updated', data); 
//										});	
//	
//											}
									
										
								
							}
                  });						
									

	};
	
								function changeProfileStatus(i) 
								{
	
									if ($scope.status == 'Nothing')
									{
										$scope.status = $scope.tasklist[i].taskName;
									}else
										{
											for (var r = 0; r < $scope.salesDepart.length; r++)
											{
												if ($scope.salesDepart[r].name == $scope.status)
													{
														if ($scope.salesDepart[r].tid < $scope.tasklist[i].tid)
															{
																$scope.status = $scope.tasklist[i].taskName;
															}
														break;
													}
										
											}
										}

								};	

	
	var AllocateCoordinatorTpl = $aside({
        scope: $scope,
        template: '../bookings/allocateCoordinatorTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-right'
    });
	
	getAllCoordinators();
    function getAllCoordinators() {
        $http.get('/getAllCoordinators').success(function (data) {
			$scope.allCoordinators = data;
			for(var a = 0; a < data.length; a++)
				{
					$scope.allCoordinators[a].fullname = $scope.allCoordinators[a].first_name + ' ' + $scope.allCoordinators[a].last_name; 
				}
			
			
		});
	};
	
//    $scope.test = function () {
//        console.log('test test testtttt');
//        this.$hide(); //$hide hide notification box, scope method
//    };
//    
//        $scope.close = function () {
//        console.log('close test');
//        this.$hide(); //$hide hide notification box, scope method
//    };
    
    $scope.createCustomerpdf = function () {
            $http.get('/createCustomerpdf?cid=' + $routeParams.cid).success(function (data) {
                         console.log(data);  
                             $scope.dd = data;
         //download it                    
        function downloadpdf () {
            var s = $rootScope.remoteURL + '//' + $scope.dd;//'http://localhost:3000/' + $scope.dd;
            $window.open(s, '_blank');//fix later url
        }

        $timeout(downloadpdf, 7000); 
                              
	});

};
	
//show and add notes
	$scope.showNotes = function () {
    	NotesPageTpl.show();
		
			$scope.saveNote = function (newNote) {
				if(newNote != '')
					{
						console.log('test note', newNote);
				$http.post('/saveNewNote?cid=' + $routeParams.cid + '&note=' + newNote + '&staff=' + $scope.staffName).success(function (data) {
                        console.log('success add one note', data);
						var aNote = {
							time: 'just now',
							staff: $scope.staffName,
							text: newNote
						};
						$scope.notesList.push(aNote);
						NotesPageTpl.toggle(); 
						NotesPageTpl.toggle(); 
					
                      });
					}
//				
    			

    		};
		
		
    };
	

	getAllNotes();
	function getAllNotes() {
		$http.get('/getAllNotes?cid=' + $routeParams.cid).success(function (data) {
                        console.log(data);
						$scope.notesList = data;
			
						if(data.length == 0)
							{
								$scope.noteRedFlag = false; 
							}
						else
							{
								$scope.noteRedFlag = true;
							}
                      });
	};
	
	var NotesPageTpl = $aside({
        scope: $scope,
        template: '../bookings/notesTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-right'
    });
	
	
//add payment for this customer
	
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
	
	$scope.addPay = function () {
    	addPaymentTpl.show();
			
    };
	
	
	var addPaymentTpl = $aside({
        scope: $scope,
        template: '../bookings/addPaymentTpl.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-right'
    });
	
	    //{done:false}
    $scope.todoList = [];
	$scope.dis = false; 
	$scope.repeatCheck = 'NO';
	$scope.isDisabled = true;
    $scope.myFunction = function (repeatCheck) {
        if (repeatCheck == 'YES')
            {
                $scope.isDisabled = false;
            }else
                {
                    $scope.isDisabled = true;
                }
    };
	
    
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
	
	
//submit add payment form
	$scope.addpayment = function (paymentDate, paymentAmount, repeatCheck, repeatPeriod, repeatTime) {
			
        console.log('testttttt', $scope.selectedState);
        
        var customerName2 = $scope.profile.first_name + ', ' + $scope.profile.last_name;//for seach
		
        var paymentStatus = $scope.data2.selectedOption.name;
//        var paymentAmount = $scope.paymentAmount;
//        var paymentDate = $scope.paymentDate;
        var currency = $scope.data3.selectedOption.name;
        console.log('1', paymentDate);
                
//          console.log('this is not a test ok?????', data[0].cid);
         if (repeatCheck == 'NO'){
                 $http.post('/addPayment?customerName2=' + customerName2 + '&paymentStatus=' + paymentStatus + '&paymentAmount=' + paymentAmount + '&paymentDate=' + paymentDate + '&currency=' + currency + '&cid=' + $routeParams.cid + '&staffname=' + $rootScope.name).success(function (data2) {
                        
                if($scope.todoList.length > 0)
                 {
                       console.log('ok, here is the list');       
                      for (i=0; i<$scope.todoList.length; i++)
                          {
                              addtodopayments(i,$routeParams.cid);
                              
                              console.log(i);
                          }
                     
                     
                 }else
                     {
                        //
                       	addPaymentTpl.toggle(); 
                        $rootScope.startAlert('success', 'Success', 'Well done! You successfully submit new payment form.', 'md md-done');
                     }
                                                            
                                                                         
                                                                         
                    });
                  
                    
             
                    }else
                        {

                            if ((!repeatTime) || (!repeatPeriod))
                                {
                                    console.log('another test ok?????');             
                   
                    addPaymentTpl.toggle(); 
                 
                    $rootScope.startAlert('danger', 'Error', 'Well, you must enter the repeat times and period', 'md md-error');
                                }else
                                    {
                                        
                                        if ($scope.data4.selectedOption.name == 'Week')
                                {
                                             $http.post('/addPaymentRepeatweek?customerName2=' + customerName2 + '&paymentStatus=' + paymentStatus + '&paymentAmount=' + paymentAmount + '&paymentDate=' + paymentDate + '&currency=' + currency + '&cid=' + $routeParams.cid + '&staffname=' + $rootScope.name + '&period=' + repeatPeriod + '&times=' + repeatTime).success(function (data) {
                        addPaymentTpl.toggle(); 
                       
                        $rootScope.startAlert('success', 'Success', 'Well done! You successfully submit MULTIPLE new payments.', 'md md-done');
                    });
                                                    
                                }else if ($scope.data4.selectedOption.name == 'Month')
                                    {
                                                                                         $http.post('/addPaymentRepeatmonth?customerName2=' + customerName2 + '&paymentStatus=' + paymentStatus + '&paymentAmount=' + paymentAmount + '&paymentDate=' + paymentDate + '&currency=' + currency + '&cid=' + $routeParams.cid + '&staffname=' + $rootScope.name + '&period=' + repeatPeriod + '&times=' + repeatTime).success(function (data) {
                        addPaymentTpl.toggle(); 
                       
                        $rootScope.startAlert('success', 'Success', 'Well done! You successfully submit MULTIPLE new payments monthly.', 'md md-done');
                    });
                                                                          
                                    }
                                                                           
                                    }
                            

                        }
                    
                   

              
           
       
    };
	
	
function addtodopayments(i,c) {
       $http.post('/addPayment?customerName2=testNameHere&paymentStatus=' + $scope.todoList[i].paymentStatus.name + '&paymentAmount=' + $scope.todoList[i].paymentAmount + '&paymentDate=' + $scope.todoList[i].paymentDate + '&currency=' + $scope.data3.selectedOption.name + '&cid=' + c + '&staffname=' + $rootScope.name).success(function (data) {
            if (i == ($scope.todoList.length - 1))
                    {
                        addPaymentTpl.toggle(); 
                       
                        $rootScope.startAlert('success', 'Success', 'Well done! You successfully submit multiple payments.', 'md md-done');
                        
                        
                    }
           
            $scope.todoList[i].paymentDate = null;
           $scope.todoList[i].paymentAmount = null;
           console.log('one added');
                    });
                
                
                 };	
	
	
	

	
	function confirmzohocall(i) {

                    if ($scope.profile.consultant_name == '')
                        {
                            $rootScope.startAlert('danger', 'Error', 'There is no consultant name for this customer.', 'md md-error');
							var z = angular.element(document.querySelector('#t' + i));
							z.empty();
							$scope.tasklist[i].value = 'no';
                        }else
                            {                                    
                                    var oneContact = 
                                {
                                    "first_name": $scope.profile.first_name,
                                    "last_name": $scope.profile.last_name,
                                    "email": $scope.profile.email,
                                    "prefferd_contact_no": $scope.profile.prefferd_contact_no,
                                    "skype": $scope.profile.skype,
                                    "address": $scope.profile.address,
                                    "suburb": $scope.profile.suburb,
                                    "state": $scope.profile.state,
                                    "country": $scope.profile.country,
                                    "post_code": $scope.profile.post_code,
                                    "nationality": $scope.profile.nationality,
                                    "valid_passport": $scope.profile.valid_passport,
                                    "gender": $scope.profile.gender,
                                    "secondary_contact_no": $scope.profile.secondary_contact_no,
                                    "age": $scope.profile.age,
                                    "dob": $scope.profile.dob,
                                    "weight": $scope.profile.weight,
                                    "height": $scope.profile.height,
                                    "trip_experience_name": $scope.profile.trip_experience_name,
                                    "trip_destination": $scope.profile.trip_destination,
                                    "trip_code": $scope.profile.trip_code,
                                    "trip_duration": $scope.profile.trip_duration,
                                    "trip_price": $scope.profile.trip_price,
									"subject": $scope.profile.subject,
                                    "addon": $scope.profile.addon,
									"date_departure": $scope.profile.date_departure,
                                    "travel_before_exp": $scope.profile.travel_before_exp,
                                    "travel_before_exp_how_long": $scope.profile.travel_before_exp_how_long,
                                    "traveL_with_someone": $scope.profile.traveL_with_someone,
                                    "traveL_with_someone_who": $scope.profile.traveL_with_someone_who,
                                    "stay_longer": $scope.profile.stay_longer,
                                    "emrg_contact_name": $scope.profile.emrg_contact_name,
                                    "emrg_contact_relation": $scope.profile.emrg_contact_relation,
                                    "emrg_contact_email": $scope.profile.emrg_contact_email,
                                    "emrg_contact_number": $scope.profile.emrg_contact_number,
                                    "drink_driving_convictions": $scope.profile.drink_driving_convictions,
                                    "drink_driving_convictions_date": $scope.profile.drink_driving_convictions_date,
                                    "drink_driving_convictions_bac": $scope.profile.drink_driving_convictions_bac,
                                    "drink_driving_convictions_describe": $scope.profile.drink_driving_convictions_describe,
                                    "criminal_convictions": $scope.profile.criminal_convictions,
                                    "criminal_convictions_date": $scope.profile.criminal_convictions_date,
                                    "criminal_convictions_describe": $scope.profile.criminal_convictions_describe,
                                    "driving_offences": $scope.profile.driving_offences,
                                    "driving_offences_date": $scope.profile.driving_offences_date,
                                    "driving_offences_describe": $scope.profile.driving_offences_describe,
                                    "tattoos": $scope.profile.tattoos,
                                    "tattoos_describe": $scope.profile.tattoos_describe,
                                    "medication": $scope.profile.medication,
                                    "medication_describe": $scope.profile.medication_describe,
                                    "health_conditions": $scope.profile.health_conditions,
                                    "health_conditions_describe": $scope.profile.health_conditions_describe,
                                    "smoke": $scope.profile.smoke,
                                    "alcohol": $scope.profile.alcohol,
                                    "illicit": $scope.profile.illicit,
                                    "dietary": $scope.profile.dietary,
                                    "dietary_describe": $scope.profile.dietary_describe,
                                    "hear": $scope.profile.hear,
                                    "hear_other": $scope.profile.hear_other,
                                    "friend_name": $scope.profile.friend_name,
                                    "friend_email": $scope.profile.friend_email,
                                    "friend_number": $scope.profile.friend_number,
                                    "consultant_name": $scope.profile.consultant_name,
                                    "consultant_answer": $scope.profile.consultant_answer,
                                    "consultant_answer_describe": $scope.profile.consultant_answer_describe,
                                    "consultant_guarantee": $scope.profile.consultant_guarantee,
                                    "consultant_guarantee_describe": $scope.profile.consultant_guarantee_describe,
                                    "rate": $scope.profile.rate,
                                    "comments": $scope.profile.comments,
                                    "cid": $routeParams.cid
                                };
                                    
                                console.log(oneContact.first_name);
                                var oneContact2 = JSON.stringify(oneContact);                                
       
                                $http.post('/callzoho?oneContact=' + oneContact2).success(function (datazoho) {
                                    console.log('zoho called', datazoho); 
                                    $scope.showzohoconfirm = false;
									
									if(datazoho == 'success')
										{
										 	$rootScope.startAlert('success', 'Success', 'Well done! You have successfully added this guy into Zoho.', 'md md-done');
											insertIntoDatabase(i);
										}else
											{
										 		$rootScope.startAlert('danger', 'Error', 'Zoho added failed', 'md md-error');
											}
                                });                          

                            }
                

            };
	
//add compliance
	var addComplianceTPL = $aside({
        scope: $scope,
        template: '../bookings/addComplianceTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-right'
    });
	
	$scope.addCompliance = function () {
    	addComplianceTPL.show();
			
    };
	
	$scope.formData = {};
	$scope.submitCompliance = function (formData) {
		
		console.log('ha ha ha', formData);
		
		        if ((!formData.introCheckA) || (!formData.introCheckB) || (!formData.qualificationCheckA) || (!formData.qualificationCheckB) || (!formData.qualificationCheckC) || (!formData.qualificationCheckD) || (!formData.qualificationCheckE) || (!formData.backgroundCheckA) || (!formData.selectionCheckA) || (!formData.selectionCheckB) || (!formData.selectionCheckC) || (!formData.selectionCheckD) || (!formData.selectionCheckE) || (!formData.selectionCheckF) || (!formData.selectionCheckG) || (!formData.costCheckA) || (!formData.costCheckB) || (!formData.costCheckC) || (!formData.costCheckD) || (!formData.costCheckE) || (!formData.costCheckF) || (!formData.costCheckG) || (!formData.urgencyCheckA) || (!formData.urgencyCheckB) || (!formData.urgencyCheckC) || (!formData.urgencyCheckD) || (!formData.urgencyCheckE) || (!formData.othersCheckA) || (!formData.othersCheckB) || (!formData.othersCheckC) || (!formData.othersCheckD) || (!formData.othersCheckE) || (!formData.othersCheckF))
    {
         //didnt select every input radio question
        $rootScope.startAlert('danger', 'Error', 'Please fullfill every question', 'md md-error');
        addComplianceTPL.toggle(); 
		 
    }
    else{
                $scope.redflag = 0;
        $scope.yellowflag = 0;
        if (formData.introCheckB == 'no') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if (formData.qualificationCheckC == 'no') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if (formData.qualificationCheckD == 'no') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if (formData.selectionCheckC == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.selectionCheckD == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.selectionCheckE == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.selectionCheckF == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.selectionCheckG == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.costCheckC == 'no') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.costCheckD == 'no') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.costCheckE == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.costCheckG == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }
        if (formData.urgencyCheckA == 'yes') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if (formData.urgencyCheckB == 'yes') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if (formData.urgencyCheckC == 'yes') {
            $scope.yellowflag = $scope.yellowflag + 1;
        }
        if (formData.urgencyCheckE == 'yes') {
            $scope.redflag = $scope.redflag + 1;
        }

		addcompliance();

        function addcompliance() {
            $http.post('/addcompliance?introCheckA=' + formData.introCheckA + '&introCommentsA=' + formData.introCommentsA + '&introCheckB=' + formData.introCheckB + '&introCommentsB=' + formData.introCommentsB + '&qualificationCheckA=' + formData.qualificationCheckA + '&qualificationCommentsA=' + formData.qualificationCommentsA + '&qualificationCheckB=' + formData.qualificationCheckB + '&qualificationCommentsB=' + formData.qualificationCommentsB + '&qualificationCheckC=' + formData.qualificationCheckC + '&qualificationCommentsC=' + formData.qualificationCommentsC + '&qualificationCheckD=' + formData.qualificationCheckD + '&qualificationCommentsD=' + formData.qualificationCommentsD + '&qualificationCheckE=' + formData.qualificationCheckE + '&qualificationCommentsE=' + formData.qualificationCommentsE + '&backgroundCheckA=' + formData.backgroundCheckA + '&backgroundCommentsA=' + formData.backgroundCommentsA + '&selectionCheckA=' + formData.selectionCheckA + '&selectionCommentsA=' + formData.selectionCommentsA + '&selectionCheckB=' + formData.selectionCheckB + '&selectionCommentsB=' + formData.selectionCommentsB + '&selectionCheckC=' + formData.selectionCheckC + '&selectionCommentsC=' + formData.selectionCommentsC + '&selectionCheckD=' + formData.selectionCheckD + '&selectionCommentsD=' + formData.selectionCommentsD + '&selectionCheckE=' + formData.selectionCheckE + '&selectionCommentsE=' + formData.selectionCommentsE + '&selectionCheckF=' + formData.selectionCheckF + '&selectionCommentsF=' + formData.selectionCommentsF + '&selectionCheckG=' + formData.selectionCheckG + '&selectionCommentsG=' + $scope.selectionCommentsG + '&costCheckA=' + $scope.costCheckA + '&costCommentsA=' + formData.costCommentsA + '&costCheckB=' + formData.costCheckB + '&costCommentsB=' + formData.costCommentsB + '&costCheckC=' + formData.costCheckC + '&costCommentsC=' + formData.costCommentsC + '&costCheckD=' + formData.costCheckD + '&costCommentsD=' + formData.costCommentsD + '&costCheckE=' + formData.costCheckE + '&costCommentsE=' + formData.costCommentsE + '&costCheckF=' + formData.costCheckF + '&costCommentsF=' + formData.costCommentsF + '&costCheckG=' + formData.costCheckG + '&costCommentsG=' + formData.costCommentsG + '&urgencyCheckA=' + formData.urgencyCheckA + '&urgencyCommentsA=' + formData.urgencyCommentsA + '&urgencyCheckB=' + formData.urgencyCheckB + '&urgencyCommentsB=' + formData.urgencyCommentsB + '&urgencyCheckC=' + formData.urgencyCheckC + '&urgencyCommentsC=' + formData.urgencyCommentsC + '&urgencyCheckD=' + formData.urgencyCheckD + '&urgencyCommentsD=' + formData.urgencyCommentsD + '&urgencyCheckE=' + formData.urgencyCheckE + '&urgencyCommentsE=' + formData.urgencyCommentsE + '&othersCheckA=' + formData.othersCheckA + '&othersCommentsA=' + formData.othersCommentsA + '&othersCheckB=' + formData.othersCheckB + '&othersCommentsB=' + formData.othersCommentsB + '&othersCheckC=' + formData.othersCheckC + '&othersCommentsC=' + formData.othersCommentsC + '&othersCheckD=' + formData.othersCheckD + '&othersCommentsD=' + formData.othersCommentsD + '&othersCheckE=' + formData.othersCheckE + '&othersCommentsE=' + formData.othersCommentsE + '&othersCheckF=' + formData.othersCheckF + '&othersCommentsF=' + formData.othersCommentsF + '&cid=' + $routeParams.cid + '&yellowflag=' + $scope.yellowflag + '&redflag=' + $scope.redflag + '&staff=' + $rootScope.name).success(function (data) {
              
                                        //successfully submit
       $rootScope.startAlert('success', 'Success', 'Well done! You have successfully submitted a new compliance form.', 'md md-done');
               addComplianceTPL.toggle(); 


            });

        };
        
        
        
    }

	};
	
	
//list compliance
	getComplianceList();
    function getComplianceList() {
        $http.get('/getComplianceList?cid=' + $routeParams.cid).success(function (data) {
            $scope.clist = data;
			if(data.length == 0)
				{
					var nocompliance = angular.element(document.querySelector('#nocompliance'));
//					nocompliance.empty();
					nocompliance.append('<h5>There is no compliance submission for this customer yet.</h5>');
				}
                   
        });  
    };
	
	
//compliance details
	var ComplianceDetailsTPL = $aside({
        scope: $scope,
        template: '../bookings/ComplianceDetailsTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-right'
    });
	
	$scope.showComplianceDetails = function (qid) {
		$scope.qidNow = qid;
    	ComplianceDetailsTPL.show();
		getComplianceDetails();	
    };
    
	  
	
    function getComplianceDetails() {
        $http.get('/getComplianceDetails?qid=' + $scope.qidNow).success(function (data) {
            $scope.date = data[0].date;
            $scope.redflagNO = data[0].redflag;
            $scope.yellowflagNO = data[0].yellowflag;

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
	
	
//resume tab above
//******************************************************************************************************************************************
//******************************************************************************************************************************************	
    

    function findResumeProfile(e) {
        $http.get('/findResumeProfile?email=' + e).success(function (data) {
		

            console.log('resume data is', data[0]);
			if (data.length == 1)
				{
					$scope.hideEmptyResume = false;
			$scope.form = data[0];
           	console.log('test photo url here', data[0].photo_url);
            $scope.src = '/' + data[0].photo_url;
            
            //check if file exist locally first, get url response here, success and status 200 if correct url, or error and status 404
            $http.get($scope.src).success(function (data, status) {
                console.log('ac', status);
                
            })
            .error(function(data, status) {
                console.log('bc', status);
                $scope.src = 'http://globalworkandtravel.com/resume/uploads/' + $scope.form.photo_url;
                console.log('test photo url here', $scope.src);
            });
			
			
//action status check
			if ($scope.form.action == 'complete')
				{
					$scope.action = 'complete';
				}else
					{
						$scope.action = 'incomplete';
					}
            $scope.actionChange = function() {
                
				console.log($scope.action);
				$http.post('/updateAction?rid=' + $scope.form.r_id + '&action=' + $scope.action).success(function (returnDate) {
                        console.log('action status updated'); 
						$scope.form.modified_date = 'just now';
                      });
				
            };			
           
                //render boxes of html                        
                var myintroduce = angular.element(document.querySelector('#myintroduce'));
                myintroduce.append($scope.form.introduce);
                var myobjective = angular.element(document.querySelector('#myobjective'));
                myobjective.append($scope.form.objective);
                var myskill1 = angular.element(document.querySelector('#myskill1'));
                myskill1.append($scope.form.skill1);
                var mycertificate = angular.element(document.querySelector('#mycertificate'));
                mycertificate.append($scope.form.certificate);
                var mylicense = angular.element(document.querySelector('#mylicense'));
                mylicense.append($scope.form.license);
                var myduty1 = angular.element(document.querySelector('#myduty1'));
                myduty1.append($scope.form.duty1);
                var myduty2 = angular.element(document.querySelector('#myduty2'));
                myduty2.append($scope.form.duty2);
                var myduty3 = angular.element(document.querySelector('#myduty3'));
                myduty3.append($scope.form.duty3);
                var myduty4 = angular.element(document.querySelector('#myduty4'));
                myduty4.append($scope.form.duty4);
                var myduty5 = angular.element(document.querySelector('#myduty5'));
                myduty5.append($scope.form.duty5);
            
            
            
            
            //edit image
            $scope.viewIMG = {
//                editableValue: $scope.src,
                editorEnabled: false
            };

            $scope.enableEditorIMG = function() {
                $scope.viewIMG.editorEnabled = true;
//                $scope.viewIMG.editableValue = $scope.src;
            };

            $scope.disableEditorIMG = function() {
                $scope.viewIMG.editorEnabled = false;
//                $scope.src = 'http://globalworkandtravel.com/resume/uploads/' + data[0].photo_url;
            };

            $scope.saveIMG = function(upload_form) {
//                $scope.src = 'http://globalworkandtravel.com/resume/uploads/' + data[0].photo_url;
                
                $scope.disableEditorIMG();
                console.log('avc test');
                var col = 'photo_url';
                var element = 'abctest';
//                update(col, element);
             
                //upload
            if (upload_form.file.$valid && $scope.file) { //check if from is valid
                console.log('hello ');
                upload($scope.file); //call upload function
            }
                           
            function upload(file) {
                console.log('upload test here');
            Upload.upload({
                url: '/uploadpicture', //webAPI exposed to upload the file, different in server, need to change later
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
               console.log('test response after upload', resp.data.error_code);
                if(resp.data.error_code === 1){ //validate success
                   
                     $window.alert('an error occured');
                } else {
//                    $window.alert('Success ' + resp.config.data.file.name + ' uploaded. Response: ');
                    console.log(resp.data.filename);
                    
                    $http.post('/savefilename?fn=' + resp.data.filename + '&rid=' + $scope.form.r_id).success(function (data) {
                        console.log('updated file into database successfully');
						$scope.form.modified_date = 'just now';
                        $scope.src = '/' + resp.data.filename;//need to change in server using
                    });
                            
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) { 
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });            
        };   
                
                
            };
               
            //edit contact
            $scope.enableEditorContact = function() {
                $scope.view.editorEnabled = true;
                $scope.view.editableValue = $scope.form.fname;
                
                $scope.view2.editorEnabled = true;
                $scope.view2.editableValue = $scope.form.mname;
                
                $scope.view3.editorEnabled = true;
                $scope.view3.editableValue = $scope.form.lname;
                
                $scope.view4.editorEnabled = true;
                $scope.view4.editableValue = $scope.form.email;
                
                $scope.view5.editorEnabled = true;
                $scope.view5.editableValue = $scope.form.phoneno;
                
                $scope.view6.editorEnabled = true;
                $scope.view6.editableValue = $scope.form.skype;
            };
            
                        //edit education
            $scope.enableEditorEducation1 = function() {
               $scope.view10.editorEnabled = true;
                $scope.view10.editableValue = $scope.form.title1;
                $scope.view11.editorEnabled = true;
                $scope.view11.editableValue = $scope.form.institution1;
                $scope.view12.editorEnabled = true;
                $scope.view12.editableValue = $scope.form.educationfrom1;
                 $scope.view13.editorEnabled = true;
                $scope.view13.editableValue = $scope.form.educationto1;
            };
            
            $scope.enableEditorEducation2 = function() {
               $scope.view14.editorEnabled = true;
                $scope.view14.editableValue = $scope.form.title2;
                $scope.view15.editorEnabled = true;
                $scope.view15.editableValue = $scope.form.institution2;
                $scope.view16.editorEnabled = true;
                $scope.view16.editableValue = $scope.form.educationfrom2;
                 $scope.view17.editorEnabled = true;
                $scope.view17.editableValue = $scope.form.educationto2;
            };
            
            $scope.enableEditorEducation3 = function() {
               $scope.view18.editorEnabled = true;
                $scope.view18.editableValue = $scope.form.title3;
                $scope.view19.editorEnabled = true;
                $scope.view19.editableValue = $scope.form.institution3;
                $scope.view20.editorEnabled = true;
                $scope.view20.editableValue = $scope.form.educationfrom3;
                 $scope.view21.editorEnabled = true;
                $scope.view21.editableValue = $scope.form.educationto3;
            };
            

            //edit employment
            $scope.enableEditorEmployment1 = function() {
                $scope.view24.editorEnabled = true;
                $scope.view24.editableValue = $scope.form.jtitle1;
                
                $scope.view25.editorEnabled = true;
                $scope.view25.editableValue = $scope.form.cname1;
                
                $scope.view26.editorEnabled = true;
                $scope.view26.editableValue = $scope.form.cwebsite1;
                
                $scope.view27.editorEnabled = true;
                $scope.view27.editableValue = $scope.form.jfrom1;
                
                $scope.view28.editorEnabled = true;
                $scope.view28.editableValue = $scope.form.jto1;
                
                $scope.view29.editorEnabled = true;
                $scope.view29.editableValue = $scope.form.duty1;
            };
            
            $scope.enableEditorEmployment2 = function() {
                $scope.view30.editorEnabled = true;
                $scope.view30.editableValue = $scope.form.jtitle2;
                
                $scope.view31.editorEnabled = true;
                $scope.view31.editableValue = $scope.form.cname2;
                
                $scope.view32.editorEnabled = true;
                $scope.view32.editableValue = $scope.form.cwebsite2;
                
                $scope.view33.editorEnabled = true;
                $scope.view33.editableValue = $scope.form.jfrom2;
                
                $scope.view34.editorEnabled = true;
                $scope.view34.editableValue = $scope.form.jto2;
                
                $scope.view35.editorEnabled = true;
                $scope.view35.editableValue = $scope.form.duty2;
            };
            
              $scope.enableEditorEmployment3 = function() {
                $scope.view36.editorEnabled = true;
                $scope.view36.editableValue = $scope.form.jtitle3;
                
                $scope.view37.editorEnabled = true;
                $scope.view37.editableValue = $scope.form.cname3;
                
                $scope.view38.editorEnabled = true;
                $scope.view38.editableValue = $scope.form.cwebsite3;
                
                $scope.view39.editorEnabled = true;
                $scope.view39.editableValue = $scope.form.jfrom3;
                
                $scope.view40.editorEnabled = true;
                $scope.view40.editableValue = $scope.form.jto3;
                
                $scope.view41.editorEnabled = true;
                $scope.view41.editableValue = $scope.form.duty3;
            };
            
           $scope.enableEditorEmployment4 = function() {
                $scope.view42.editorEnabled = true;
                $scope.view42.editableValue = $scope.form.jtitle4;
                
                $scope.view43.editorEnabled = true;
                $scope.view43.editableValue = $scope.form.cname4;
                
                $scope.view44.editorEnabled = true;
                $scope.view44.editableValue = $scope.form.cwebsite4;
                
                $scope.view45.editorEnabled = true;
                $scope.view45.editableValue = $scope.form.jfrom4;
                
                $scope.view46.editorEnabled = true;
                $scope.view46.editableValue = $scope.form.jto4;
                
                $scope.view47.editorEnabled = true;
                $scope.view47.editableValue = $scope.form.duty4;
            };
            
              $scope.enableEditorEmployment5 = function() {
                $scope.view48.editorEnabled = true;
                $scope.view48.editableValue = $scope.form.jtitle5;
                
                $scope.view49.editorEnabled = true;
                $scope.view49.editableValue = $scope.form.cname5;
                
                $scope.view50.editorEnabled = true;
                $scope.view50.editableValue = $scope.form.cwebsite5;
                
                $scope.view51.editorEnabled = true;
                $scope.view51.editableValue = $scope.form.jfrom5;
                
                $scope.view52.editorEnabled = true;
                $scope.view52.editableValue = $scope.form.jto5;
                
                $scope.view53.editorEnabled = true;
                $scope.view53.editableValue = $scope.form.duty5;
            };
            
            
            //cancel contact
            $scope.cancelallcontact = function() {
                    $scope.view.editorEnabled = false;
                    $scope.view2.editorEnabled = false;
                    $scope.view3.editorEnabled = false;
                    $scope.view4.editorEnabled = false;
                    $scope.view5.editorEnabled = false;
                    $scope.view6.editorEnabled = false;
            };
            
             //cancel education
            $scope.cancelalleducation1 = function() {
                    $scope.view10.editorEnabled = false;
                    $scope.view11.editorEnabled = false;
                    $scope.view12.editorEnabled = false;
                    $scope.view13.editorEnabled = false;
            };
            
            if(($scope.form.title2) || ($scope.form.institution2) || ($scope.form.educationfrom2) || ($scope.form.educationto2))
                {
                    $scope.cancelalleducation2 = function() {
                        $scope.view14.editorEnabled = false;
                        $scope.view15.editorEnabled = false;
                        $scope.view16.editorEnabled = false;
                        $scope.view17.editorEnabled = false;
                        console.log($scope.form.institution2, 'why');
                    };
                }else
                    {
                        $scope.cancelalleducation2 = function() {
                            $scope.hideEducation2 = true;
                        };
                    }
            
            if(($scope.form.title3) || ($scope.form.institution3) || ($scope.form.educationfrom3) || ($scope.form.educationto3))
                {
                    $scope.cancelalleducation3 = function() {
                        $scope.view18.editorEnabled = false;
                        $scope.view19.editorEnabled = false;
                        $scope.view20.editorEnabled = false;
                        $scope.view21.editorEnabled = false;
                    };
                }else
                    {
                        $scope.cancelalleducation3 = function() {
                            $scope.hideEducation3 = true;
                        };
                    }
            
            //cancel employment
            $scope.cancelallemployment1 = function() {
                $scope.view24.editorEnabled = false;
                $scope.view25.editorEnabled = false;
                $scope.view26.editorEnabled = false;
                $scope.view27.editorEnabled = false;
                $scope.view28.editorEnabled = false;
                $scope.view29.editorEnabled = false;
                    
            };
            
            if (($scope.form.jtitle2) || ($scope.form.cname2) || ($scope.form.cwebsite2) || ($scope.form.jfrom2) || ($scope.form.jto2) || ($scope.form.duty2))
                {
                    $scope.cancelallemployment2 = function() {
                        $scope.view30.editorEnabled = false;
                        $scope.view31.editorEnabled = false;
                        $scope.view32.editorEnabled = false;
                        $scope.view33.editorEnabled = false;
                        $scope.view34.editorEnabled = false;
                        $scope.view35.editorEnabled = false;
                        
                    };
                }else
                    {
                        $scope.cancelallemployment2 = function() {
                            $scope.hideEmployment2 = true;
                        };
                    }
            
                        if (($scope.form.jtitle3) || ($scope.form.cname3) || ($scope.form.cwebsite3) || ($scope.form.jfrom3) || ($scope.form.jto3) || ($scope.form.duty3))
                {
                    $scope.cancelallemployment3 = function() {
                        $scope.view36.editorEnabled = false;
                        $scope.view37.editorEnabled = false;
                        $scope.view38.editorEnabled = false;
                        $scope.view39.editorEnabled = false;
                        $scope.view40.editorEnabled = false;
                        $scope.view41.editorEnabled = false;
                        
                    };
                }else
                    {
                        $scope.cancelallemployment3 = function() {
                            $scope.hideEmployment3 = true;
                        };
                    }
            
                        if (($scope.form.jtitle4) || ($scope.form.cname4) || ($scope.form.cwebsite4) || ($scope.form.jfrom4) || ($scope.form.jto4) || ($scope.form.duty4))
                {
                    $scope.cancelallemployment4 = function() {
                        $scope.view42.editorEnabled = false;
                        $scope.view43.editorEnabled = false;
                        $scope.view44.editorEnabled = false;
                        $scope.view45.editorEnabled = false;
                        $scope.view46.editorEnabled = false;
                        $scope.view47.editorEnabled = false;
                        
                    };
                }else
                    {
                        $scope.cancelallemployment4 = function() {
                            $scope.hideEmployment4 = true;
                        };
                    }
            
                        if (($scope.form.jtitle5) || ($scope.form.cname5) || ($scope.form.cwebsite5) || ($scope.form.jfrom5) || ($scope.form.jto5) || ($scope.form.duty5))
                {
                    $scope.cancelallemployment5 = function() {
                        $scope.view48.editorEnabled = false;
                        $scope.view49.editorEnabled = false;
                        $scope.view50.editorEnabled = false;
                        $scope.view51.editorEnabled = false;
                        $scope.view52.editorEnabled = false;
                        $scope.view53.editorEnabled = false;
                        
                    };
                }else
                    {
                        $scope.cancelallemployment5 = function() {
                            $scope.hideEmployment5 = true;
                        };
                    }
            

            
            //education2
            if((data[0].title2) || (data[0].institution2) || (data[0].educationfrom2) || (data[0].educationto2))
                {
                    $scope.hideEducation2 = false;
                    $scope.showEditorEducation2 = true;
                    $scope.hidewhenadd2 = false;
                }
            else
                {
                    $scope.hideEducation2 = true;
                    $scope.showEditorEducation2 = false;
                     $scope.hidewhenadd2 = true;//hide small and separately save and cancel buttons
                }
            
                $scope.saveallEducation2 = function() {
                                
                    $scope.form.title2 = $scope.view14.editableValue;
                $scope.disableEditor14();
                var cola = 'title2';
                var elementa = $scope.form.title2;
                update(cola, elementa);
                    
                 $scope.form.institution2 = $scope.view15.editableValue;
                $scope.disableEditor15();
                var colb = 'institution2';
                var elementb = $scope.form.institution2;
                update(colb, elementb);
                    
                $scope.form.educationfrom2 = $scope.view16.editableValue;
                $scope.disableEditor16();
                var colc = 'educationfrom2';
                var elementc = $scope.form.educationfrom2;
                elementc = formatdate(elementc);
                update(colc, elementc);     
                
                $scope.form.educationto2 = $scope.view17.editableValue;
                $scope.disableEditor17();
                var cold = 'educationto2';
                var elementd = $scope.form.educationto2;
                elementd = formatdate(elementd);
                update(cold, elementd);
            };
            
            //education3
            if((data[0].title3) || (data[0].institution3) || (data[0].educationfrom3) || (data[0].educationto3))
                {
                    $scope.hideEducation3 = false;
                    $scope.showEditorEducation3 = true;
                    $scope.hidewhenadd3 = false;
                }
            else
                {
                    $scope.hideEducation3 = true;
                    $scope.showEditorEducation3 = false;
                     $scope.hidewhenadd3 = true;
                }
            
            $scope.saveallEducation3 = function() {
                 $scope.form.title3 = $scope.view18.editableValue;
                $scope.disableEditor18();
                var cola = 'title3';
                var elementa = $scope.form.title3;
                update(cola, elementa);
                    
                 $scope.form.institution3 = $scope.view19.editableValue;
                $scope.disableEditor19();
                var colb = 'institution3';
                var elementb = $scope.form.institution3;
                update(colb, elementb);
                    
                $scope.form.educationfrom3 = $scope.view20.editableValue;
                $scope.disableEditor20();
                var colc = 'educationfrom3';
                var elementc = $scope.form.educationfrom3;
                elementc = formatdate(elementc);
                update(colc, elementc);     
                
                $scope.form.educationto3 = $scope.view21.editableValue;
                $scope.disableEditor21();
                var cold = 'educationto3';
                var elementd = $scope.form.educationto3;
                elementd = formatdate(elementd);
                update(cold, elementd);
                
            };
            
           //employment2
            if((data[0].jtitle2) || (data[0].cname2) || (data[0].cwebsite2) || (data[0].jfrom2) || (data[0].jto2) || (data[0].duty2))
                {
                    $scope.hideEmployment2 = false;
                    $scope.showEditorEmployment2 = true;
                    $scope.hidewhenaddemployment2 = false;
                }
            else
                {
                    $scope.hideEmployment2 = true;
                    $scope.showEditorEmployment2 = false;
                     $scope.hidewhenaddemployment2 = true;//hide small and separately save and cancel buttons
                }
            
                $scope.saveallEmployment2 = function() {
                        $scope.form.jtitle2 = $scope.view30.editableValue;
                        $scope.disableEditor30();
                        var cola = 'jtitle2';
                        var elementa = $scope.form.jtitle2;
                        update(cola, elementa);  
                
                $scope.form.cname2 = $scope.view31.editableValue;
                $scope.disableEditor31();
                var colb = 'cname2';
                var elementb = $scope.form.cname2;
                update(colb, elementb);
                    
                $scope.form.cwebsite2 = $scope.view32.editableValue;
                $scope.disableEditor32();
                var colc = 'cwebsite2';
                var elementc = $scope.form.cwebsite2;
                update(colc, elementc);
                    
                $scope.form.jfrom2 = $scope.view33.editableValue;
                $scope.disableEditor33();
                var cold = 'jfrom2';
                var elementd = $scope.form.jfrom2;
                elementd = formatdate(elementd);
                update(cold, elementd);
                    
                $scope.form.jto2 = $scope.view34.editableValue;
                $scope.disableEditor34();
                var cole = 'jto2';
                var elemente = $scope.form.jto2;
                elemente = formatdate(elemente);
                update(cole, elemente);
                    
                 $scope.form.duty2 = $scope.view35.editableValue;
                $scope.disableEditor35();
                var colf = 'duty2';
                var elementf = $scope.form.duty2;
                update(colf, elementf);
                
                var myduty2 = angular.element(document.querySelector('#myduty2'));
                myduty2.empty(); //empty div first
                myduty2.append($scope.form.duty2);
            };
            
            //employment3
            if((data[0].jtitle3) || (data[0].cname3) || (data[0].cwebsite3) || (data[0].jfrom3) || (data[0].jto3) || (data[0].duty3))
                {
                    $scope.hideEmployment3 = false;
                    $scope.showEditorEmployment3 = true;
                    $scope.hidewhenaddemployment3 = false;
                }
            else
                {
                    $scope.hideEmployment3 = true;
                    $scope.showEditorEmployment3 = false;
                     $scope.hidewhenaddemployment3 = true;//hide small and separately save and cancel buttons
                }
            
                $scope.saveallEmployment3 = function() {
                        
                    $scope.form.jtitle3 = $scope.view36.editableValue;
                        $scope.disableEditor36();
                        var cola = 'jtitle3';
                        var elementa = $scope.form.jtitle3;
                        update(cola, elementa);  
                
                $scope.form.cname3 = $scope.view37.editableValue;
                $scope.disableEditor37();
                var colb = 'cname3';
                var elementb = $scope.form.cname3;
                update(colb, elementb);
                    
                $scope.form.cwebsite3 = $scope.view38.editableValue;
                $scope.disableEditor38();
                var colc = 'cwebsite3';
                var elementc = $scope.form.cwebsite3;
                update(colc, elementc);
                    
                $scope.form.jfrom3 = $scope.view39.editableValue;
                $scope.disableEditor39();
                var cold = 'jfrom3';
                var elementd = $scope.form.jfrom3;
                elementd = formatdate(elementd);
                update(cold, elementd);
                    
                $scope.form.jto3 = $scope.view40.editableValue;
                $scope.disableEditor40();
                var cole = 'jto3';
                var elemente = $scope.form.jto3;
                elemente = formatdate(elemente);
                update(cole, elemente);
                    
                 $scope.form.duty3 = $scope.view41.editableValue;
                $scope.disableEditor41();
                var colf = 'duty3';
                var elementf = $scope.form.duty3;
                update(colf, elementf);
                
                var myduty3 = angular.element(document.querySelector('#myduty3'));
                myduty3.empty(); //empty div first
                myduty3.append($scope.form.duty3);      
                    
            };
            
            
            //employment4
            if((data[0].jtitle4) || (data[0].cname4) || (data[0].cwebsite4) || (data[0].jfrom4) || (data[0].jto4) || (data[0].duty4))
                {
                    $scope.hideEmployment4 = false;
                    $scope.showEditorEmployment4 = true;
                    $scope.hidewhenaddemployment4 = false;
                }
            else
                {
                    $scope.hideEmployment4 = true;
                    $scope.showEditorEmployment4 = false;
                     $scope.hidewhenaddemployment4 = true;//hide small and separately save and cancel buttons
                }
            
                $scope.saveallEmployment4 = function() {
                        $scope.form.jtitle4 = $scope.view42.editableValue;
                        $scope.disableEditor42();
                        var cola = 'jtitle4';
                        var elementa = $scope.form.jtitle4;
                        update(cola, elementa);  
                
                $scope.form.cname4 = $scope.view43.editableValue;
                $scope.disableEditor43();
                var colb = 'cname4';
                var elementb = $scope.form.cname4;
                update(colb, elementb);
                    
                $scope.form.cwebsite4 = $scope.view44.editableValue;
                $scope.disableEditor44();
                var colc = 'cwebsite4';
                var elementc = $scope.form.cwebsite4;
                update(colc, elementc);
                    
                $scope.form.jfrom4 = $scope.view45.editableValue;
                $scope.disableEditor45();
                var cold = 'jfrom4';
                var elementd = $scope.form.jfrom4;
                elementd = formatdate(elementd);
                update(cold, elementd);
                    
                $scope.form.jto4 = $scope.view46.editableValue;
                $scope.disableEditor46();
                var cole = 'jto4';
                var elemente = $scope.form.jto4;
                elemente = formatdate(elemente);
                update(cole, elemente);
                    
                 $scope.form.duty4 = $scope.view47.editableValue;
                $scope.disableEditor47();
                var colf = 'duty4';
                var elementf = $scope.form.duty4;
                update(colf, elementf);
                
                var myduty4 = angular.element(document.querySelector('#myduty4'));
                myduty4.empty(); //empty div first
                myduty4.append($scope.form.duty4);           
                    
            };
            
            //employment5
            if((data[0].jtitle5) || (data[0].cname5) || (data[0].cwebsite5) || (data[0].jfrom5) || (data[0].jto5) || (data[0].duty5))
                {
                    $scope.hideEmployment5 = false;
                    $scope.showEditorEmployment5 = true;
                    $scope.hidewhenaddemployment5 = false;
                }
            else
                {
                    $scope.hideEmployment5 = true;
                    $scope.showEditorEmployment5 = false;
                     $scope.hidewhenaddemployment5 = true;//hide small and separately save and cancel buttons
                }
            
                $scope.saveallEmployment5 = function() {
                        $scope.form.jtitle5 = $scope.view48.editableValue;
                        $scope.disableEditor48();
                        var cola = 'jtitle5';
                        var elementa = $scope.form.jtitle5;
                        update(cola, elementa);  
                
                $scope.form.cname5 = $scope.view49.editableValue;
                $scope.disableEditor49();
                var colb = 'cname5';
                var elementb = $scope.form.cname5;
                update(colb, elementb);
                    
                $scope.form.cwebsite5 = $scope.view50.editableValue;
                $scope.disableEditor50();
                var colc = 'cwebsite5';
                var elementc = $scope.form.cwebsite5;
                update(colc, elementc);
                    
                $scope.form.jfrom5 = $scope.view51.editableValue;
                $scope.disableEditor51();
                var cold = 'jfrom5';
                var elementd = $scope.form.jfrom5;
                elementd = formatdate(elementd);
                update(cold, elementd);
                    
                $scope.form.jto5 = $scope.view52.editableValue;
                $scope.disableEditor52();
                var cole = 'jto5';
                var elemente = $scope.form.jto5;
                elemente = formatdate(elemente);
                update(cole, elemente);
                    
                 $scope.form.duty5 = $scope.view53.editableValue;
                $scope.disableEditor53();
                var colf = 'duty5';
                var elementf = $scope.form.duty5;
                update(colf, elementf);
                
                var myduty5 = angular.element(document.querySelector('#myduty5'));
                myduty5.empty(); //empty div first
                myduty5.append($scope.form.duty5);           
                     
                  
            };

            $scope.addoneEducation = function() {
                if ($scope.hideEducation2 == true)
                    {
                        $scope.hideEducation2 = false;
                        
                            $scope.view14.editorEnabled = true;
                            $scope.view14.editableValue = $scope.form.title2;
                            $scope.view15.editorEnabled = true;
                            $scope.view15.editableValue = $scope.form.institution2;
                            $scope.view16.editorEnabled = true;
                            $scope.view16.editableValue = $scope.form.educationfrom2;
                            $scope.view17.editorEnabled = true;
                            $scope.view17.editableValue = $scope.form.educationto2;
                        
                    }else if ($scope.hideEducation3 == true)
                        {
                            $scope.hideEducation3 = false;
                            
                            $scope.view18.editorEnabled = true;
                            $scope.view18.editableValue = $scope.form.title3;
                            $scope.view19.editorEnabled = true;
                            $scope.view19.editableValue = $scope.form.institution3;
                            $scope.view20.editorEnabled = true;
                            $scope.view20.editableValue = $scope.form.educationfrom3;
                            $scope.view21.editorEnabled = true;
                            $scope.view21.editableValue = $scope.form.educationto3;
                        }else
                            {
                                console.log('mate, 3 education is enough here');
                            }
            };
            
                $scope.addoneEmployment = function() {
                if ($scope.hideEmployment2 == true)
                    {
                        $scope.hideEmployment2 = false;
                        
                            $scope.view30.editorEnabled = true;
                            $scope.view30.editableValue = $scope.form.jtitle2;
                            $scope.view31.editorEnabled = true;
                            $scope.view31.editableValue = $scope.form.cname2;
                            $scope.view32.editorEnabled = true;
                            $scope.view32.editableValue = $scope.form.cwebsite2;
                            $scope.view33.editorEnabled = true;
                            $scope.view33.editableValue = $scope.form.jfrom2;
                            $scope.view34.editorEnabled = true;
                            $scope.view34.editableValue = $scope.form.jto2;
                            $scope.view35.editorEnabled = true;
                            $scope.view35.editableValue = $scope.form.duty2;
                        
                        
                    }else if ($scope.hideEmployment3 == true)
                        {
                            $scope.hideEmployment3 = false;
                        
                            $scope.view36.editorEnabled = true;
                            $scope.view36.editableValue = $scope.form.jtitle3;
                            $scope.view37.editorEnabled = true;
                            $scope.view37.editableValue = $scope.form.cname3;
                            $scope.view38.editorEnabled = true;
                            $scope.view38.editableValue = $scope.form.cwebsite3;
                            $scope.view39.editorEnabled = true;
                            $scope.view39.editableValue = $scope.form.jfrom3;
                            $scope.view40.editorEnabled = true;
                            $scope.view40.editableValue = $scope.form.jto3;
                            $scope.view41.editorEnabled = true;
                            $scope.view41.editableValue = $scope.form.duty3;
                            
                        }else if ($scope.hideEmployment4 == true)
                            {
                                $scope.hideEmployment4 = false;
                            
                            $scope.view42.editorEnabled = true;
                            $scope.view42.editableValue = $scope.form.jtitle4;
                            $scope.view43.editorEnabled = true;
                            $scope.view43.editableValue = $scope.form.cname4;
                            $scope.view44.editorEnabled = true;
                            $scope.view44.editableValue = $scope.form.cwebsite4;
                            $scope.view45.editorEnabled = true;
                            $scope.view45.editableValue = $scope.form.jfrom4;
                            $scope.view46.editorEnabled = true;
                            $scope.view46.editableValue = $scope.form.jto4;
                            $scope.view47.editorEnabled = true;
                            $scope.view47.editableValue = $scope.form.duty4;
                                
                            }else if ($scope.hideEmployment5 == true)
                                {
                                    $scope.hideEmployment5 = false;
                            
                             $scope.view48.editorEnabled = true;
                            $scope.view48.editableValue = $scope.form.jtitle5;
                            $scope.view49.editorEnabled = true;
                            $scope.view49.editableValue = $scope.form.cname5
                            $scope.view50.editorEnabled = true;
                            $scope.view50.editableValue = $scope.form.cwebsite5;
                            $scope.view51.editorEnabled = true;
                            $scope.view51.editableValue = $scope.form.jfrom5;
                            $scope.view52.editorEnabled = true;
                            $scope.view52.editableValue = $scope.form.jto5;
                            $scope.view53.editorEnabled = true;
                            $scope.view53.editableValue = $scope.form.duty5;
                                    
                                }
                            
            };
            
            //edit text
            $scope.view = {
                editableValue: $scope.form.fname,
                editorEnabled: false
            };

            $scope.disableEditor = function() {
                $scope.view.editorEnabled = false;
            };

            $scope.save = function() {
                $scope.form.fname = $scope.view.editableValue;
                $scope.disableEditor();
                console.log('avc test');
                var col = 'fname';
                var element = $scope.form.fname;
                update(col, element);

            };
            
            //edit text2
            $scope.view2 = {
                editableValue: $scope.form.mname,
                editorEnabled: false
            };

            $scope.disableEditor2 = function() {
                $scope.view2.editorEnabled = false;
            };

            $scope.save2 = function() {
                $scope.form.mname = $scope.view2.editableValue;
                $scope.disableEditor2();
                console.log('avc test');
                var col = 'mname';
                var element = $scope.form.mname;
                update(col, element);

            };

            //edit text3
            $scope.view3 = {
                editableValue: $scope.form.lname,
                editorEnabled: false
            };

            $scope.disableEditor3 = function() {
                $scope.view3.editorEnabled = false;
            };

            $scope.save3 = function() {
                $scope.form.lname = $scope.view3.editableValue;
                $scope.disableEditor3();
                console.log('avc test');
                var col = 'lname';
                var element = $scope.form.lname;
                update(col, element);

            };
          
            //edit text4
            $scope.view4 = {
                editableValue: $scope.form.email,
                editorEnabled: false
            };

            $scope.disableEditor4 = function() {
                $scope.view4.editorEnabled = false;
            };

            $scope.save4 = function() {
                $scope.form.email = $scope.view4.editableValue;
                $scope.disableEditor4();
                console.log('avc test');
                var col = 'email';
                var element = $scope.form.email;
                update(col, element);

            };
            
            //edit text5
            $scope.view5 = {
                editableValue: $scope.form.phoneno,
                editorEnabled: false
            };

            $scope.disableEditor5 = function() {
                $scope.view5.editorEnabled = false;
            };

            $scope.save5 = function() {
                $scope.form.phoneno = $scope.view5.editableValue;
                $scope.disableEditor5();
                console.log('avc test');
                var col = 'phoneno';
                var element = $scope.form.phoneno;
                update(col, element);

            };
        
            //edit text6
            $scope.view6 = {
                editableValue: $scope.form.skype,
                editorEnabled: false
            };

            $scope.disableEditor6 = function() {
                $scope.view6.editorEnabled = false;
            };

            $scope.save6 = function() {
                $scope.form.skype = $scope.view6.editableValue;
                $scope.disableEditor6();
                console.log('avc test');
                var col = 'skype';
                var element = $scope.form.skype;
                update(col, element);

            };

            //edit text7
            $scope.view7 = {
                editableValue: $scope.form.introduce,
                editorEnabled: false
            };

            $scope.enableEditor7 = function() {
                $scope.view7.editorEnabled = true;
                $scope.view7.editableValue = $scope.form.introduce;
            };

            $scope.disableEditor7 = function() {
                $scope.view7.editorEnabled = false;
            };

            $scope.save7 = function() {
                $scope.form.introduce =  $scope.view7.editableValue;              
                
                console.log($scope.view7.editableValue);
                $scope.disableEditor7();
                console.log('avc test');
                var col = 'introduce';
                var element = $scope.form.introduce;
                update(col, element);
                
                var myintroduce = angular.element(document.querySelector('#myintroduce'));
                myintroduce.empty(); //empty div first
                myintroduce.append($scope.form.introduce);
            

            };
            
            //edit text8
            $scope.view8 = {
                editableValue: $scope.form.objective,
                editorEnabled: false
            };

            $scope.enableEditor8 = function() {
                $scope.view8.editorEnabled = true;
                $scope.view8.editableValue = $scope.form.objective;
            };

            $scope.disableEditor8 = function() {
                $scope.view8.editorEnabled = false;
            };

            $scope.save8 = function() {
                $scope.form.objective = $scope.view8.editableValue;
                $scope.disableEditor8();
                console.log('avc test');
                var col = 'objective';
                var element = $scope.form.objective;
                update(col, element);
                var myobjective = angular.element(document.querySelector('#myobjective'));
                myobjective.empty(); //empty div first
                myobjective.append($scope.form.objective);

            };
            
            //edit text9
            $scope.view9 = {
                editableValue: $scope.form.skill1,
                editorEnabled: false
            };

            $scope.enableEditor9 = function() {
                $scope.view9.editorEnabled = true;
                $scope.view9.editableValue = $scope.form.skill1;
            };

            $scope.disableEditor9 = function() {
                $scope.view9.editorEnabled = false;
            };

            $scope.save9 = function() {
                $scope.form.skill1 = $scope.view9.editableValue;
                $scope.disableEditor9();
                console.log('avc test');
                var col = 'skill1';
                var element = $scope.form.skill1;
                update(col, element);
                
                var myskill1 = angular.element(document.querySelector('#myskill1'));
                myskill1.empty(); //empty div first
                myskill1.append($scope.form.skill1);

            };
            
            //edit text10
            $scope.view10 = {
                editableValue: $scope.form.title1,
                editorEnabled: false
            };

            $scope.disableEditor10 = function() {
                $scope.view10.editorEnabled = false;
            };

            $scope.save10 = function() {
                $scope.form.title1 = $scope.view10.editableValue;
                $scope.disableEditor10();
                console.log('avc test');
                var col = 'title1';
                var element = $scope.form.title1;
                update(col, element);

            };
            
            //edit text11
            $scope.view11 = {
                editableValue: $scope.form.institution1,
                editorEnabled: false
            };

            $scope.disableEditor11 = function() {
                $scope.view11.editorEnabled = false;
            };

            $scope.save11 = function() {
                $scope.form.institution1 = $scope.view11.editableValue;
                $scope.disableEditor11();
                console.log('avc test');
                var col = 'institution1';
                var element = $scope.form.institution1;
                update(col, element);

            };
            
            //edit text12
            $scope.view12 = {
                editableValue: $scope.form.educationfrom1,
                editorEnabled: false
            };

            $scope.disableEditor12 = function() {
                $scope.view12.editorEnabled = false;
            };

            $scope.save12 = function() {
                $scope.form.educationfrom1 = $scope.view12.editableValue;
                $scope.disableEditor12();
                console.log('avc test');
                var col = 'educationfrom1';
                var element = $scope.form.educationfrom1;

                element = formatdate(element);
                
                console.log(element);
                update(col, element);

            };

            //edit text13
            $scope.view13 = {
                editableValue: $scope.form.educationto1,
                editorEnabled: false
            };

            $scope.disableEditor13 = function() {
                $scope.view13.editorEnabled = false;
            };

            $scope.save13 = function() {
                $scope.form.educationto1 = $scope.view13.editableValue;
                $scope.disableEditor13();
                console.log('avc test');
                var col = 'educationto1';
                var element = $scope.form.educationto1;

                element = formatdate(element);
                
                console.log(element);
                update(col, element);

            };

            //edit text14
            $scope.view14 = {
                editableValue: $scope.form.title2,
                editorEnabled: false
            };

            $scope.disableEditor14 = function() {
                $scope.view14.editorEnabled = false;
            };

            $scope.save14 = function() {
                $scope.form.title2 = $scope.view14.editableValue;
                $scope.disableEditor14();
                console.log('avc test');
                var col = 'title2';
                var element = $scope.form.title2;
                update(col, element);

            };
               
            
            //edit text15
            $scope.view15 = {
                editableValue: $scope.form.institution2,
                editorEnabled: false
            };

            $scope.disableEditor15 = function() {
                $scope.view15.editorEnabled = false;
            };

            $scope.save15 = function() {
                $scope.form.institution2 = $scope.view15.editableValue;
                $scope.disableEditor15();
                console.log('avc test');
                var col = 'institution2';
                var element = $scope.form.institution2;
                update(col, element);

            };

            
            //edit text16

            $scope.view16 = {
                editableValue: $scope.form.educationfrom2,
                editorEnabled: false
            };

            $scope.disableEditor16 = function() {
                $scope.view16.editorEnabled = false;
            };

            $scope.save16 = function() {
                $scope.form.educationfrom2 = $scope.view16.editableValue;
                $scope.disableEditor16();
                console.log('avc test');
                var col = 'educationfrom2';
                var element = $scope.form.educationfrom2;
                element = formatdate(element);
                update(col, element);

            };

            
            //edit text17
            $scope.view17 = {
                editableValue: $scope.form.educationto2,
                editorEnabled: false
            };

            $scope.disableEditor17 = function() {
                $scope.view17.editorEnabled = false;
            };

            $scope.save17 = function() {
                $scope.form.educationto2 = $scope.view17.editableValue;
                $scope.disableEditor17();
                console.log('avc test');
                var col = 'educationto2';
                var element = $scope.form.educationto2;
                element = formatdate(element);
                update(col, element);

            };


            
            //edit text18
            $scope.view18 = {
                editableValue: $scope.form.title3,
                editorEnabled: false
            };
                    
            $scope.disableEditor18 = function() {
                $scope.view18.editorEnabled = false;
            };

            $scope.save18 = function() {
                $scope.form.title3 = $scope.view18.editableValue;
                $scope.disableEditor18();
                console.log('avc test');
                var col = 'title3';
                var element = $scope.form.title3;
                update(col, element);

            };
                
            
            //edit text19

            $scope.view19 = {
                editableValue: $scope.form.institution3,
                editorEnabled: false
            };

            $scope.enableEditor19 = function() {
                $scope.view19.editorEnabled = true;
                $scope.view19.editableValue = $scope.form.institution3;
            };

            $scope.disableEditor19 = function() {
                $scope.view19.editorEnabled = false;
            };

            $scope.save19 = function() {
                $scope.form.institution3 = $scope.view19.editableValue;
                $scope.disableEditor19();
                console.log('avc test');
                var col = 'institution3';
                var element = $scope.form.institution3;
                update(col, element);

            };
            
            //edit text20
            $scope.view20 = {
                editableValue: $scope.form.educationfrom3,
                editorEnabled: false
            };

            $scope.enableEditor20 = function() {
                $scope.view20.editorEnabled = true;
                $scope.view20.editableValue = $scope.form.educationfrom3;
            };

            $scope.disableEditor20 = function() {
                $scope.view20.editorEnabled = false;
            };

            $scope.save20 = function() {
                $scope.form.educationfrom3 = $scope.view20.editableValue;
                $scope.disableEditor20();
                console.log('avc test');
                var col = 'educationfrom3';
                var element = $scope.form.educationfrom3;
                element = formatdate(element);
                update(col, element);

            };
               
            
            //edit text21
            $scope.view21 = {
                editableValue: $scope.form.educationto3,
                editorEnabled: false
            };

            $scope.enableEditor21 = function() {
                $scope.view21.editorEnabled = true;
                $scope.view21.editableValue = $scope.form.educationto3;
            };

            $scope.disableEditor21 = function() {
                $scope.view21.editorEnabled = false;
            };

            $scope.save21 = function() {
                $scope.form.educationto3 = $scope.view21.editableValue;
                $scope.disableEditor21();
                console.log('avc test');
                var col = 'educationto3';
                var element = $scope.form.educationto3;
                element = formatdate(element);
                update(col, element);

            };
            
            //edit text22

            $scope.view22 = {
                editableValue: $scope.form.certificate,
                editorEnabled: false
            };

            $scope.enableEditor22 = function() {
                $scope.view22.editorEnabled = true;
                $scope.view22.editableValue = $scope.form.certificate;
            };

            $scope.disableEditor22 = function() {
                $scope.view22.editorEnabled = false;
            };

            $scope.save22 = function() {
                $scope.form.certificate = $scope.view22.editableValue;
                $scope.disableEditor22();
                console.log('avc test');
                var col = 'certificate';
                var element = $scope.form.certificate;
                update(col, element);
                
                var mycertificate = angular.element(document.querySelector('#mycertificate'));
                mycertificate.empty(); //empty div first
                mycertificate.append($scope.form.certificate);

            };
            
            //edit text23
            $scope.view23 = {
                editableValue: $scope.form.license,
                editorEnabled: false
            };

            $scope.enableEditor23 = function() {
                $scope.view23.editorEnabled = true;
                $scope.view23.editableValue = $scope.form.license;
            };

            $scope.disableEditor23 = function() {
                $scope.view23.editorEnabled = false;
            };

            $scope.save23 = function() {
                $scope.form.license = $scope.view23.editableValue;
                $scope.disableEditor23();
                console.log('avc test');
                var col = 'license';
                var element = $scope.form.license;
                update(col, element);
                
                var mylicense = angular.element(document.querySelector('#mylicense'));
                mylicense.empty(); //empty div first
                mylicense.append($scope.form.license);
            };
            
            //edit text24
            $scope.view24 = {
                editableValue: $scope.form.jtitle1,
                editorEnabled: false
            };

            $scope.disableEditor24 = function() {
                $scope.view24.editorEnabled = false;
            };

            $scope.save24 = function() {
                $scope.form.jtitle1 = $scope.view24.editableValue;
                $scope.disableEditor24();
                console.log('avc test');
                var col = 'jtitle1';
                var element = $scope.form.jtitle1;
                update(col, element);

            };
           
            //edit text25
            $scope.view25 = {
                editableValue: $scope.form.cname1,
                editorEnabled: false
            };

            $scope.disableEditor25 = function() {
                $scope.view25.editorEnabled = false;
            };

            $scope.save25 = function() {
                $scope.form.cname1 = $scope.view25.editableValue;
                $scope.disableEditor25();
                console.log('avc test');
                var col = 'cname1';
                var element = $scope.form.cname1;
                update(col, element);

            };
            
            //edit text26
            $scope.view26 = {
                editableValue: $scope.form.cwebsite1,
                editorEnabled: false
            };

            $scope.disableEditor26 = function() {
                $scope.view26.editorEnabled = false;
            };

            $scope.save26 = function() {
                $scope.form.cwebsite1 = $scope.view26.editableValue;
                $scope.disableEditor26();
                console.log('avc test');
                var col = 'cwebsite1';
                var element = $scope.form.cwebsite1;
                update(col, element);

            };
            
            //edit text27
            $scope.view27 = {
                editableValue: $scope.form.jfrom1,
                editorEnabled: false
            };

            $scope.disableEditor27 = function() {
                $scope.view27.editorEnabled = false;
            };

            $scope.save27 = function() {
                $scope.form.jfrom1 = $scope.view27.editableValue;
                $scope.disableEditor27();
                console.log('avc test');
                var col = 'jfrom1';
                var element = $scope.form.jfrom1;
                element = formatdate(element);
                update(col, element);

            };
            
            //edit text28
            $scope.view28 = {
                editableValue: $scope.form.jto1,
                editorEnabled: false
            };

            $scope.disableEditor28 = function() {
                $scope.view28.editorEnabled = false;
            };

            $scope.save28 = function() {
                $scope.form.jto1 = $scope.view28.editableValue;
                $scope.disableEditor28();
                console.log('avc test');
                var col = 'jto1';
                var element = $scope.form.jto1;
                element = formatdate(element);
                update(col, element);

            };
            
            //edit text29
            $scope.view29 = {
                editableValue: $scope.form.duty1,
                editorEnabled: false
            };

            $scope.disableEditor29 = function() {
                $scope.view29.editorEnabled = false;
            };

            $scope.save29 = function() {
                $scope.form.duty1 = $scope.view29.editableValue;
                $scope.disableEditor29();
                console.log('avc test');
                var col = 'duty1';
                var element = $scope.form.duty1;
                update(col, element);
                
                var myduty1 = angular.element(document.querySelector('#myduty1'));
                myduty1.empty(); //empty div first
                myduty1.append($scope.form.duty1);

            };
            
             //edit text30
            $scope.view30 = {
                editableValue: $scope.form.jtitle2,
                editorEnabled: false
            };

            $scope.enableEditor30 = function() {
                $scope.view30.editorEnabled = true;
                $scope.view30.editableValue = $scope.form.jtitle2;
            };

            $scope.disableEditor30 = function() {
                $scope.view30.editorEnabled = false;
            };

            $scope.save30 = function() {
                $scope.form.jtitle2 = $scope.view30.editableValue;
                $scope.disableEditor30();
                console.log('avc test');
                var col = 'jtitle2';
                var element = $scope.form.jtitle2;
                update(col, element);

            };
            
           //edit text31

            $scope.view31 = {
                editableValue: $scope.form.cname2,
                editorEnabled: false
            };

            $scope.enableEditor31 = function() {
                $scope.view31.editorEnabled = true;
                $scope.view31.editableValue = $scope.form.cname2;
            };

            $scope.disableEditor31 = function() {
                $scope.view31.editorEnabled = false;
            };

            $scope.save31 = function() {
                $scope.form.cname2 = $scope.view31.editableValue;
                $scope.disableEditor31();
                console.log('avc test');
                var col = 'cname2';
                var element = $scope.form.cname2;
                update(col, element);

            };

            

                       
            //edit text32
            $scope.view32 = {
                editableValue: $scope.form.cwebsite2,
                editorEnabled: false
            };

            $scope.enableEditor32 = function() {
                $scope.view32.editorEnabled = true;
                $scope.view32.editableValue = $scope.form.cwebsite2;
            };

            $scope.disableEditor32 = function() {
                $scope.view32.editorEnabled = false;
            };

            $scope.save32 = function() {
                $scope.form.cwebsite2 = $scope.view32.editableValue;
                $scope.disableEditor32();
                console.log('avc test');
                var col = 'cwebsite2';
                var element = $scope.form.cwebsite2;
                update(col, element);

            };
            
    
            
            //edit text33
            $scope.view33 = {
                editableValue: $scope.form.jfrom2,
                editorEnabled: false
            };

            $scope.enableEditor33 = function() {
                $scope.view33.editorEnabled = true;
                $scope.view33.editableValue = $scope.form.jfrom2;
            };

            $scope.disableEditor33 = function() {
                $scope.view33.editorEnabled = false;
            };

            $scope.save33 = function() {
                $scope.form.jfrom2 = $scope.view33.editableValue;
                $scope.disableEditor33();
                console.log('avc test');
                var col = 'jfrom2';
                var element = $scope.form.jfrom2;
                element = formatdate(element);
                update(col, element);

            };
            
            //edit text34
            $scope.view34 = {
                editableValue: $scope.form.jto2,
                editorEnabled: false
            };

            $scope.enableEditor34 = function() {
                $scope.view34.editorEnabled = true;
                $scope.view34.editableValue = $scope.form.jto2;
            };

            $scope.disableEditor34 = function() {
                $scope.view34.editorEnabled = false;
            };

            $scope.save34 = function() {
                $scope.form.jto2 = $scope.view34.editableValue;
                $scope.disableEditor34();
                console.log('avc test');
                var col = 'jto2';
                var element = $scope.form.jto2;
                element = formatdate(element);
                update(col, element);

            };
            
                
            
            //edit text35

            $scope.view35 = {
                editableValue: $scope.form.duty2,
                editorEnabled: false
            };

            $scope.enableEditor35 = function() {
                $scope.view35.editorEnabled = true;
                $scope.view35.editableValue = $scope.form.duty2;
            };

            $scope.disableEditor35 = function() {
                $scope.view35.editorEnabled = false;
            };

            $scope.save35 = function() {
                $scope.form.duty2 = $scope.view35.editableValue;
                $scope.disableEditor35();
                console.log('avc test');
                var col = 'duty2';
                var element = $scope.form.duty2;
                update(col, element);
                
                var myduty2 = angular.element(document.querySelector('#myduty2'));
                myduty2.empty(); //empty div first
                myduty2.append($scope.form.duty2);

            };

           
            
             //edit text36
            $scope.view36 = {
                editableValue: $scope.form.jtitle3,
                editorEnabled: false
            };

            $scope.enableEditor36 = function() {
                $scope.view36.editorEnabled = true;
                $scope.view36.editableValue = $scope.form.jtitle3;
            };

            $scope.disableEditor36 = function() {
                $scope.view36.editorEnabled = false;
            };

            $scope.save36 = function() {
                $scope.form.jtitle3 = $scope.view36.editableValue;
                $scope.disableEditor36();
                console.log('avc test');
                var col = 'jtitle3';
                var element = $scope.form.jtitle3;
                update(col, element);

            };
                
            
           //edit text37
            $scope.view37 = {
                editableValue: $scope.form.cname3,
                editorEnabled: false
            };

            $scope.enableEditor37 = function() {
                $scope.view37.editorEnabled = true;
                $scope.view37.editableValue = $scope.form.cname3;
            };

            $scope.disableEditor37 = function() {
                $scope.view37.editorEnabled = false;
            };

            $scope.save37 = function() {
                $scope.form.cname3 = $scope.view37.editableValue;
                $scope.disableEditor37();
                console.log('avc test');
                var col = 'cname3';
                var element = $scope.form.cname3;
                update(col, element);

            };
               
                       
            //edit text38
            $scope.view38 = {
                editableValue: $scope.form.cwebsite3,
                editorEnabled: false
            };

            $scope.enableEditor38 = function() {
                $scope.view38.editorEnabled = true;
                $scope.view38.editableValue = $scope.form.cwebsite3;
            };

            $scope.disableEditor38 = function() {
                $scope.view38.editorEnabled = false;
            };

            $scope.save38 = function() {
                $scope.form.cwebsite3 = $scope.view38.editableValue;
                $scope.disableEditor38();
                console.log('avc test');
                var col = 'cwebsite3';
                var element = $scope.form.cwebsite3;
                update(col, element);

            };
            $scope.custom38 = true;
            $scope.toggleCustom38 = function() {
               $scope.custom38 = false;
            };
            $scope.toggleCustomb38 = function() {
                $scope.custom38 = true;
            }; 
            
            //edit text39
            $scope.view39 = {
                editableValue: $scope.form.jfrom3,
                editorEnabled: false
            };

            $scope.enableEditor39 = function() {
                $scope.view39.editorEnabled = true;
                $scope.view39.editableValue = $scope.form.jfrom3;
            };

            $scope.disableEditor39 = function() {
                $scope.view39.editorEnabled = false;
            };

            $scope.save39 = function() {
                $scope.form.jfrom3 = $scope.view39.editableValue;
                $scope.disableEditor39();
                console.log('avc test');
                var col = 'jfrom3';
                var element = $scope.form.jfrom3;
                element = formatdate(element);
                update(col, element);

            };

            
                
            //edit text40
            $scope.view40 = {
                editableValue: $scope.form.jto3,
                editorEnabled: false
            };

            $scope.enableEditor40 = function() {
                $scope.view40.editorEnabled = true;
                $scope.view40.editableValue = $scope.form.jto3;
            };

            $scope.disableEditor40 = function() {
                $scope.view40.editorEnabled = false;
            };

            $scope.save40 = function() {
                $scope.form.jto3 = $scope.view40.editableValue;
                $scope.disableEditor40();
                console.log('avc test');
                var col = 'jto3';
                var element = $scope.form.jto3;
                element = formatdate(element);
                update(col, element);

            };
               
            
            //edit text41
            $scope.view41 = {
                editableValue: $scope.form.duty3,
                editorEnabled: false
            };

            $scope.enableEditor41 = function() {
                $scope.view41.editorEnabled = true;
                $scope.view41.editableValue = $scope.form.duty3;
            };

            $scope.disableEditor41 = function() {
                $scope.view41.editorEnabled = false;
            };

            $scope.save41 = function() {
                $scope.form.duty3 = $scope.view41.editableValue;
                $scope.disableEditor41();
                console.log('avc test');
                var col = 'duty3';
                var element = $scope.form.duty3;
                update(col, element);
                
                var myduty3 = angular.element(document.querySelector('#myduty3'));
                myduty3.empty(); //empty div first
                myduty3.append($scope.form.duty3);

            };
           
            
            
            //edit text42
             $scope.view42 = {
                editableValue: $scope.form.jtitle4,
                editorEnabled: false
            };

            $scope.enableEditor42 = function() {
                $scope.view42.editorEnabled = true;
                $scope.view42.editableValue = $scope.form.jtitle4;
            };

            $scope.disableEditor42 = function() {
                $scope.view42.editorEnabled = false;
            };

            $scope.save42 = function() {
                $scope.form.jtitle4 = $scope.view42.editableValue;
                $scope.disableEditor42();
                console.log('avc test');
                var col = 'jtitle4';
                var element = $scope.form.jtitle4;
                update(col, element);

            };
      
            
           //edit text43
            $scope.view43 = {
                editableValue: $scope.form.cname4,
                editorEnabled: false
            };

            $scope.enableEditor43 = function() {
                $scope.view43.editorEnabled = true;
                $scope.view43.editableValue = $scope.form.cname4;
            };

            $scope.disableEditor43 = function() {
                $scope.view43.editorEnabled = false;
            };

            $scope.save43 = function() {
                $scope.form.cname4 = $scope.view43.editableValue;
                $scope.disableEditor43();
                console.log('avc test');
                var col = 'cname4';
                var element = $scope.form.cname4;
                update(col, element);

            };

                
                       
            //edit text44
            $scope.view44 = {
                editableValue: $scope.form.cwebsite4,
                editorEnabled: false
            };

            $scope.enableEditor44 = function() {
                $scope.view44.editorEnabled = true;
                $scope.view44.editableValue = $scope.form.cwebsite4;
            };

            $scope.disableEditor44 = function() {
                $scope.view44.editorEnabled = false;
            };

            $scope.save44 = function() {
                $scope.form.cwebsite4 = $scope.view44.editableValue;
                $scope.disableEditor44();
                console.log('avc test');
                var col = 'cwebsite4';
                var element = $scope.form.cwebsite4;
                update(col, element);

            };
            
                
            //edit text45
            $scope.view45 = {
                editableValue: $scope.form.jfrom4,
                editorEnabled: false
            };

            $scope.enableEditor45 = function() {
                $scope.view45.editorEnabled = true;
                $scope.view45.editableValue = $scope.form.jfrom4;
            };

            $scope.disableEditor45 = function() {
                $scope.view45.editorEnabled = false;
            };

            $scope.save45 = function() {
                $scope.form.jfrom4 = $scope.view45.editableValue;
                $scope.disableEditor45();
                console.log('avc test');
                var col = 'jfrom4';
                var element = $scope.form.jfrom4;
                element = formatdate(element);
                update(col, element);

            };

            
            //edit text46
            $scope.view46 = {
                editableValue: $scope.form.jto4,
                editorEnabled: false
            };

            $scope.enableEditor46 = function() {
                $scope.view46.editorEnabled = true;
                $scope.view46.editableValue = $scope.form.jto4;
            };

            $scope.disableEditor46 = function() {
                $scope.view46.editorEnabled = false;
            };

            $scope.save46 = function() {
                $scope.form.jto4 = $scope.view46.editableValue;
                $scope.disableEditor46();
                console.log('avc test');
                var col = 'jto4';
                var element = $scope.form.jto4;
                element = formatdate(element);
                update(col, element);

            };

               
            
            //edit text47
            $scope.view47 = {
                editableValue: $scope.form.duty4,
                editorEnabled: false
            };

            $scope.enableEditor47 = function() {
                $scope.view47.editorEnabled = true;
                $scope.view47.editableValue = $scope.form.duty4;
            };

            $scope.disableEditor47 = function() {
                $scope.view47.editorEnabled = false;
            };

            $scope.save47 = function() {
                $scope.form.duty4 = $scope.view47.editableValue;
                $scope.disableEditor47();
                console.log('avc test');
                var col = 'duty4';
                var element = $scope.form.duty4;
                update(col, element);
                
                var myduty4 = angular.element(document.querySelector('#myduty4'));
                myduty4.empty(); //empty div first
                myduty4.append($scope.form.duty4);

            };

                 
            //edit text48
            $scope.view48 = {
                editableValue: $scope.form.jtitle5,
                editorEnabled: false
            };

            $scope.enableEditor48 = function() {
                $scope.view48.editorEnabled = true;
                $scope.view48.editableValue = $scope.form.jtitle5;
            };

            $scope.disableEditor48 = function() {
                $scope.view48.editorEnabled = false;
            };

            $scope.save48 = function() {
                $scope.form.jtitle5 = $scope.view48.editableValue;
                $scope.disableEditor48();
                console.log('avc test');
                var col = 'jtitle5';
                var element = $scope.form.jtitle5;
                update(col, element);

            };

               
            
           //edit text49
        $scope.view49 = {
                editableValue: $scope.form.cname5,
                editorEnabled: false
            };

            $scope.enableEditor49 = function() {
                $scope.view49.editorEnabled = true;
                $scope.view49.editableValue = $scope.form.cname5;
            };

            $scope.disableEditor49 = function() {
                $scope.view49.editorEnabled = false;
            };

            $scope.save49 = function() {
                $scope.form.cname5 = $scope.view49.editableValue;
                $scope.disableEditor49();
                console.log('avc test');
                var col = 'cname5';
                var element = $scope.form.cname5;
                update(col, element);

            };
            
    
                       
            //edit text50
          $scope.view50 = {
                editableValue: $scope.form.cwebsite5,
                editorEnabled: false
            };

            $scope.enableEditor50 = function() {
                $scope.view50.editorEnabled = true;
                $scope.view50.editableValue = $scope.form.cwebsite5;
            };

            $scope.disableEditor50 = function() {
                $scope.view50.editorEnabled = false;
            };

            $scope.save50 = function() {
                $scope.form.cwebsite5 = $scope.view50.editableValue;
                $scope.disableEditor50();
                console.log('avc test');
                var col = 'cwebsite5';
                var element = $scope.form.cwebsite5;
                update(col, element);

            };

      
            //edit text51
                    $scope.view51 = {
                editableValue: $scope.form.jfrom5,
                editorEnabled: false
            };

            $scope.enableEditor51 = function() {
                $scope.view51.editorEnabled = true;
                $scope.view51.editableValue = $scope.form.jfrom5;
            };

            $scope.disableEditor51 = function() {
                $scope.view51.editorEnabled = false;
            };

            $scope.save51 = function() {
                $scope.form.jfrom5 = $scope.view51.editableValue;
                $scope.disableEditor51();
                console.log('avc test');
                var col = 'jfrom5';
                var element = $scope.form.jfrom5;
                element = formatdate(element);
                update(col, element);

            };
            

            
            //edit text52
                    $scope.view52 = {
                editableValue: $scope.form.jto5,
                editorEnabled: false
            };

            $scope.enableEditor52 = function() {
                $scope.view52.editorEnabled = true;
                $scope.view52.editableValue = $scope.form.jto5;
            };

            $scope.disableEditor52 = function() {
                $scope.view52.editorEnabled = false;
            };

            $scope.save52 = function() {
                $scope.form.jto5 = $scope.view52.editableValue;
                $scope.disableEditor52();
                console.log('avc test');
                var col = 'jto5';
                var element = $scope.form.jto5;
                element = formatdate(element);
                update(col, element);

            };
              
            
            //edit text53
            $scope.view53 = {
                editableValue: $scope.form.duty5,
                editorEnabled: false
            };

            $scope.enableEditor53 = function() {
                $scope.view53.editorEnabled = true;
                $scope.view53.editableValue = $scope.form.duty5;
            };

            $scope.disableEditor53 = function() {
                $scope.view53.editorEnabled = false;
            };

            $scope.save53 = function() {
                $scope.form.duty5 = $scope.view53.editableValue;
                $scope.disableEditor53();
                console.log('avc test');
                var col = 'duty5';
                var element = $scope.form.duty5;
                update(col, element);
                
                var myduty5 = angular.element(document.querySelector('#myduty5'));
                myduty5.empty(); //empty div first
                myduty5.append($scope.form.duty5);

            };

            
            $scope.createpdf = function() {
                         $http.post('/createpdf?rid=' + $scope.form.r_id + '&url=' + $scope.src).success(function (data) {
                         console.log(data);  
                             $scope.dd = data;
         //download it                    
        function downloadpdf () {
            var s = $rootScope.remoteURL + '/' + $scope.dd;//'http://localhost:3000/' + $scope.dd;
            $window.open(s, '_blank');//fix later url
        }

        $timeout(downloadpdf, 7000); 
     
//          $timeout(function () {
//    downloadpdf(data);
//}, 7000);                   
//                            
                      });
            };
				}else
					{
						console.log('Message: no resume for this customer, or there may be repeat resumes');
						$scope.resumeErrorMessage = 'No Resume yet';
						$scope.hideEmptyResume = true;
					}

            
        });
    };

    function formatdate(element) { 
            
            var array = element.split("-");
                if(array[0] == '01')
                    {
                        element = 'January-' + array[1];
                    }else if (array[0] == '02')
                    {
                        element = 'February-' + array[1];
                    }else if (array[0] == '03')
                    {
                        element = 'March-' + array[1];
                    }else if (array[0] == '04')
                    {
                        element = 'April-' + array[1];
                    }else if (array[0] == '05')
                    {
                        element = 'May-' + array[1];
                    }else if (array[0] == '06')
                    {
                        element = 'June-' + array[1];
                    }else if (array[0] == '07')
                    {
                        element = 'July-' + array[1];
                    }else if (array[0] == '08')
                    {
                        element = 'August-' + array[1];
                    }else if (array[0] == '09')
                    {
                        element = 'September-' + array[1];
                    }else if (array[0] == '10')
                    {
                        element = 'October-' + array[1];
                    }else if (array[0] == '11')
                    {
                        element = 'November-' + array[1];
                    }else if (array[0] == '12')
                    {
                        element = 'December-' + array[1];
                    }
             return element;
     };
    
    
    function update(col, element) { 
         $http.post('/updatecol?rid=' + $scope.form.r_id + '&col=' + col + '&element=' + element).success(function (data) {
			 			$scope.form.modified_date = 'just now';
                         console.log('data updated');   
                      });
     
     }; 	
	
	
	
//download pdf from booking form
	   		$scope.downloadBookingPDF = function() {
                 	var pp = 'http://globalworkandtravel.com/book/upload/' + $scope.profile.first_name + '-' + $scope.profile.last_name + '-' + $routeParams.cid +'.pdf'
            		$window.open(pp, '_blank');
            };
	
	
	
//resume tab ends
//******************************************************************************************************************************************
//******************************************************************************************************************************************
	
//find all logs with some different status parameters for this customer
	    function findApprove(status) {
		 var defer = $q.defer();// deferred contains the promise to be returned
         $http.get('/findApprove?cid=' + $routeParams.cid + '&status=' + status).success(function (data) {
                         defer.resolve(data);// to resolve (fulfill) a promise 
			 			
                      });
     	 return defer.promise; // promise is returned
     }; 
	

	
//add new log such as approve or edit
	function addNewLog(fieldname, value, status) {
		 var defer = $q.defer();// deferred contains the promise to be returned
         $http.post('/addNewLog?cid=' + $routeParams.cid + '&staff=' + $rootScope.name + '&staffid=' + $rootScope.staffID + '&fieldname=' + fieldname + '&value=' + value + '&status=' + status).success(function (data) {
                         defer.resolve(data);// to resolve (fulfill) a promise 
			 			
                      });
     	 return defer.promise; // promise is returned
     }; 

	
//display all logs
	
	 // Pre-fetch an external template populated with a custom scope
  var myModal = $modal({scope: $scope, template: 'modal.html', show: false});
  // Show when some event occurs (use $promise property to ensure the template has been loaded)
  $scope.showModal = function(fieldname) {
	  getLog(fieldname);
  };
	
//get all log data for this field
		function getLog(fieldname) {
         $http.get('/getLog?cid=' + $routeParams.cid + '&fieldname=' + fieldname).success(function (data) {
			 				$scope.loglist = data;
			 				$scope.f = fieldname;
			 			    myModal.$promise.then(myModal.show);
                      });
     }; 

	
//get all payments for this customer from payment table
	     $scope.totalAmountPaid = 0;
		 $scope.totalAmountNext = 0;
		 $scope.totalAmountDiscount = 0;
	getAllPayment();
    function getAllPayment() { 
				$http.get('/getpayment?cid=' + $routeParams.cid).success(function (data) {
                        if (data.length > 0)
                            {
                                $scope.list = data;
								$scope.allPaymentTimeline = data;
								if ($scope.allPaymentTimeline.length == 0)
									{
										getAllNoteTimeline();
									}
								
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
//					$scope.position = 'left';
					
					for (j=0; j<$scope.allPaymentTimeline.length; j++)
						{
							if ($scope.position == 'left')
								{
									$scope.position = 'right';
								}else
									{
										$scope.position = 'left';
									}
							
							var text = $scope.allPaymentTimeline[j].paymentAmount + ' ' + $scope.allPaymentTimeline[j].Currency + ' with ' +  $scope.allPaymentTimeline[j].paymentStatus + ' status.';
							var h = 'New Payment Added';
							var one = {
								text: text,
								position: $scope.position,
								badgeClass: 'danger',
								badgeIconClass: 'glyphicon-credit-card',
								heading: h,
								staff: $scope.allPaymentTimeline[j].Staff,
								time: $scope.allPaymentTimeline[j].time
							};
							$scope.timelineData.push(one);
							
							
							if (j == ($scope.allPaymentTimeline.length - 1))
								{
									getAllNoteTimeline();
								}
						}
					
					
					
            });
     
     }; 
	

//time line
    function getAllNoteTimeline() { 
		$http.get('/getAllNoteTimeline?cid=' + $routeParams.cid).success(function (data) {	
					
				$scope.allNoteTimeline = data;
							
				if ($scope.allNoteTimeline.length == 0)
					{
						getAllTaskTimeline();
					}
			
			
					for (j=0; j<$scope.allNoteTimeline.length; j++)
						{
							if ($scope.position == 'left')
								{
									$scope.position = 'right';
								}else
									{
										$scope.position = 'left';
									}
							
							var h = 'New Note Added';
							var one = {
								text: $scope.allNoteTimeline[j].text,
								position: $scope.position,
								badgeClass: 'info',
								badgeIconClass: 'glyphicon-pencil',
								heading: h,
								staff: $scope.allNoteTimeline[j].staff,
								time: $scope.allNoteTimeline[j].time
							};
							$scope.timelineData.push(one);
							
							if (j == ($scope.allNoteTimeline.length - 1))
								{
									getAllTaskTimeline();
								}
						}
					
	});
}; 
	
	function getAllTaskTimeline() { 
		$http.get('/getAllTaskTimeline?cid=' + $routeParams.cid).success(function (data) {	
					
				$scope.allTaskTimeline = data;
			
				if ($scope.allTaskTimeline.length == 0)
					{
						getAllApproveTimeline();
					}
			
			
				for (j=0; j<$scope.allTaskTimeline.length; j++)
						{
							if ($scope.position == 'left')
								{
									$scope.position = 'right';
								}else
									{
										$scope.position = 'left';
									}
							
							var text = '';
							var h = $scope.allTaskTimeline[j].taskName + ' has been done';
							var one = {
								text: text,
								position: $scope.position,
								badgeClass: 'warning',
								badgeIconClass: 'glyphicon-tasks',
								heading: h,
								staff: $scope.allTaskTimeline[j].user,
								time: $scope.allTaskTimeline[j].time
							};
							$scope.timelineData.push(one);
							
							if (j == ($scope.allTaskTimeline.length - 1))
								{
									getAllApproveTimeline();
								}
							
						}
				
					
					
	});
};
	
	
		function getAllApproveTimeline() { 
		$http.get('/getAllApproveTimeline?cid=' + $routeParams.cid).success(function (data) {	
					
				$scope.allApproveTimeline = data;
				for (j=0; j<$scope.allApproveTimeline.length; j++)
						{
							if ($scope.position == 'left')
								{
									$scope.position = 'right';
								}else
									{
										$scope.position = 'left';
									}
							
							var h = $scope.allApproveTimeline[j].field_name + ' has been approved';
							var text = '';
							var one = {
								text: text,
								position: $scope.position,
								badgeClass: 'success',
								badgeIconClass: 'glyphicon-check',
								heading: h,
								staff: $scope.allApproveTimeline[j].staff_name,
								time: $scope.allApproveTimeline[j].date
							};
							$scope.timelineData.push(one);
							
						}
				
					
					
	});
};
	
	
//create travel invoice
$scope.invoice = function() {
	 invoiceTPL.show();    	
};
	
	$scope.data10 = {
        availableOptions: [
            {
                id: 'Paid',
                name: 'Paid'
            },
            {
                id: 'Pending',
                name: 'Pending'
            },
            {
                id: 'Cancelled',
                name: 'Cancelled'
            }
    ],
        selectedOption: {
            id: 'Paid',
            name: 'Paid'
        }
    };
	
	$scope.flightairline = {
        availableOptions: [
            {
                id: 'airline1',
                name: 'airline1'
            },
            {
                id: 'airline2',
                name: 'airline2'
            },
            {
                id: 'airline3',
                name: 'airline3'
            }
    ],
        selectedOption: {
            id: 'airline1',
            name: 'airline1'
        }
    };

	$scope.flightclass = {
        availableOptions: [
            {
                id: 'classA',
                name: 'classA'
            },
            {
                id: 'classB',
                name: 'classB'
            },
            {
                id: 'classC',
                name: 'classC'
            }
    ],
        selectedOption: {
            id: 'classA',
            name: 'classA'
        }
    };
	
	$scope.otherChargesItem = {
        availableOptions: [
            {
                id: 'item1',
                name: 'item1'
            },
            {
                id: 'item2',
                name: 'item2'
            },
            {
                id: 'item3',
                name: 'item3'
            }
    ],
        selectedOption: {
            id: 'item1',
            name: 'item1'
        }
    };
	
	$scope.insuranceCompany = {
        availableOptions: [
            {
                id: 'company1',
                name: 'company1'
            },
            {
                id: 'company2',
                name: 'company2'
            },
            {
                id: 'company3',
                name: 'company3'
            }
    ],
        selectedOption: {
            id: 'company1',
            name: 'company1'
        }
    };
	
	$scope.insurancePlan = {
        availableOptions: [
            {
                id: 'plan1',
                name: 'plan1'
            },
            {
                id: 'plan2',
                name: 'plan2'
            },
            {
                id: 'plan3',
                name: 'plan3'
            }
    ],
        selectedOption: {
            id: 'plan1',
            name: 'plan1'
        }
    };
	
$scope.addFlights = function() {
	addAccommodationTPL.hide();
	addInsuranceTPL.hide();
	addTransferTPL.hide();
	addAddonTPL.hide();
	addCharityTPL.hide();
	addVoucherTPL.hide();
	addOtherChargesTPL.hide();
	addFlightTPL.show();    	
};
$scope.addInsurance = function() {
	addAccommodationTPL.hide();
	addFlightTPL.hide();
	addTransferTPL.hide();
	addAddonTPL.hide();
	addCharityTPL.hide();
	addVoucherTPL.hide();
	addOtherChargesTPL.hide();
 	addInsuranceTPL.show();  
};	
	
$scope.addAccommodation = function() {
	addInsuranceTPL.hide();
	addFlightTPL.hide();
	addTransferTPL.hide();
	addAddonTPL.hide();
	addCharityTPL.hide();
	addVoucherTPL.hide();
	addOtherChargesTPL.hide();
 	addAccommodationTPL.show();  
};

$scope.addTransfer = function() {
	addInsuranceTPL.hide();
	addFlightTPL.hide();
 	addAccommodationTPL.hide();
	addAddonTPL.hide();
	addCharityTPL.hide();
	addVoucherTPL.hide();
	addOtherChargesTPL.hide();
	addTransferTPL.show();
};
	
$scope.addAddon = function() {
	addInsuranceTPL.hide();
	addFlightTPL.hide();
 	addAccommodationTPL.hide();
	addTransferTPL.hide();
	addCharityTPL.hide();
	addVoucherTPL.hide();
	addOtherChargesTPL.hide();
	addAddonTPL.show();
};	

$scope.addCharity = function() {
	addInsuranceTPL.hide();
	addFlightTPL.hide();
 	addAccommodationTPL.hide();
	addTransferTPL.hide();
	addAddonTPL.hide();
	addVoucherTPL.hide();
	addOtherChargesTPL.hide();
	addCharityTPL.show();
};
	
$scope.addVoucher = function() {
	addInsuranceTPL.hide();
	addFlightTPL.hide();
 	addAccommodationTPL.hide();
	addTransferTPL.hide();
	addAddonTPL.hide();
	addCharityTPL.hide();
	addOtherChargesTPL.hide();
	addVoucherTPL.show();
};
	
$scope.addOtherCharges = function() {
	addInsuranceTPL.hide();
	addFlightTPL.hide();
 	addAccommodationTPL.hide();
	addTransferTPL.hide();
	addAddonTPL.hide();
	addCharityTPL.hide();
	addVoucherTPL.hide();
	addOtherChargesTPL.show();
};

//flight
$scope.flightStatus = 'inactive';//
$scope.flightRTN = 'return';//need this for access scope variable in tpl page?? need to be fixed later
	
$scope.saveFlightDetail = function(flightdate, flightQuotedAmount, flightTaxAmount, flightDepartureCity, flightArrivalCity, flightRTN, flightStatus, flightComments) {
	$http.post('/saveFlightDetail?cid=' + $routeParams.cid + '&flightdate=' + flightdate + '&flightairline=' + $scope.flightairline.selectedOption.name + '&flightclass=' + $scope.flightclass.selectedOption.name + '&flightQuotedAmount=' + flightQuotedAmount + '&flightTaxAmount=' + flightTaxAmount + '&flightDepartureCity=' + flightDepartureCity + '&flightArrivalCity=' + flightArrivalCity + '&flightRTN=' + flightRTN + '&flightStatus=' + flightStatus + '&flightComments=' + flightComments).success(function (data) {
		
	$scope.flightTableNodata = false;
		
	//change front end later
	addFlightTPL.hide();
	
							var newFlight = {
								flight_airline: $scope.flightairline.selectedOption.name,
								flight_booking_class: $scope.flightclass.selectedOption.name,
								flight_tentative_departure_date: flightdate,
								flight_quoted_airfare_amount: flightQuotedAmount,
								flight_taxes_amount: flightTaxAmount,
								flight_departure_city: flightDepartureCity,
								flight_arrival_city: flightArrivalCity,
								flight_rtnow: flightRTN,
								flight_comments: flightComments,
								flight_status: flightStatus
							};
							$scope.flightsList.push(newFlight);
	});
}
	
function getFlightsList() { 
		$http.get('/getFlightsList?cid=' + $routeParams.cid).success(function (data) {	
					$scope.flightsList = data;
					if (data.length == 0)
						{
							$scope.flightTableNodata = true;
						}
					
	});
};
	
//insurance
$scope.insuranceData = {};//
$scope.insuranceData.excess = 'no';//
$scope.insuranceData.status = 'inactive';//
$scope.saveInsuranceDetail = function(insuranceData) {
	$http.post('/saveInsuranceDetail?cid=' + $routeParams.cid + '&company=' + $scope.insuranceCompany.selectedOption.name + '&from=' + insuranceData.from + '&to=' + insuranceData.to + '&plan=' + $scope.insurancePlan.selectedOption.name + '&excess=' + insuranceData.excess + '&amount=' + insuranceData.amount + '&comments=' + insuranceData.comments + '&status=' + insuranceData.status).success(function (data) {	
	//change front end later
	addInsuranceTPL.hide();
	$scope.insuranceData = {};
	$scope.insuranceData.excess = 'no';
	$scope.insuranceData.status = 'inactive';
		
	$scope.insuranceTableNodata = false;
	
							var newInsurance = {
								insurance_company: $scope.insuranceCompany.selectedOption.name,
								insurance_from: insuranceData.from,
								insurance_to: insuranceData.to,
								insurance_plan: $scope.insurancePlan.selectedOption.name,
								insurance_excess: insuranceData.excess,
								insurance_amount: insuranceData.amount,
								insurance_comments: insuranceData.comments,
								insurance_status: insuranceData.status
							};
							$scope.insuranceList.push(newInsurance);
	});
}

$scope.hideInsuranceTPL = function() {
	addInsuranceTPL.hide();
	$scope.insuranceData = {};
	$scope.insuranceData.excess = 'no';
	$scope.insuranceData.status = 'inactive';
};

function getInsuranceList() { 
		$http.get('/getInsuranceList?cid=' + $routeParams.cid).success(function (data) {
					if(data.length == 0)
						{
							$scope.insuranceTableNodata = true;
						}
					$scope.insuranceList = data;
					
	});
};
	
//accommodation
$scope.accommodationData = {};
$scope.accommodationData.transfer = 'no';
$scope.accommodationData.status = 'inactive';
	
$scope.saveAccommodationDetail = function(accommodationData) {
	$http.post('/saveAccommodationDetail?cid=' + $routeParams.cid + '&from=' + accommodationData.from + '&to=' + accommodationData.to + '&transfer=' + accommodationData.transfer + '&comments=' + accommodationData.comments + '&detail=' + accommodationData.detail + '&amount=' + accommodationData.amount + '&status=' + accommodationData.status).success(function (data) {	
	//change front end later
	addAccommodationTPL.hide();
	$scope.accommodationData = {};
	$scope.accommodationData.transfer = 'no';
	$scope.accommodationData.status = 'inactive';
		
	$scope.accommodationTableNodata = false;
	
							var newAccommodation = {
								accommodation_from: accommodationData.from,
								accommodation_to: accommodationData.to,
								accommodation_transfer: accommodationData.transfer,
								accommodation_comments: accommodationData.comments,
								additional_accommodation: accommodationData.detail,
								accommodation_amount: accommodationData.amount,
								accommodation_status: accommodationData.status
							};
							$scope.accommodationList.push(newAccommodation);
	});
}

$scope.hideAccommodationTPL = function() {
	addAccommodationTPL.hide();
	$scope.accommodationData = {};
	$scope.accommodationData.transfer = 'no';
	$scope.accommodationData.status = 'inactive';
};
	
function getAccommodationList() { 
		$http.get('/getAccommodationList?cid=' + $routeParams.cid).success(function (data) {	
					$scope.accommodationList = data;
			if(data.length == 0)
				{
					$scope.accommodationTableNodata = true;
				}
					
	});
};

//transfer
$scope.transferData = {};
$scope.transferData.returnow = 'return';
$scope.transferData.status = 'inactive';
	
$scope.saveTransferDetail = function(transferData) {
	$http.post('/saveTransferDetail?cid=' + $routeParams.cid + '&detail=' + transferData.detail + '&amount=' + transferData.amount + '&from=' + transferData.from + '&to=' + transferData.to + '&returnow=' + transferData.rtnow + '&comments=' + transferData.comments + '&status=' + transferData.status).success(function (data) {	
	//change front end later
	addTransferTPL.hide();
	$scope.transferData = {};
	$scope.transferData.returnow = 'return';
	$scope.transferData.status = 'inactive';
	$scope.transferTableNodata = false;
							var newTransfer = {
								additional_transfer: transferData.detail,
								transfer_amount: transferData.amount,
								transfer_from: transferData.from,
								transfer_to: transferData.to,
								transfer_returnow: transferData.rtnow,
								transfer_comments: transferData.comments,
								transfer_status: transferData.status
							};
							$scope.transferList.push(newTransfer);
	});
}

$scope.hideTransferTPL = function() {
	addTransferTPL.hide();
	$scope.transferData = {};
	$scope.transferData.returnow = 'return';
	$scope.transferData.status = 'inactive';
};

function getTransferList() { 
		$http.get('/getTransferList?cid=' + $routeParams.cid).success(function (data) {	
					$scope.transferList = data;
			if(data.length == 0)
				{
					$scope.transferTableNodata = true;
				}
	});
};

//addon
$scope.addonData = {};
$scope.addonData.status = 'inactive';
	
$scope.saveAddonDetail = function(addonData) {
	$http.post('/saveAddonDetail?cid=' + $routeParams.cid + '&supplier=' + addonData.supplier + '&grossAmount=' + addonData.grossAmount + '&tour=' + addonData.tourName + '&nettAmount=' + addonData.nettAmount + '&from=' + addonData.from + '&to=' + addonData.to + '&comments=' + addonData.comments + '&status=' + addonData.status).success(function (data) {	
	//change front end later
	addAddonTPL.hide();
	$scope.addonData = {};
	$scope.addonData.status = 'inactive';
	$scope.addonTableNodata = false;
		
							var newAddon = {
								addon_supplier: addonData.supplier,
								addon_gross_amount: addonData.grossAmount,
								addon_tour_name: addonData.tourName,
								addon_nett_amount: addonData.nettAmount,
								addon_from: addonData.from,
								addon_to: addonData.to,
								addon_comments: addonData.comments,
								addon_status: addonData.status
							};
							$scope.addonList.push(newAddon);
	});
}

$scope.hideAddonTPL = function() {
	addAddonTPL.hide();
	$scope.addonData = {};
	$scope.addonData.status = 'inactive';
};
	
function getAddonList() { 
		$http.get('/getAddonList?cid=' + $routeParams.cid).success(function (data) {	
					$scope.addonList = data;
			if(data.length == 0)
				{
					$scope.addonTableNodata = true;
				}
	});
};

//charity
$scope.charityData = {};
$scope.charityData.status = 'inactive';
	
$scope.saveCharityDetail = function(charityData) {
	$http.post('/saveCharityDetail?cid=' + $routeParams.cid + '&foundation=' + charityData.foundation + '&amount=' + charityData.amount + '&comments=' + charityData.comments + '&status=' + charityData.status).success(function (data) {	
	//change front end later
	addCharityTPL.hide();
	$scope.charityData = {};
	$scope.charityData.status = 'inactive';
	$scope.charityTableNodata = false;
							var newCharity = {
								charity_global_foundation: charityData.foundation,
								charity_amount: charityData.amount,
								charity_comments: charityData.comments,
								charity_status: charityData.status
							};
							$scope.charityList.push(newCharity);
	});
}

$scope.hideCharityTPL = function() {
	addCharityTPL.hide();
	$scope.charityData = {};
	$scope.charityData.status = 'inactive';
};
	
function getCharityList() { 
		$http.get('/getCharityList?cid=' + $routeParams.cid).success(function (data) {	
					$scope.charityList = data;
			if (data.length == 0)
				{
					$scope.charityTableNodata = true;
				}
	});
};

//voucher
$scope.voucherData = {};
$scope.voucherData.status = 'inactive';

$scope.saveVoucherDetail = function(voucherData) {
	$http.post('/saveVoucherDetail?cid=' + $routeParams.cid + '&detail=' + voucherData.detail + '&amount=' + voucherData.amount + '&comments=' + voucherData.comments + '&status=' + voucherData.status).success(function (data) {	
	//change front end later
	addVoucherTPL.hide();
	$scope.voucherData = {};
	$scope.voucherData.status = 'inactive';
	$scope.travelVoucherTableNodata = false;
							var newVoucher = {
								travel_credit_voucher: voucherData.detail,
								travel_voucher_amount: voucherData.amount,
								travel_voucher_comments: voucherData.comments,
								travel_voucher_status: voucherData.status
							};
							$scope.voucherList.push(newVoucher);
	});
}

$scope.hideVoucherTPL = function() {
	addVoucherTPL.hide();
	$scope.voucherData = {};
	$scope.voucherData.status = 'inactive';
};
	
function getVoucherList() { 
		$http.get('/getVoucherList?cid=' + $routeParams.cid).success(function (data) {	
					$scope.voucherList = data;
			if (data.length == 0)
				{
					$scope.travelVoucherTableNodata = true;
				}
	});
};

//other charges
$scope.otherChargesData = {};
$scope.otherChargesData.status = 'inactive';
	
$scope.saveOtherChargesDetail = function(otherChargesData) {
	$http.post('/saveOtherChargesDetail?cid=' + $routeParams.cid + '&item=' + $scope.otherChargesItem.selectedOption.name + '&amount=' + otherChargesData.amount + '&comments=' + otherChargesData.comments + '&status=' + otherChargesData.status).success(function (data) {	
	//change front end later
	addOtherChargesTPL.hide();
	$scope.otherChargesData = {};
	$scope.otherChargesData.status = 'inactive';
	$scope.otherChargesTableNodata = false;
		
							var newOtherCharge = {
								other_charges_item: $scope.otherChargesItem.selectedOption.name,
								other_charges_amount: otherChargesData.amount,
								other_charges_comments: otherChargesData.comments,
								other_charges_status: otherChargesData.status
							};
							$scope.otherChargesList.push(newOtherCharge);
	});
}	

$scope.hideOtherChargesTPL = function() {
	addOtherChargesTPL.hide();
	$scope.otherChargesData = {};
	$scope.otherChargesData.status = 'inactive';
};

function getOtherChargesList() { 
		$http.get('/getOtherChargesList?cid=' + $routeParams.cid).success(function (data) {	
					$scope.otherChargesList = data;
			if (data.length == 0)
				{
					$scope.otherChargesTableNodata = true;
				}
	});
};

//edit flight
	var editFlightTPL = $aside({
        scope: $scope,
        template: '../bookings/editFlightTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
$scope.editFlight = function(f) {
	editFlightTPL.show();
	$scope.f = f;
	$scope.f.flight_quoted_airfare_amount = parseInt(f.flight_quoted_airfare_amount);
	$scope.f.flight_taxes_amount = parseInt(f.flight_taxes_amount);
	$scope.flightairline.selectedOption.id = f.flight_airline;
	$scope.flightairline.selectedOption.name = f.flight_airline;
	$scope.flightclass.selectedOption.id = f.flight_booking_class;
	$scope.flightclass.selectedOption.name = f.flight_booking_class;
};

$scope.updateFlightDetail = function(f) {
		$http.post('/editFlightDetail?fid=' + f.flight_id + '&flightdate=' + f.flight_tentative_departure_date + '&flightairline=' + $scope.flightairline.selectedOption.name + '&flightclass=' + $scope.flightclass.selectedOption.name + '&flightQuotedAmount=' + f.flight_quoted_airfare_amount + '&flightTaxAmount=' + f.flight_taxes_amount + '&flightDepartureCity=' + f.flight_departure_city + '&flightArrivalCity=' + f.flight_arrival_city + '&flightRTN=' + f.flight_rtnow + '&flightStatus=' + f.flight_status + '&flightComments=' + f.flight_comments).success(function (data) {	
	//change front end later
	editFlightTPL.hide();
	getFlightsList();
		});
};

$scope.hideEditFlightTPL = function() {
	editFlightTPL.hide();
	getFlightsList();	
};

//edit insurance
	var editInsuranceTPL = $aside({
        scope: $scope,
        template: '../bookings/editInsuranceTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });	

$scope.editInsurance = function(i) {
	editInsuranceTPL.show();
	$scope.i = i;
	$scope.i.insurance_amount = parseInt(i.insurance_amount);
	$scope.insuranceCompany.selectedOption.id = i.insurance_company;
	$scope.insuranceCompany.selectedOption.name = i.surance_company;	
	$scope.insurancePlan.selectedOption.id = i.insurance_plan;
	$scope.insurancePlan.selectedOption.name = i.insurance_plan;
};

$scope.updateInsuranceDetail = function(i) {
		$http.post('/updateInsuranceDetail?insuranceid=' + i.insurance_id + '&company=' + $scope.insuranceCompany.selectedOption.name + '&from=' + i.insurance_from + '&to=' + i.insurance_to + '&plan=' + $scope.insurancePlan.selectedOption.name + '&excess=' + i.insurance_excess + '&amount=' + i.insurance_amount + '&comments=' + i.insurance_comments + '&status=' + i.insurance_status).success(function (data) {	
	//change front end later
	editInsuranceTPL.hide();
 	getInsuranceList();
	});
};

$scope.hideEditInsuranceTPL = function() {
	editInsuranceTPL.hide();
	getInsuranceList();	
};
	
//edit accommodation
	var editAccommodationTPL = $aside({
        scope: $scope,
        template: '../bookings/editAccommodationTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
$scope.editAccommodation = function(a) {
	editAccommodationTPL.show();
	$scope.a = a;
	$scope.a.accommodation_amount = parseInt(a.accommodation_amount);
};
		
$scope.hideEditAccommodationTPL = function() {
	editAccommodationTPL.hide();
	getAccommodationList();
};	

$scope.updateAccommodationDetail = function(a) {
		$http.post('/updateAccommodationDetail?accommodationid=' + a.accommodation_id + '&from=' + a.accommodation_from + '&to=' + a.accommodation_to + '&transfer=' + a.accommodation_transfer + '&comments=' + a.accommodation_comments + '&detail=' + a.additional_accommodation + '&amount=' + a.accommodation_amount + '&status=' + a.accommodation_status).success(function (data) {	
	//change front end later
	editAccommodationTPL.hide();
	getAccommodationList();
	});
};

//edit transfer
	var editTransferTPL = $aside({
        scope: $scope,
        template: '../bookings/editTransferTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
$scope.editTransfer = function(t) {
	editTransferTPL.show();
	$scope.tEdit = t;
	$scope.tEdit.transfer_amount = parseInt(t.transfer_amount);
};

$scope.hideEditTransferTPL = function() {
	editTransferTPL.hide();
	getTransferList();
};	
	
$scope.updateTransferDetail = function(tEdit) {
		$http.post('/updateTransferDetail?transferid=' + tEdit.transfer_id + '&detail=' + tEdit.additional_transfer + '&amount=' + tEdit.transfer_amount + '&from=' + tEdit.transfer_from + '&to=' + tEdit.transfer_to + '&returnow=' + tEdit.transfer_returnow + '&comments=' + tEdit.transfer_comments + '&status=' + tEdit.transfer_status).success(function (data) {	
	//change front end later
	editTransferTPL.hide();
	getTransferList();
	});
};	
	
//edit addon	
	var editAddonTPL = $aside({
        scope: $scope,
        template: '../bookings/editAddonTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
$scope.editAddon = function(a) {
	editAddonTPL.show();
	$scope.aEdit = a;
	$scope.aEdit.addon_gross_amount = parseInt(a.addon_gross_amount);
	$scope.aEdit.addon_nett_amount = parseInt(a.addon_nett_amount);
};

$scope.hideEditAddonTPL = function() {
	editAddonTPL.hide();
	getAddonList();
};	

	
$scope.updateAddonDetail = function(aEdit) {
		$http.post('/updateAddonDetail?addonid=' + aEdit.addon_id + '&supplier=' + aEdit.addon_supplier + '&grossamount=' + aEdit.addon_gross_amount + '&tour=' + aEdit.addon_tour_name + '&nettamount=' + aEdit.addon_nett_amount + '&from=' + aEdit.addon_from + '&to=' + aEdit.addon_to + '&comments=' + aEdit.addon_comments + '&status=' + aEdit.addon_status).success(function (data) {	
	//change front end later
	editAddonTPL.hide();
	getAddonList();
	});
};

	
//edit charity
	var editCharityTPL = $aside({
        scope: $scope,
        template: '../bookings/editCharityTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
$scope.editCharity = function(c) {
	editCharityTPL.show();
	$scope.cEdit = c;
	$scope.cEdit.charity_amount = parseInt(c.charity_amount);
};
	
$scope.hideEditCharityTPL = function() {
	editCharityTPL.hide();
	getCharityList();
};
	
$scope.updateCharityDetail = function(cEdit) {
		$http.post('/updateCharityDetail?charityid=' + cEdit.charity_id + '&foundation=' + cEdit.charity_global_foundation + '&amount=' + cEdit.charity_amount + '&comments=' + cEdit.charity_comments + '&status=' + cEdit.charity_status).success(function (data) {	
	//change front end later
	editCharityTPL.hide();
	getCharityList();
	});
};	
	
//edit voucher
	var editVoucherTPL = $aside({
        scope: $scope,
        template: '../bookings/editVoucherTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
$scope.editVoucher = function(v) {
	editVoucherTPL.show();
	$scope.vEdit = v;
	$scope.vEdit.travel_voucher_amount = parseInt(v.travel_voucher_amount);
};	
	
$scope.hideEditVoucherTPL = function() {
	editVoucherTPL.hide();
	getVoucherList();
};
	
$scope.updateVoucherDetail = function(vEdit) {
		$http.post('/updateVoucherDetail?voucherid=' + vEdit.travel_voucher_id + '&detail=' + vEdit.travel_credit_voucher + '&amount=' + vEdit.travel_voucher_amount + '&comments=' + vEdit.travel_voucher_comments + '&status=' + vEdit.travel_voucher_status).success(function (data) {	
	//change front end later
	editVoucherTPL.hide();
	getVoucherList();
	});
};
	
//edit other charges
	var editOtherTPL = $aside({
        scope: $scope,
        template: '../bookings/editOtherTPL.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	
$scope.editOther = function(oo) {
	editOtherTPL.show();
	$scope.ooEdit = oo;
	$scope.ooEdit.other_charges_amount = parseInt(oo.other_charges_amount);	
	$scope.otherChargesItem.selectedOption.name = oo.other_charges_item;
	$scope.otherChargesItem.selectedOption.id = oo.other_charges_item; 	
};		

$scope.hideEditOtherChargesTPL = function() {
	editOtherTPL.hide();
	getOtherChargesList();
};
	

$scope.updateOtherChargesDetail = function(ooEdit) {
		$http.post('/updateOtherChargesDetail?otherchargesid=' + ooEdit.other_charges_id + '&item=' + $scope.otherChargesItem.selectedOption.name + '&amount=' + ooEdit.other_charges_amount + '&comments=' + ooEdit.other_charges_comments + '&status=' + ooEdit.other_charges_status).success(function (data) {	
	//change front end later
	editOtherTPL.hide();
	getOtherChargesList();
	});
};	

	//trip section - find, edit, add trip details in trip table
	$scope.tripExperienceList = {
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
	
	
	$scope.tripExperience = {
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
	
	
	$scope.tripStatusList = {
        availableOptions: [
            {
                id: 'Pending',
                name: 'Pending'
            },
            {
                id: 'New File',
                name: 'New File'
            },
            {
                id: 'In Progress',
                name: 'In Progress'
            },
			{
                id: 'On Hold',
                name: 'On Hold'
            },
			{
                id: 'Cancelled',
                name: 'Cancelled'
            },
			{
                id: 'Refunded',
                name: 'Refunded'
            },
			{
                id: 'Legal',
                name: 'Legal'
            },
			{
                id: 'Departed',
                name: 'Departed'
            },
			{
                id: 'Rejected',
                name: 'Rejected'
            }
    ],
        selectedOption: {
            id: 'Pending',
            name: 'Pending'
        }
    };
	
    findtrip();
    function findtrip() {
        $http.get('/findtrip?cid=' + $routeParams.cid).success(function (data) {
                    //console.log(data10);
                    $scope.tripList = data;
			if (data.length == 0)
				{
					$scope.tripTableNodata = true;
				}
             });
   	};
	
	$scope.addNewTrip = function() {
		
		addNewTripTPL.show();
	};
	
	$scope.saveNewTrip = function(tripDestination, tripCode, tripDuration, tripPrice) {
			$http.post('/saveNewTrip?tripDestination=' + tripDestination + '&tripCode=' + tripCode + '&tripDuration=' + tripDuration + '&tripPrice=' + tripPrice + '&cid=' + $routeParams.cid + '&tripExperienceName=' + $scope.tripExperienceList.selectedOption.id + '&tripStatus=' + $scope.tripStatusList.selectedOption.id).success(function (data) {	

			addNewTripTPL.hide();
			findtrip();
			$scope.tripTableNodata = false;
		 });
		
	};
	
	$scope.editTrip = function(tl) {
		
		editTripTPL.show();
		$scope.tl = tl;
		$scope.tripExperience.selectedOption.id = $scope.tl.trip_experience_name;
		$scope.tripExperience.selectedOption.name = $scope.tl.trip_experience_name;
		$scope.tripStatusList.selectedOption.id = $scope.tl.trip_status;
		$scope.tripStatusList.selectedOption.name = $scope.tl.trip_status;
	};
	
	$scope.updateTripDetail = function(tl) {
		
		console.log('test tl here', tl);
		$http.post('/updateTripDetail?tripDestination=' + tl.trip_destination + '&tripCode=' + tl.trip_code + '&tripDuration=' + tl.trip_duration + '&tripPrice=' + tl.trip_price + '&tid=' + tl.trip_id + '&tripExperienceName=' + $scope.tripExperience.selectedOption.id + '&tripStatus=' + $scope.tripStatusList.selectedOption.id).success(function (data) 			
		{	

			editTripTPL.hide();
			findtrip();
		 });	
	
		
	};
		
	$scope.hideEditTripDetailTPL = function() {
			editTripTPL.hide();
			findtrip();
	};		
		
	
	$scope.openTravelProfile = function() {
		 $window.open('http://globalworkandtravel.com/travel', '_blank');
	};
	
//upload files
	var uploadFilesTPL = $aside({
        scope: $scope,
        template: '../bookings/tpl/uploadFilesTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-bottom'
    });
	$scope.fileTypeList = {
        availableOptions: [
            {
                id: 'resume',
                name: 'Resume'
            },
            {
                id: 'profile',
                name: 'Profile'
            }
    ],
        selectedOption: {
            id: 'resume',
            name: 'Resume'
        }
    };
	$scope.openToUpload = function() {
		 uploadFilesTPL.show();
	};
	
	$scope.uploadfileButton = function(files) {
		console.log('uploading starting..', files);
	 	if (files) { 
			console.log('there is file');
			
			$scope.upload(files);
		}
	};
	
	$scope.upload = function (file) {
		var paremeter = $routeParams.cid + ' ' + $scope.fileTypeList.selectedOption.id;
            Upload.upload({
                url: '/uploadProfileFile?parameter=' + paremeter, 
				method: 'POST',
                data:{file:file} 
            }).then(function (resp) { 
                if(resp.data.error_code === 0){ //validate success
                    console.log(resp.data.filename);
					saveFileurl(resp.data.filename);
                } else {
                    $window.alert('an error occured');
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) { 
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };
	
	function saveFileurl(filename) { 
		$http.post('/saveFileurl?filename=' + filename + '&cid=' + $routeParams.cid + '&attachedBy=' + $rootScope.name).success(function (data) {	
			console.log(data);
			uploadFilesTPL.hide();
			findFileRecords();
	});
};
	

    function findFileRecords() {
        $http.get('/findFileRecords?cid=' + $routeParams.cid).success(function (data) {
			
			$scope.fileRecords = data;
		});
    };
	
	
	$scope.createPlacementPDF = function () {
		$http.get('/createPlacementPDF?cid=' + $routeParams.cid + '&fname=' + $scope.profile.first_name + '&mname=' + $scope.profile.middle_name + '&lname=' + $scope.profile.last_name + '&gender=' + $scope.profile.gender + '&dob=' + $scope.profile.dob + '&nationality=' + $scope.profile.nationality + '&tripName=' + $scope.profile.trip_experience_name + '&tripLocation=' + $scope.profile.trip_destination + '&tripCode=' + $scope.profile.trip_code + '&tripStartDate=' + $scope.profile.date_departure + '&phone=' + $scope.profile.prefferd_contact_no + '&email=' + $scope.profile.email + '&address=' + $scope.profile.address + '&suburb=' + $scope.profile.suburb + '&state=' + $scope.profile.state + '&country=' + $scope.profile.country + '&postCode=' + $scope.profile.post_code + '&emergencyName=' + $scope.profile.emrg_contact_name + '&emergencyRelationship=' + $scope.profile.emrg_contact_relation + '&emergencyEmail=' + $scope.profile.emrg_contact_email + '&emergencyPhone=' + $scope.profile.emrg_contact_number + '&healthCondition=' + $scope.profile.health_conditions + '&healthConditionDescribe=' + $scope.profile.health_conditions_describe + '&dietary=' + $scope.profile.dietary + '&dietaryDescribe=' + $scope.profile.dietary_describe).success(function (data) {
              
			 console.log(data);  
             $scope.pfurl = data;
                 
        function downloadPlaceformpdf () {
            var s = $rootScope.remoteURL + '/' + $scope.pfurl;
            $window.open(s, '_blank');
        }

        $timeout(downloadPlaceformpdf, 7000); 
			
	  	});
	
	};
	
}]);

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

app.controller('resumeformCtrl', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$attrs', 'Upload','$window', '$timeout','$rootScope', '$aside', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $attrs, Upload, $window, $timeout, $rootScope, $aside) {
    //console.log("welcome", $routeParams.cid);
// $scope.btnId = 'fname'; 
    
$scope.showSpinner = false;
    //check role and redirect for sole roles
    if (($scope.staffRole == 'superadmin') || ($scope.staffRole == 'coordinator') || ($scope.staffRole == 'arrivals')) {
        console.log('works fine');
    } else {
        console.log('no permission dude');
        $location.path("/");
    }


    $scope.id = $routeParams.id;
	$scope.changingFieldArray = [];
	$scope.changingFinalData = [];
	
	var editingResumeButtonsTPL = $aside({
        scope: $scope,
        template: '../coordination/editingResumeButtonsTPL.html',
        show: false,
        placement: 'right',
        backdrop: false,
        animation: 'am-slide-bottom'
    });

    findform();
    function findform() {
        $http.get('/findform?rid=' + $routeParams.id).success(function (data) {

            console.log(data[0]);
            $scope.form = data[0];
           console.log('test photo url here', data[0].photo_url);
            $scope.src = '/' + data[0].photo_url;
            
            //check if file exist locally first, get url response here, success and status 200 if correct url, or error and status 404
            $http.get($scope.src).success(function (data, status) {
                console.log('ac', status);
                
            })
            .error(function(data, status) {
                console.log('bc', status);
                $scope.src = 'http://globalworkandtravel.com/resume/uploads/' + $scope.form.photo_url;
                console.log('test photo url here', $scope.src);
            });
			
			
//action status check
			if ($scope.form.action == 'complete')
				{
					$scope.action = 'complete';
				}else
					{
						$scope.action = 'incomplete';
					}
            $scope.actionChange = function() {
                
				console.log($scope.action);
				$http.post('/updateAction?rid=' + $routeParams.id + '&action=' + $scope.action).success(function (returnDate) {
                        console.log('action status updated'); 
						$scope.form.modified_date = 'just now';
                      });
				
            };		
			
	//*************** new functions start from here ********************
			
			$scope.viewContact = {
                editableValue1: $scope.form.fname,
                editableValue2: $scope.form.mname,
				editableValue3: $scope.form.lname,
				editableValue4: $scope.form.email,
				editableValue5: $scope.form.phoneno,
				editableValue6: $scope.form.skype,
				id1: 'fname',
				id2: 'mname',
				id3: 'lname',
				id4: 'email',
				id5: 'phoneno',
				id6: 'skype'
            };

			$scope.viewIntro = {
                editableValue: $scope.form.introduce,
                id: 'introduce'
            };
			
			$scope.viewObjective = {
                editableValue: $scope.form.objective,
                id: 'objective'
            };
			
			$scope.viewSkills = {
                editableValue: $scope.form.skill1,
                id: 'skill1'
            };
			
			$scope.viewEducation = {
                editableValue1: $scope.form.title1,
                editableValue2: $scope.form.institution1,
				editableValue3: $scope.form.educationfrom1,
				editableValue4: $scope.form.educationto1,
				editableValue5: $scope.form.title2,
				editableValue6: $scope.form.institution2,
				editableValue7: $scope.form.educationfrom2,
				editableValue8: $scope.form.educationto2,
				editableValue9: $scope.form.title3,
				editableValue10: $scope.form.institution3,
				editableValue11: $scope.form.educationfrom3,
				editableValue12: $scope.form.educationto3,
				id1: 'title1',
				id2: 'institution1',
				id3: 'educationfrom1',
				id4: 'educationto1',
				id5: 'title2',
				id6: 'institution2',
				id7: 'educationfrom2',
				id8: 'educationto2',
				id9: 'title3',
				id10: 'institution3',
				id11: 'educationfrom3',
				id12: 'educationto3'
            };			

            $scope.viewCertificates = {
                editableValue: $scope.form.certificate,
                id: 'certificate'
            };
			
			$scope.viewLicenses = {
                editableValue: $scope.form.license,
                id: 'license'
            };

			$scope.viewEmployment = {
                editableValue1: $scope.form.jtitle1,
                editableValue2: $scope.form.cname1,
				editableValue3: $scope.form.cwebsite1,
				editableValue4: $scope.form.jfrom1,
				editableValue5: $scope.form.jto1,
				editableValue6: $scope.form.duty1,//
				editableValue7: $scope.form.jtitle2,
                editableValue8: $scope.form.cname2,
				editableValue9: $scope.form.cwebsite2,
				editableValue10: $scope.form.jfrom2,
				editableValue11: $scope.form.jto2,
				editableValue12: $scope.form.duty2,//
				editableValue13: $scope.form.jtitle3,
                editableValue14: $scope.form.cname3,
				editableValue15: $scope.form.cwebsite3,
				editableValue16: $scope.form.jfrom3,
				editableValue17: $scope.form.jto3,
				editableValue18: $scope.form.duty3,//
				editableValue19: $scope.form.jtitle4,
                editableValue20: $scope.form.cname4,
				editableValue21: $scope.form.cwebsite4,
				editableValue22: $scope.form.jfrom4,
				editableValue23: $scope.form.jto4,
				editableValue24: $scope.form.duty4,//
				editableValue25: $scope.form.jtitle5,
                editableValue26: $scope.form.cname5,
				editableValue27: $scope.form.cwebsite5,
				editableValue28: $scope.form.jfrom5,
				editableValue29: $scope.form.jto5,
				editableValue30: $scope.form.duty5,
				id1: 'jtitle1',
				id2: 'cname1',
				id3: 'cwebsite1',
				id4: 'jfrom1',
				id5: 'jto1',
				id6: 'duty1',//
				id7: 'jtitle2',
				id8: 'cname2',
				id9: 'cwebsite2',
				id10: 'jfrom2',
				id11: 'jto2',
				id12: 'duty2',//
				id13: 'jtitle3',
				id14: 'cname3',
				id15: 'cwebsite3',
				id16: 'jfrom3',
				id17: 'jto3',
				id18: 'duty3',//
				id19: 'jtitle4',
				id20: 'cname4',
				id21: 'cwebsite4',
				id22: 'jfrom4',
				id23: 'jto4',
				id24: 'duty4',//
				id25: 'jtitle5',
				id26: 'cname5',
				id27: 'cwebsite5',
				id28: 'jfrom5',
				id29: 'jto5',
				id30: 'duty5'
            };
			

			
			
			
			$scope.enableEditorButtons = function(field) {
				
				if($scope.changingFieldArray.indexOf(field) === -1)
					{		
						$scope.changingFieldArray.push(field);
					}
                editingResumeButtonsTPL.show();
				console.log($scope.changingFieldArray);
            };	
			
			
			$scope.cancelResumeChange = function() {
                editingResumeButtonsTPL.hide();
				console.log('cancel profile changes');
							
				$scope.viewContact.editableValue1 = $scope.form.fname;
				$scope.viewContact.editableValue2 = $scope.form.mname;
				$scope.viewContact.editableValue3 = $scope.form.lname;
				$scope.viewContact.editableValue4 = $scope.form.email;
				$scope.viewContact.editableValue5 = $scope.form.phoneno;
				$scope.viewContact.editableValue6 = $scope.form.skype;
				
				$scope.viewIntro.editableValue = $scope.form.introduce;
				
				$scope.viewObjective.editableValue = $scope.form.objective;
				
				$scope.viewSkills.editableValue = $scope.form.skill1;
				
				$scope.viewEducation.editableValue1 = $scope.form.title1;
				$scope.viewEducation.editableValue2 = $scope.form.institution1;
				$scope.viewEducation.editableValue3 = $scope.form.educationfrom1;
				$scope.viewEducation.editableValue4 = $scope.form.educationto1;
				$scope.viewEducation.editableValue5 = $scope.form.title2;
				$scope.viewEducation.editableValue6 = $scope.form.institution2;
				$scope.viewEducation.editableValue7 = $scope.form.educationfrom2;
				$scope.viewEducation.editableValue8 = $scope.form.educationto2;
				$scope.viewEducation.editableValue9 = $scope.form.title3;
				$scope.viewEducation.editableValue10 = $scope.form.institution3;
				$scope.viewEducation.editableValue11 = $scope.form.educationfrom3;
				$scope.viewEducation.editableValue12 = $scope.form.educationto3;
				
				$scope.viewCertificates.editableValue = $scope.form.certificate;
				
				$scope.viewLicenses.editableValue = $scope.form.license;
				
				$scope.viewEmployment.editableValue1 = $scope.form.jtitle1;
				$scope.viewEmployment.editableValue2 = $scope.form.cname1;
				$scope.viewEmployment.editableValue3 = $scope.form.cwebsite1;
				$scope.viewEmployment.editableValue4 = $scope.form.jfrom1;
				$scope.viewEmployment.editableValue5 = $scope.form.jto1;
				$scope.viewEmployment.editableValue6 = $scope.form.duty1;
				$scope.viewEmployment.editableValue7 = $scope.form.jtitle2;
				$scope.viewEmployment.editableValue8 = $scope.form.cname2;
				$scope.viewEmployment.editableValue9 = $scope.form.cwebsite2;
				$scope.viewEmployment.editableValue10 = $scope.form.jfrom2;
				$scope.viewEmployment.editableValue11 = $scope.form.jto2;
				$scope.viewEmployment.editableValue12 = $scope.form.duty2;	
				$scope.viewEmployment.editableValue13 = $scope.form.jtitle3;
				$scope.viewEmployment.editableValue14 = $scope.form.cname3;
				$scope.viewEmployment.editableValue15 = $scope.form.cwebsite3;
				$scope.viewEmployment.editableValue16 = $scope.form.jfrom3;
				$scope.viewEmployment.editableValue17 = $scope.form.jto3;
				$scope.viewEmployment.editableValue18 = $scope.form.duty3;
				$scope.viewEmployment.editableValue19 = $scope.form.jtitle4;
				$scope.viewEmployment.editableValue20 = $scope.form.cname4;
				$scope.viewEmployment.editableValue21 = $scope.form.cwebsite4;
				$scope.viewEmployment.editableValue22 = $scope.form.jfrom4;
				$scope.viewEmployment.editableValue23 = $scope.form.jto4;
				$scope.viewEmployment.editableValue24 = $scope.form.duty4;
				$scope.viewEmployment.editableValue25 = $scope.form.jtitle5;
				$scope.viewEmployment.editableValue26 = $scope.form.cname5;
				$scope.viewEmployment.editableValue27 = $scope.form.cwebsite5;
				$scope.viewEmployment.editableValue28 = $scope.form.jfrom5;
				$scope.viewEmployment.editableValue29 = $scope.form.jto5;
				$scope.viewEmployment.editableValue30 = $scope.form.duty5;
					
				$scope.changingFieldArray = [];
				$scope.changingFinalData = [];
  
            };
			
			
			$scope.saveResumeChange = function() {
                $scope.showSpinner = true;
				console.log('saving resume changes starting..');
				$scope.saveContact();
				$scope.saveIntro();
				$scope.saveObjective();
				$scope.saveSkills();
				$scope.saveEducation();
				$scope.saveCertificates();
				$scope.saveLicenses();
				$scope.saveEmployment();
						
				console.log($scope.changingFieldArray);
				
				for (var i=0; i<$scope.changingFieldArray.length; i++)
					{
						var one = {};
						one.field = $scope.changingFieldArray[i];
						one.value = $scope.form[one.field];
                        
                        console.log('original value', one.value);
                        one.value = one.value.replace(/&/g, "specialCharacter");//?  
                        one.value = one.value.replace(/%/g, "htmlemtity2");//?
                        one.value = one.value.replace(/#/g, "htmlemtity3");//?
                        
//                        one.value = one.value.replace(/"/g, "");//?
                        
                        console.log('new value', one.value);
       
						one.rid = $routeParams.id;
						$scope.changingFinalData.push(one);
						
					}
				console.log('final object', $scope.changingFinalData);
			
				var changingFinalDataJSON = JSON.stringify($scope.changingFinalData); 
                console.log('json is ', changingFinalDataJSON);
//                //skip some symbols here
//    changingFinalDataJSON = changingFinalDataJSON.replace(/&amp;/g, "12345");//&
//    changingFinalDataJSON = changingFinalDataJSON.replace(/&#34;/g, "123456");//"
//    changingFinalDataJSON = changingFinalDataJSON.replace(/%/g, "1234567");//%
//    changingFinalDataJSON = changingFinalDataJSON.replace(/&lt;/g, "12345678");//<
//    changingFinalDataJSON = changingFinalDataJSON.replace(/&gt;/g, "123456789");//>   
//    changingFinalDataJSON = changingFinalDataJSON.replace(/&#13;/g, "htmlsymboltab");//tab symbol

                
                
                
//        $http({
//          method  : 'POST',
//          url     : '/updateResumeChangedData',
//          data    : changingFinalDataJSON, //??
//          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
//         })
//          .success(function(data) {
//            if (data.errors) {
//              // Showing errors.
//             
//            } else {
//             
//            }
//          });
                
				$http.post('/updateResumeChangedData?changingFinalDataJSON=' + changingFinalDataJSON).success(function (datar) {
                    console.log(datar);	
                    $rootScope.startAlert('success', 'Success', 'Updated Successfully!');
					editingResumeButtonsTPL.hide();
					$scope.changingFieldArray = [];
					$scope.changingFinalData = [];
					$scope.showSpinner = false;
					
					
                      });
				
            };

					
			$scope.saveContact = function() {
                $scope.form.fname = $scope.viewContact.editableValue1;
                $scope.form.mname = $scope.viewContact.editableValue2;
                $scope.form.lname = $scope.viewContact.editableValue3;
                $scope.form.email = $scope.viewContact.editableValue4;
                $scope.form.phoneno = $scope.viewContact.editableValue5;
                $scope.form.skype = $scope.viewContact.editableValue6;
            };
			
			$scope.saveIntro = function() {
                $scope.form.introduce = $scope.viewIntro.editableValue;
            };
			
			$scope.saveObjective = function() {
                $scope.form.objective = $scope.viewObjective.editableValue;
            };
			
			$scope.saveSkills = function() {
                $scope.form.skill1 = $scope.viewSkills.editableValue;
            };
			
			$scope.saveEducation = function() {
                $scope.form.title1 = $scope.viewEducation.editableValue1;
                $scope.form.institution1 = $scope.viewEducation.editableValue2;
                $scope.form.educationfrom1 = $scope.viewEducation.editableValue3;
                $scope.form.educationto1 = $scope.viewEducation.editableValue4;
                $scope.form.title2 = $scope.viewEducation.editableValue5;
                $scope.form.institution2 = $scope.viewEducation.editableValue6;
                $scope.form.educationfrom2 = $scope.viewEducation.editableValue7;
                $scope.form.educationto2 = $scope.viewEducation.editableValue8;
                $scope.form.title3 = $scope.viewEducation.editableValue9;
                $scope.form.institution3 = $scope.viewEducation.editableValue10;
                $scope.form.educationfrom3 = $scope.viewEducation.editableValue11;
                $scope.form.educationto3 = $scope.viewEducation.editableValue12;
            };
			
			$scope.saveCertificates = function() {
                $scope.form.certificate = $scope.viewCertificates.editableValue;
            };
			
			$scope.saveLicenses = function() {
                $scope.form.license = $scope.viewLicenses.editableValue;
            };
			
			$scope.saveEmployment = function() {
                $scope.form.jtitle1 = $scope.viewEmployment.editableValue1;
                $scope.form.cname1 = $scope.viewEmployment.editableValue2;
                $scope.form.cwebsite1 = $scope.viewEmployment.editableValue3;
                $scope.form.jfrom1 = $scope.viewEmployment.editableValue4;
                $scope.form.jto1 = $scope.viewEmployment.editableValue5;
                $scope.form.duty1 = $scope.viewEmployment.editableValue6;
				
                $scope.form.jtitle2 = $scope.viewEmployment.editableValue7;
                $scope.form.cname2 = $scope.viewEmployment.editableValue8;
                $scope.form.cwebsite2 = $scope.viewEmployment.editableValue9;
                $scope.form.jfrom2 = $scope.viewEmployment.editableValue10;
                $scope.form.jto2 = $scope.viewEmployment.editableValue11;
                $scope.form.duty2 = $scope.viewEmployment.editableValue12;
				
				$scope.form.jtitle3 = $scope.viewEmployment.editableValue13;
				$scope.form.cname3 = $scope.viewEmployment.editableValue14;
				$scope.form.cwebsite3 = $scope.viewEmployment.editableValue15;
				$scope.form.jfrom3 = $scope.viewEmployment.editableValue16;
				$scope.form.jto3 = $scope.viewEmployment.editableValue17;
				$scope.form.duty3 = $scope.viewEmployment.editableValue18;
				
				$scope.form.jtitle4 = $scope.viewEmployment.editableValue19;
				$scope.form.cname4 = $scope.viewEmployment.editableValue20;
				$scope.form.cwebsite4 = $scope.viewEmployment.editableValue21;
				$scope.form.jfrom4 = $scope.viewEmployment.editableValue22;
				$scope.form.jto4 = $scope.viewEmployment.editableValue23;
				$scope.form.duty4 = $scope.viewEmployment.editableValue24;
				
				$scope.form.jtitle5 = $scope.viewEmployment.editableValue25;
				$scope.form.cname5 = $scope.viewEmployment.editableValue26;
				$scope.form.cwebsite5 = $scope.viewEmployment.editableValue27;
				$scope.form.jfrom5 = $scope.viewEmployment.editableValue28;
				$scope.form.jto5 = $scope.viewEmployment.editableValue29;
				$scope.form.duty5 = $scope.viewEmployment.editableValue30;
            };

//*************** new functions end here ********************
       
            
            //edit image
            $scope.viewIMG = {
//                editableValue: $scope.src,
                editorEnabled: false
            };

            $scope.enableEditorIMG = function() {
                $scope.viewIMG.editorEnabled = true;
//                $scope.viewIMG.editableValue = $scope.src;
            };

            $scope.disableEditorIMG = function() {
                $scope.viewIMG.editorEnabled = false;
//                $scope.src = 'http://globalworkandtravel.com/resume/uploads/' + data[0].photo_url;
            };

            $scope.saveIMG = function(upload_form) {
//                $scope.src = 'http://globalworkandtravel.com/resume/uploads/' + data[0].photo_url;
                
                $scope.disableEditorIMG();
                console.log('avc test');
                var col = 'photo_url';
                var element = 'abctest';
//                update(col, element);
             
                //upload
            if (upload_form.file.$valid && $scope.file) { //check if from is valid
                console.log('hello ');
                upload($scope.file); //call upload function
            }
                           
            function upload(file) {
                console.log('upload test here');
            Upload.upload({
                url: '/uploadpicture', //webAPI exposed to upload the file, different in server, need to change later			 
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
               console.log('test response after upload', resp.data.error_code);
                if(resp.data.error_code === 1){ //validate success
                   
                     $window.alert('an error occured');
                } else {
//                    $window.alert('Success ' + resp.config.data.file.name + ' uploaded. Response: ');
                    console.log(resp.data.filename);
                    
                    $http.post('/savefilename?fn=' + resp.data.filename + '&rid=' + $routeParams.id).success(function (data) {
                        console.log('updated file into database successfully');
						$scope.form.modified_date = 'just now';
                        $scope.src = '/' + resp.data.filename;//need to change in server using
                    });
                            
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) { 
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });            
        };   
                
                
            };

			
			
             //cancel education
            
            if((!$scope.form.title2) && (!$scope.form.institution2) && (!$scope.form.educationfrom2) && (!$scope.form.educationto2))
                {
					$scope.cancelalleducation2 = function() {
						$scope.hideEducation2 = true;
					};
                }
            
            if((!$scope.form.title3) && (!$scope.form.institution3) && (!$scope.form.educationfrom3) && (!$scope.form.educationto3))
                {
                    $scope.cancelalleducation3 = function() {
						$scope.hideEducation3 = true;
					};
                }
			
            //cancel employment

            if ((!$scope.form.jtitle2) && (!$scope.form.cname2) && (!$scope.form.cwebsite2) && (!$scope.form.jfrom2) && (!$scope.form.jto2) && (!$scope.form.duty2))
                {
                    $scope.cancelallemployment2 = function() {
                            $scope.hideEmployment2 = true;
                        };
                }
            
			
			if ((!$scope.form.jtitle3) && (!$scope.form.cname3) && (!$scope.form.cwebsite3) && (!$scope.form.jfrom3) && (!$scope.form.jto3) && (!$scope.form.duty3))
                {
                    $scope.cancelallemployment3 = function() {
                            $scope.hideEmployment3 = true;
                        };
                }
			
            
			if ((!$scope.form.jtitle4) && (!$scope.form.cname4) && (!$scope.form.cwebsite4) && (!$scope.form.jfrom4) && (!$scope.form.jto4) && (!$scope.form.duty4))
                {
                    $scope.cancelallemployment4 = function() {
                            $scope.hideEmployment4 = true;
                        };
                }
            
                        
			if ((!$scope.form.jtitle5) && (!$scope.form.cname5) && (!$scope.form.cwebsite5) && (!$scope.form.jfrom5) && (!$scope.form.jto5) && (!$scope.form.duty5))
                {
                     $scope.cancelallemployment5 = function() {
                            $scope.hideEmployment5 = true;
                        };
                }

            
            //education2
            if((data[0].title2) || (data[0].institution2) || (data[0].educationfrom2) || (data[0].educationto2))
                {
                    $scope.hideEducation2 = false;
					$scope.hideEC2 = true;
                }
            else
                {
                    $scope.hideEducation2 = true;
					$scope.hideEC2 = false;
                }
            

            
            //education3
            if((data[0].title3) || (data[0].institution3) || (data[0].educationfrom3) || (data[0].educationto3))
                {
                    $scope.hideEducation3 = false;
					$scope.hideEC3 = true;
                }
            else
                {
                    $scope.hideEducation3 = true;
					$scope.hideEC3 = false;
                }
            

            
           //employment2
            if((data[0].jtitle2) || (data[0].cname2) || (data[0].cwebsite2) || (data[0].jfrom2) || (data[0].jto2) || (data[0].duty2))
                {
                    $scope.hideEmployment2 = false;
					$scope.hideEPC2 = true;
                }
            else
                {
                    $scope.hideEmployment2 = true; 
					$scope.hideEPC2 = false;
                }
            

            
            //employment3
            if((data[0].jtitle3) || (data[0].cname3) || (data[0].cwebsite3) || (data[0].jfrom3) || (data[0].jto3) || (data[0].duty3))
                {
                    $scope.hideEmployment3 = false;
					$scope.hideEPC3 = true;
                }
            else
                {
                    $scope.hideEmployment3 = true;
					$scope.hideEPC3 = false;
                }
            
            
            //employment4
            if((data[0].jtitle4) || (data[0].cname4) || (data[0].cwebsite4) || (data[0].jfrom4) || (data[0].jto4) || (data[0].duty4))
                {
                    $scope.hideEmployment4 = false;
					$scope.hideEPC4 = true;
                }
            else
                {
                    $scope.hideEmployment4 = true;
					$scope.hideEPC4 = false;
                }

            
            //employment5
            if((data[0].jtitle5) || (data[0].cname5) || (data[0].cwebsite5) || (data[0].jfrom5) || (data[0].jto5) || (data[0].duty5))
                {
                    $scope.hideEmployment5 = false;
					$scope.hideEPC5 = true;
                }
            else
                {
                    $scope.hideEmployment5 = true;
					$scope.hideEPC5 = false;
                }
            

            $scope.addoneEducation = function() {
                if ($scope.hideEducation2 == true)
                    {
                        $scope.hideEducation2 = false;

                        
                    }else if ($scope.hideEducation3 == true)
                        {
                            $scope.hideEducation3 = false;

                        }else
                            {
                                console.log('mate, 3 education is enough here');
                            }
            };
            
			$scope.addoneEmployment = function() {
                if ($scope.hideEmployment2 == true)
                    {
                        $scope.hideEmployment2 = false;
                         
                    }else if ($scope.hideEmployment3 == true)
                        {
                            $scope.hideEmployment3 = false;
                        
                            
                        }else if ($scope.hideEmployment4 == true)
                            {
                                $scope.hideEmployment4 = false;
                                
                            }else if ($scope.hideEmployment5 == true)
                                {
                                    $scope.hideEmployment5 = false;
                                    
                                }
                            
            };

            
            $scope.createpdf = function() {
                         $http.post('/createpdf?rid=' + $routeParams.id + '&url=' + $scope.src).success(function (data) {
                         console.log(data);  
                             $scope.dd = data;
         //download it                    
        function downloadpdf () {
            var s = $rootScope.remoteURL + '/' + $scope.dd;//'http://localhost:3000/' + $scope.dd;
            $window.open(s, '_blank');//fix later url
        }

        $timeout(downloadpdf, 7000); 
     
//          $timeout(function () {
//    downloadpdf(data);
//}, 7000);                   
//                            
                      });
            };
            
        });
    };

    function formatdate(element) { 
            
            var array = element.split("-");
                if(array[0] == '01')
                    {
                        element = 'January-' + array[1];
                    }else if (array[0] == '02')
                    {
                        element = 'February-' + array[1];
                    }else if (array[0] == '03')
                    {
                        element = 'March-' + array[1];
                    }else if (array[0] == '04')
                    {
                        element = 'April-' + array[1];
                    }else if (array[0] == '05')
                    {
                        element = 'May-' + array[1];
                    }else if (array[0] == '06')
                    {
                        element = 'June-' + array[1];
                    }else if (array[0] == '07')
                    {
                        element = 'July-' + array[1];
                    }else if (array[0] == '08')
                    {
                        element = 'August-' + array[1];
                    }else if (array[0] == '09')
                    {
                        element = 'September-' + array[1];
                    }else if (array[0] == '10')
                    {
                        element = 'October-' + array[1];
                    }else if (array[0] == '11')
                    {
                        element = 'November-' + array[1];
                    }else if (array[0] == '12')
                    {
                        element = 'December-' + array[1];
                    }
             return element;
     };
    
    
//    function update(col, element) { 
//         $http.post('/updatecol?rid=' + $routeParams.id + '&col=' + col + '&element=' + element).success(function (data) {
//			 			$scope.form.modified_date = 'just now';
//                         console.log('data updated');   
//                      });
//     
//     }; 
	
// $scope.location = {
//        state: "California",
//        city: "San Francisco",
//        neighbourhood: "Alamo Square"
//    };
//   
            
 
	
	
	
	
	
//test $interval
//	$interval(updateTime, 50000);//50 second
//	function updateTime() {
//			 $http.get('/testcall').success(function (data) {
//			 			
//                         console.log('data number is:', data.length);   
//                      });
//		
//		 }; 
	
	



}]);

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

app.controller('searchCtrl', ['$scope', '$http', '$routeParams', '$location', function ($scope, $http, $routeParams, $location) {

   $scope.a = 'abcv';
    

}]);

app.controller('testController', ['$scope', '$http', '$interval', '$filter', 'NgTableParams', '$routeParams', '$location', '$timeout', 'promiseTracker', '$rootScope', function ($scope, $http, $interval, $filter, NgTableParams, $routeParams, $location, $timeout, promiseTracker, $rootScope) {

 
	testMongoose();
    function testMongoose() {
		

		
		
        $http.get('/testMongoose').success(function (data) {
			console.log('hello mongoose');
			

        });
    };


//	testp();
//    function testp() {
//        $http.get('/testp').success(function (data) {
//			
//			console.log(data.length);
//		
//					 for (i = 0; i < 2; i++) 
//						 {
////							 window.print({bUI: false, bSilent: true, bShrinkToFit: true});
//							 myWindow=window.open("../../pdf/testPDF.html");
//							 myWindow.close;  //optional, to close the new window as soon as it opens
//						 }
//				
//
//        });
//    };
//    


 }]);

app.controller('usersCtrl', ['$scope', '$window', '$aside', '$http', '$location', '$rootScope', '$route', function ($scope, $window, $aside, $http, $location, $rootScope, $route) {

    //check role and redirect for sole roles
    if ($scope.staffRole == 'superadmin') {
        console.log('hello super admin');
    } else {
        console.log('you are not super admin');
        $location.path("/");
    }



    // settings
    $scope.settings = {
        singular: 'User',
        plural: 'Users',
        cmd: 'Add'
    };


    $scope.roleselect = {
        availableOptions: [
            {
                id: 'admin',
                name: 'admin'
            },
            {
                id: 'travel',
                name: 'travel'
            },
            {
                id: 'coordinator',
                name: 'coordinator'
            },
            {
                id: 'finance',
                name: 'finance'
            },
            {
                id: 'compliance',
                name: 'compliance'
            },
            {
                id: 'superadmin',
                name: 'superadmin'
            },
            {
                id: 'sales',
                name: 'sales'
            },
			{
                id: 'arrivals',
                name: 'arrivals'
            },
            {
                id: 'cancellation',
                name: 'cancellation'
            }
    ],
        selectedOption: {
            id: 'admin',
            name: 'admin'
        }
    };
        $scope.officeselect = {
        availableOptions: [
            {
                id: 'australia',
                name: 'australia'
            },
            {
                id: 'canada',
                name: 'canada'
            },
            {
                id: 'uk',
                name: 'uk'
            }
    ],
        selectedOption: {
            id: 'australia',
            name: 'australia'
        }
    };





    findUsers();

    function findUsers() {
        $http.get('/findUsers').success(function (data2) {
            console.log(data2);
            $scope.data = data2;



        });
    };
    // adding demo data
    //    var data = [];
    //    for (var i = 1; i <= 90; i++) {
    //        data.push({
    //            icon: PlaceholderTextService.createIcon(true),
    //            firstname: PlaceholderTextService.createFirstname(),
    //            lastname: PlaceholderTextService.createLastname(),
    //            paragraph: PlaceholderTextService.createSentence()
    //        });
    //    }
    //    $scope.data = data;

    // defining template
    var formTpl = $aside({
        scope: $scope,
        template: '../setting/users-form.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-left'
    });
    
        // defining edit template
    var formEditTpl = $aside({
        scope: $scope,
        template: '../setting/edit.html',
        show: false,
        placement: 'left',
        backdrop: false,
        animation: 'am-slide-bottom'
    });

    // methods
    $scope.checkAll = function () {
        angular.forEach($scope.data, function (item) {
            item.selected = !item.selected;
        });
    };

    $scope.editItem = function (item) {
        if (item) {
            item.editing = true;
            $scope.item = item;
           
            $scope.roleselect.selectedOption.name = item.role;
            $scope.roleselect.selectedOption.id = item.role;
            $scope.officeselect.selectedOption.name = item.office;
            $scope.officeselect.selectedOption.id = item.office;
            console.log('this item need to be edited:', item.email, item.id);
            $scope.settings.cmd = 'Edit';
            console.log($scope.settings.cmd);
            $scope.editconfirm = true;
//            showForm();
            showEditForm();
        }
    };

    $scope.changeP = function (item) {
        if (item) {
            item.editing = true;
            item.hide = true;
            $scope.item = item;
            $scope.item.password = '';
            $scope.settings.cmd = 'changeP';
            showForm();
        }
    };

    $scope.viewItem = function (item) {
        if (item) {
            item.editing = false;
            item.hide = false;
            $scope.item = item;
            $scope.roleselect.selectedOption.name = item.role;
            $scope.roleselect.selectedOption.id = item.role;
            $scope.officeselect.selectedOption.name = item.office;
            $scope.officeselect.selectedOption.id = item.office;
            $scope.settings.cmd = 'View';
            showForm();
        }
    };

    $scope.createItem = function () {
        //showForm();
        var item = {
            editing: true,
            hide: false
        };
        $scope.item = item;
        $scope.settings.cmd = 'New';
        showForm();
    };

    $scope.saveItem = function () {
        console.log($scope.settings.cmd);
        if ($scope.settings.cmd == 'New') {
            if($scope.item.password == $scope.item.repeatedpassword)
                {
                  $http.post('/addUser?f=' + $scope.item.first_name + '&l=' + $scope.item.last_name + '&r=' + $scope.roleselect.selectedOption.name + '&o=' + $scope.officeselect.selectedOption.name + '&e=' + $scope.item.email + '&p=' + $scope.item.password).success(function (data10) {
                $scope.item.role = $scope.roleselect.selectedOption.name;
                $scope.item.office = $scope.officeselect.selectedOption.name;
                $scope.data.push($scope.item);
                $rootScope.startAlert('success', 'Success', 'Well done! You have successfully added a new user.', 'md md-done');
                console.log(data10);
                hideForm();

            });
                }else
                    {
                        $rootScope.startAlert('danger', 'Error', 'Please check the password and type again', 'md md-error');
                         hideForm();
                    }

        }




        if ($scope.settings.cmd == 'changeP') {
            
             if($scope.item.password == $scope.item.repeatedpassword)
                 {
                                 $http.post('/changePassword?p=' + $scope.item.password + '&e=' + $scope.item.email).success(function (data12) {
                $rootScope.startAlert('success', 'Success', 'Well done! You have successfully changes the password.', 'md md-done');
                //console.log(data12);
                hideForm();

            });
                 }else
                     {
                          $rootScope.startAlert('danger', 'Error', 'Please confirm your password', 'md md-error');
                         hideForm();
                     }
                 


        }

    };
    
    $scope.saveEditItem = function () {
        console.log('for editing test');
        console.log($scope.settings.cmd);


        if ($scope.settings.cmd == 'Edit') {
            console.log('time to edit');

            $http.post('/editUser?f=' + $scope.item.first_name + '&l=' + $scope.item.last_name + '&r=' + $scope.roleselect.selectedOption.name + '&o=' + $scope.officeselect.selectedOption.name + '&e=' + $scope.item.email + '&id=' + $scope.item.id).success(function (data11) {
                //edit front end table later
                $rootScope.startAlert('success', 'Success', 'Well done! You have successfully edited this user info.', 'md md-done');
                //console.log(data11);
//                hideEditForm();
               $route.reload();//reload the ng view

            });
        }




    };

    $scope.remove = function (item) {


        if (confirm('Are you sure?')) {
            if (item) {

                console.log('test here', item.email);
                $http.post('/deleteUser?email=' + item.email).success(function (data3) {
                    $rootScope.startAlert('info', 'Success', 'You have just successfully deleted a user.', 'md md-done');
                    $scope.data.splice($scope.data.indexOf(item), 1);
                });

            } else {
                console.log(item, 'testha');
                $rootScope.startAlert('info', 'Success', 'You have just successfully removed multiple users.', 'md md-done');
                $scope.data = $scope.data.filter(
                    function (item) {
                        if (item.selected) {

                            $http.post('/deleteUser?email=' + item.email).success(function (data3) {

                                console.log(item.first_name, 'deleted');
                            });
                        }
                        
                        return !item.selected;
                    }
                   
                  
                );
                console.log('test 2 here');
                $scope.selectAll = false;
                  
            }
        }
    };

    showForm = function () {
        angular.element('.tooltip').remove();
        formTpl.show();
    };
    
    showEditForm = function () {
        angular.element('.tooltip').remove();
        formEditTpl.show();
    };

    hideForm = function () {
        formTpl.hide();
    };
    
        hideEditForm = function () {
        formEditTpl.hide();
    };

    $scope.$on('$destroy', function () {
        hideForm();
        hideEditForm();
    });




}]);

app.controller('wronglocationCtrl', ['$scope', '$http', '$interval', '$filter', '$routeParams', '$location', '$timeout', function ($scope, $http, $interval, $filter, $routeParams, $location, $timeout) {







 }]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider //this format is working with compiled javascript
        .when('/customer', {
            //controller: "customersCtrl",
            templateUrl: "../bookings/customer.html"
        })
        .when('/viewProfile/:cid', {
//            controller: "profileCtrl", //dont need to claim the controller if already claim it in the ng-view page
            templateUrl: "../bookings/profile.html"
        })
        .when('/searchcc', {
            //controller: "customersCtrl",
            templateUrl: "../bookings/searchcc.html"
        })
        .when('/newCustomer', {
            //controller: "customersCtrl",
            templateUrl: "../payment/newCustomer.html"
        })
        .when('/addPayment', {
            //controller: "customersCtrl",
            templateUrl: "../payment/addPayment.html"
        })
        .when('/searchPayment', {
            //controller: "customersCtrl",
            templateUrl: "../payment/searchPayment.html"
        })
        .when('/compliance', {
            //controller: "customersCtrl",
            templateUrl: "../compliance/compliance.html"
        })
        .when('/listInCompliance', {
            //controller: "customersCtrl",
            templateUrl: "../compliance/listInCompliance.html"
        })
	    .when('/listAllCompliance', {
            //controller: "customersCtrl",
            templateUrl: "../compliance/listAllCompliance.html"
        })
       .when('/resume', {
            //controller: "customersCtrl",
            templateUrl: "../coordination/resume.html"
        })
        .when('/viewForm/:id', {
            //controller: "customerCtrl",
            templateUrl: "../coordination/form.html"
        })
        .when('/viewDetails/:cid/:qid', {
            templateUrl: "../compliance/complianceDetails.html"
        })
        .when('/users', {
            //controller: "customersCtrl",
            templateUrl: "../setting/users.html"
        })
	    .when('/bookings', {
            //controller: "customersCtrl",
            templateUrl: "../sales/bookings.html"
        })
		.when('/adminbookings', {
            //controller: "customersCtrl",
            templateUrl: "../admin/adminbookings.html"
        })
		.when('/commission', {
            //controller: "customersCtrl",
            templateUrl: "../sales/commission.html"
        })
		.when('/payroll', {
            //controller: "customersCtrl",
            templateUrl: "../sales/payroll.html"
        })
        .when('/', {
            //controller: "customersCtrl",
            templateUrl: "../dashboard.html"
        })
	    .when('/test', {
            //controller: "customersCtrl",
            templateUrl: "test.html"
        })
        .otherwise({
            templateUrl: "../dashboard.html" 
        });
    //$locationProvider.baseHref = "localhost:3000";
    //$locationProvider.html5Mode(true);

}]);

// loading bar settings
app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false; //delete the spinner icon  on the top
    cfpLoadingBarProvider.latencyThreshold = 300;
}]);

// disable nganimate with adding class
app.config(['$animateProvider', function ($animateProvider) {
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
}]);






//app.config(function($typeaheadProvider) {
//  angular.extend($typeaheadProvider.defaults, {
////change position here later
//  });
//})
