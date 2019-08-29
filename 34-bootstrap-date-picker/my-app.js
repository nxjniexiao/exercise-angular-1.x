angular.module('myApp', []);
angular.module('myApp').controller('MyController', [
  '$rootScope',
  '$scope',
  '$timeout',
  function($rootScope, $scope, $timeout) {
    var date1 = new Date();
    var date2 = new Date(+date1 + 24 * 60 * 60 * 1000);
    var date3 = new Date(+date2 + 24 * 60 * 60 * 1000);
    $scope.startDate1 = date1;
    $scope.endDate1 = date2;
    $scope.startDate2 = new Date('2019/05/01');
    $scope.endDate2 = new Date('2019/05/05');
    $timeout(function() {
      $scope.startDate1 = date2;
      $scope.endDate1 = date3;
      $scope.startDate2 = new Date('2019/05/10');
      $scope.endDate2 = new Date('2019/05/15');
    }, 5000);
  }
]);
