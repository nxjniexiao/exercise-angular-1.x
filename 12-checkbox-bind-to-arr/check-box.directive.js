angular.module('myApp').directive('checkBox', [function () {
  return {
    templateUrl: './check-box.template.html',
    scope: {
      optionsObj: '=',
      selectedObj: '=',
      isRadio: '=?'
    },
    controller: ['$scope', controller]
  };

  function controller($scope) {
    // 点击
    $scope.click = function(key, value) {
      var selectedObj = $scope.selectedObj;
      var isRadio = $scope.isRadio;
      // 单选模式
      if (isRadio) {
        if ($scope.selectedObj[key]) {
          $scope.selectedObj = {};
          return;
        }
        $scope.selectedObj = {
          [key]: value
        };
        return;
      }
      // 多选模式(默认)
      if (selectedObj[key]) {
        delete $scope.selectedObj[key];
      } else {
        $scope.selectedObj[key] = value;
      }
    };
  }
}]);
