(function (angular) {
  angular.module('myApp', []);
  angular.module('myApp').controller('MyController', [
    '$scope',
    function ($scope) {
      $scope.test = 'test';
    }
  ]);
})(window.angular);
