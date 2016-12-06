'use strict';
(function (window, angular) {
  angular.module('ngPopupBoxes', ['ui.bootstrap'])
    .factory('PopupBoxes', ['$modal', '$q', function ($modal, $q) {
      return {
        alert: function (message, okButtonText) {
          if (angular.isUndefined(message)) {
            return;
          }
          var options = {
            message: message,
            okButtonText: okButtonText || 'Ok'
          };
          var defer = $q.defer();
          var modalInstance = $modal.open({
            backdrop: false,
            keyboard: false,
            templateUrl: 'alert.html',
            resolve: {
              options: function () {
                return options;
              }
            },
            controller: [
              '$scope',
              '$modalInstance',
              'options',
              function ($scope, $modalInstance, options) {
                $scope.options = angular.copy(options);
                $scope.ok = function () {
                  $modalInstance.close('ok');
                };
              }
            ]
          });
          modalInstance.result.then(function (data) {
            defer.resolve(data);
          }, function () {
            defer.reject();
          });
          return defer.promise;
        },
        confirm: function (message, okButtonText, cancelButtonText) {
          if (angular.isUndefined(message)) {
            return;
          }
          var options = {
            message: message,
            okButtonText: okButtonText || 'Ok',
            cancelButtonText: cancelButtonText || 'Cancel'
          };
          var defer = $q.defer();
          var modalInstance = $modal.open({
            backdrop: false,
            templateUrl: 'confirm.html',
            resolve: {
              options: function () {
                return options;
              }
            },
            controller: [
              '$scope',
              '$modalInstance',
              'options',
              function ($scope, $modalInstance, options) {
                $scope.options = angular.copy(options);
                $scope.ok = function () {
                  $modalInstance.close('ok');
                };
                $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
                };
                $scope.close = function () {
                  $modalInstance.dismiss('close');
                };
              }
            ]
          });
          modalInstance.result.then(function (data) {
            defer.resolve(data);
          }, function () {
            defer.reject();
          });
          return defer.promise;
        },
        prompt: function (label, placeholder, okButtonText, cancelButtonText) {
          if (angular.isUndefined(label) || angular.isUndefined(label)) {
            return;
          }
          var options = {
            label: label,
            placeholder: placeholder,
            okButtonText: okButtonText || 'Ok',
            cancelButtonText: cancelButtonText || 'Cancel'
          };
          var defer = $q.defer();
          var modalInstance = $modal.open({
            backdrop: false,
            templateUrl: 'prompt.html',
            resolve: {
              options: function () {
                return options;
              }
            },
            controller: [
              '$scope',
              '$modalInstance',
              'options',
              function ($scope, $modalInstance, options) {
                $scope.options = angular.copy(options);
                $scope.result = {value: null};
                $scope.ok = function () {
                  $modalInstance.close($scope.result.value);
                };
                $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
                };
                $scope.close = function () {
                  $modalInstance.dismiss('close');
                };
              }
            ]
          });
          modalInstance.result.then(function (data) {
            defer.resolve(data);
          }, function () {
            defer.reject();
          });
          return defer.promise;
        },
        confirmLeave: function (leaveButtonText, stayButtonText) {
          var options = {
            message: 'This page is asking you to confirm that you want to leave - data you have entered may not be saved.',
            leaveButtonText: leaveButtonText || 'Leave Page',
            stayButtonText: stayButtonText || 'Stay on Page'
          };
          var defer = $q.defer();
          var modalInstance = $modal.open({
            backdrop: false,
            templateUrl: 'confirm-leave.html',
            resolve: {
              options: function () {
                return options;
              }
            },
            controller: [
              '$scope',
              '$modalInstance',
              'options',
              function ($scope, $modalInstance, options) {
                $scope.options = angular.copy(options);
                $scope.leave = function () {
                  $modalInstance.close('leave');
                };
                $scope.stay = function () {
                  $modalInstance.dismiss('cancel');
                };
                $scope.close = function () {
                  $modalInstance.dismiss('close');
                };
              }
            ]
          });
          modalInstance.result.then(function (data) {
            defer.resolve(data);
          }, function () {
            defer.reject();
          });
          return defer.promise;
        }
      };
    }])
    .run(['$templateCache', function ($templateCache) {
      $templateCache.put('alert.html', '<div class="modal-header">\n  <h3 class="modal-title">Alert</h3>\n</div>\n<div class="modal-body">\n  {{options.message}}\n</div>\n<div class="modal-footer">\n  <button class="btn btn-primary" ng-click="ok()">{{options.okButtonText}}\n  </button>\n</div>');
      $templateCache.put('confirm.html', '<div class="modal-header">\n  <button type="button" class="close" ng-click="close()">\n    <span aria-hidden="true">&times;</span>\n    <span class="sr-only">Close</span>\n  </button>\n  <h3 class="modal-title">Confirm</h3>\n</div>\n<div class="modal-body">\n  {{options.message}}\n</div>\n<div class="modal-footer">\n  <button class="btn btn-default" ng-click="cancel()">\n    {{options.cancelButtonText}}\n  </button>\n  <button class="btn btn-primary" ng-click="ok()">\n    {{options.okButtonText}}\n  </button>\n</div>');
      $templateCache.put('prompt.html', '<div class="modal-header">\n  <button type="button" class="close" ng-click="close()">\n    <span aria-hidden="true">&times;</span>\n    <span class="sr-only">Close</span>\n  </button>\n  <h3 class="modal-title">Prompt</h3>\n</div>\n<div class="modal-body">\n  <form name="promptForm">\n    <div class="form-group">\n      <label class="control-label">{{options.label}}</label>\n      <input type="text" name="value" class="form-control"\n             ng-model="result.value"\n             placeholder="{{options.placeholder}}">\n    </div>\n  </form>\n</div>\n<div class="modal-footer">\n  <button class="btn btn-default" ng-click="cancel()">\n    {{options.cancelButtonText}}\n  </button>\n  <button class="btn btn-primary" ng-click="ok()">\n    {{options.okButtonText}}\n  </button>\n</div>');
      $templateCache.put('confirm-leave.html', '<div class="modal-header">\n  <button type="button" class="close" ng-click="close()">\n    <span aria-hidden="true">&times;</span>\n    <span class="sr-only">Close</span>\n  </button>\n  <h3 class="modal-title">Confirm</h3>\n</div>\n<div class="modal-body">\n  {{options.message}}\n</div>\n<div class="modal-footer">\n  <button class="btn btn-default" ng-click="stay()">\n    {{options.stayButtonText}}\n  </button>\n  <button class="btn btn-warning" ng-click="leave()">\n    {{options.leaveButtonText}}\n  </button>\n</div>');
    }]);
}(window, window.angular));