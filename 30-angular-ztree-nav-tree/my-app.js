angular.module('myApp', []);
angular.module('myApp').controller('MyController', ['$rootScope', '$scope', '$timeout', function ($rootScope, $scope, $timeout) {
  $scope.treedata1 = treeData;

  $timeout(function () {
    $scope.ArrayList = $scope.treedata1;
    $scope.bigArrayList = dataMaker(70000);
  }, 500);

  $timeout(function () {
    $scope.selectedArray = [
      {"name": "研发部", "id": 151},
      // {"name": "测试组", "id": 152},
    ];
    $scope.selectedArray1 = [
      {"name": "研发部", "id": 151},
    ];
    $scope.selectedArray2 = [];
  }, 1000);

  $scope.onChangeFnc = function (selectedArr) {
    console.log(selectedArr);
  };

  $scope.unselect = function(index) {
    $scope.selectedArray.splice(index, 1);
  };

  $scope.unselect1 = function(index) {
    $scope.selectedArray1.splice(index, 1);
  };
}]);
