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
