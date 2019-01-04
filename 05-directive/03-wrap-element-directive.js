(function(angular) {
  angular
    .module('elementDirective', [])
    .controller('MyController', [
      '$scope',
      '$timeout',
      function($scope, $timeout) {
        $scope.name = 'nxj';
        $scope.msg = '';
        $scope.isMessageHidden = false;
        // 隐藏 <my-dialog>
        $scope.hideMyDialog = function(message) {
          $scope.message = message;
          $scope.isMessageHidden = true;
          // 2秒后恢复
          $timeout(function() {
            $scope.message = '';
            $scope.isMessageHidden = false;
          }, 2000);
        }
      }
    ])
    .directive('myDialog', [
      function() {
        return {
          district: 'E',
          // 创建包含任意内容的指令(指令内部使用 ng-transclude)
          transclude: true,
          scope: {
            // =: 绑定指令内部属性;
            // &: 绑定指令内部回调函数;把指令内部的 click 绑定至外部的 on-click
            close: '&onClose'
          },
          link: function(scope) {
            scope.name = 'nie(within directive)';
          },
          templateUrl: '03-my-dialog.html'
        };
      }
    ]);
})(window.angular);
