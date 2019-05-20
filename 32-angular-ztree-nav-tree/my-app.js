angular.module('myApp', []);
angular.module('myApp').controller('MyController', ['$rootScope', '$scope', '$timeout', function ($rootScope, $scope, $timeout) {
  $scope.treedata1 = treeData;

  $timeout(function () {
    $scope.ArrayList = $scope.treedata1;
  }, 500);

  $timeout(function () {
    $scope.selectedArray = [
      {"name": "研发部", "id": 151},
      // {"name": "测试组", "id": 152},
    ];
  }, 1000);

  $scope.onChangeFnc = function (selectedArr) {
    console.log(selectedArr);
  };

  $scope.unselect = function(index) {
    $scope.selectedArray.splice(index, 1);
  }
}]);
