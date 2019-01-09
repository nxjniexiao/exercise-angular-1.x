(function (angular) {
  angular.module('myApp')
    .directive('showMeetingInfo', ['$window', function ($window) {
      return {
        restrict: 'A',
        require: '^meetingInfo',// 引入 meetingInfo 指令，作为第4个参数传入 controller
        link: showMeetingInfoLink
      };

      function showMeetingInfoLink(scope, element, attrs, meetingInfoCtrl) {
        // 监听点击事件
        element.on('click', function () {
          console.log(attrs.showMeetingInfo + ' clicked');
          // 调用 meetingInfo 指令中暴露出来的API
          let newId = attrs.showMeetingInfo;
          meetingInfoCtrl.changeId(newId);// controller 之外修改了 scope
          // scope.$apply();// 刷新页面(重点!)
          // scope.changeId(newId);
        })
      }
    }]);
})(window.angular);
