(function(angular) {
  angular.module('tabsAndPlanes', []);
  angular
    .module('tabsAndPlanes')
    .directive('myTabs', function() {
      return {
        templateUrl: '04-my-tabs-template.html',
        restrict: 'E',
        transclude: true,
        controller: ['$scope', MyTabsController]
      };
      function MyTabsController($scope) {
        var planes = ($scope.planes = []);
        // this 和 $scope 的区别:
        // 1. this 为 MyTabsController
        // 2. $scope 为控制器控制的域(scope)
        this.addPlane = function(plane) {
          if ($scope.planes.length === 0) {
            plane.selected = true;
          }
          $scope.planes.push(plane);
        };
        $scope.selectPlane = function(plane) {
          $scope.planes.forEach(plane => (plane.selected = false));
          plane.selected = true;
        };
      }
    })
    .directive('myPlane', function() {
      return {
        templateUrl: '04-my-plane-template.html',
        restrict: 'E',
        transclude: true,
        scope: {
          title: '@'
        },
        require: '^^myTabs',
        link
      };
      // 模板被克隆后执行 link
      function link(scope, element, attrs, myTabs) {
        myTabs.addPlane(scope);
      }
    });
})(window.angular);
