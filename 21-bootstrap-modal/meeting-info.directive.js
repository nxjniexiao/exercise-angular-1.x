(function (angular) {
  angular.module('myApp')
    .directive('meetingInfo', ['$window', function ($window) {
      return {
        templateUrl: 'meeting-info.template.html',
        transclude: true,
        restrict: 'A',
        controller: ['$rootScope', '$scope', MeetingInfoController],
        // controllerAs: 'meetingInfo'
      };
      function MeetingInfoController($rootScope, $scope) {
        $scope.meetingId = 'initialId';
        // 暴露供供外部使用的API
        this.changeId = function(newId) {
          $scope.meetingId = newId;
          $scope.$apply();
        };
        // // 供内部使用
        // $scope.changeId = function(newId) {
        //   $scope.meetingId = newId;
        //   $scope.$apply();
        // };
      }
    }]);
})(window.angular);
