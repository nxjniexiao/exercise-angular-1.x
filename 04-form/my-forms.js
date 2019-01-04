(function(angular) {
  'use strict';
  angular.module('myForm', []).controller('MyForm', [
    '$scope',
    function($scope) {
      $scope.master = {};
      $scope.user = {};
      $scope.save = function(user) {
        // angular.copy() 深拷贝
        $scope.master = angular.copy(user);
      };
      $scope.reset = function(form) {
        if (form) {
          // 初始化 form
          form.$setPristine();
          // 把 form 设为未交互状态
          form.$setUntouched();
        }
        $scope.user = angular.copy($scope.master);
      };
    }
  ]);
})(window.angular);
