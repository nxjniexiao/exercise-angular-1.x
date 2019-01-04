(function(angular) {
  angular
    .module('timeDirective', [])
    .controller('MyController', [
      '$scope',
      function($scope) {
        $scope.format = 'yyyy-MM-dd hh:mm:ss a';
      }
    ])
    .directive('myTimer', [
      '$interval',
      'dateFilter',
      function($interval, dateFilter) {
        var timer;// 定时器
        var fmt;// 格式化参数
        function link(scope, element, attrs) {
          // 把当前时间更新至 DOM 中
          function updateTime() {
            element.text(dateFilter(new Date(), fmt));
          }
          // 监听 attrs.myTimer(先执行此函数，然后开启定时器)
          scope.$watch(attrs.myTimer, function(value) {
            fmt = value;
            updateTime();
          });
          // 开启定时器
          timer = $interval(updateTime, 1000);
          // 监听 DOM 销毁事件
          element.on('$distory', function() {
            $interval.cancel(timer);
          });
        }
        // link 用于注册 DOM 监听(listener)和更新 DOM
        return {
          link
        };
      }
    ]);
})(window.angular);
