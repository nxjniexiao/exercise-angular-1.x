angular.module('myApp').directive('checkBox', [function () {
  return {
    templateUrl: './check-box.template.html',
    scope: {
      optionsObj: '=',
      selectedObj: '=',
    },
    controller: ['$scope', controller]
  };

  function controller($scope) {
    $scope.randomStr = Math.random().toString(36).substr(2);
    $scope.selectedObjForCheckbox = null;
    // 监测 $scope.selectedObjForCheckbox
    $scope.$watch('selectedObjForCheckbox', function (newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }
      var selectedObjForCheckbox = $scope.selectedObjForCheckbox;
      for (var key in selectedObjForCheckbox) {
        if (selectedObjForCheckbox[key]) {
          // true
          if (!(key in $scope.selectedObj)) {
            $scope.selectedObj[key] = {
              id: $scope.optionsObj[key].id
            };
          }
        } else {
          // false
          if (key in $scope.selectedObj) {
            delete $scope.selectedObj[key];
          }
        }
      }
    }, true);
    // controller 初始化
    this.$onInit = function () {
      var obj = {};
      var selectedObj = $scope.selectedObj;
      for (var key in selectedObj) {
        obj[key] = true;
      }
      $scope.selectedObjForCheckbox = obj;
    }
  }
}]);
