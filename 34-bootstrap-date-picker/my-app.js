angular.module('myApp', []);
angular.module('myApp').controller('MyController', [
  '$rootScope', '$scope', '$timeout',
  function ($rootScope, $scope, $timeout) {
    $scope.startDate1 = new Date('2019/06/01');
    $scope.endDate1 = new Date('2019/06/02');
    $scope.startDate2 = new Date('2019/05/01');
    $scope.endDate2 = new Date('2019/05/05');
    $timeout(function () {
      $scope.startDate1 = new Date('2019/06/05');
      $scope.endDate1 = new Date('2019/06/06');
      $scope.startDate2 = new Date('2019/05/10');
      $scope.endDate2 = new Date('2019/05/15');
    }, 5000);
  }
]);
