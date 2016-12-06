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