(function(angular) {
  angular.module('isolateModule', []).controller('MyController', [
    '$scope',
    function($scope) {
      $scope.customerA = {
        name: 'name 1',
        address: 'address 1'
      };
      $scope.customerB = {
        name: 'name 2',
        address: 'address 2'
      };
    }
  ]).directive('myCustomer', function() {
    return {
      // 类型 E: element names
      restrict: 'E',
      // 指定隔离域中的属性;
      scope: {
        // =: 绑定指令内部属性;把指令内部属性 customer-info 绑定至外部的 info
        customerInfo: '=info'
      },
      templateUrl: '01-template.html'// 可以使用 customerInfo
    }
  });
})(window.angular);
