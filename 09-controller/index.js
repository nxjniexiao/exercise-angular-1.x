(function(angular) {
  angular.module("myApp", []);
  angular
    .module("myApp")
    .controller("MainController", [
      "$scope",
      function($scope) {
        $scope.timeOfDay = "morning (main)";
        $scope.name = "nie (main)";
      }
    ])
    .controller("ChildController", [
      "$scope",
      function($scope) {
        $scope.name = "nie (child)";
      }
    ])
    .controller("GrandChildController", [
      "$scope",
      function($scope) {
        $scope.timeOfDay = "evening (grandChild)";
        $scope.name = "nie (grandChild)";
      }
    ]);
})(window.angular);
