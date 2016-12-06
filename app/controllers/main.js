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
