angular.module('myApp')
  .directive('messageConfirmModal', [function () {
    return {
      templateUrl: 'message-confirm-modal.template.html',
      transclude: true,
      restrict: 'A',
      // scope: true, // 创建子域
      scope: {}, // 创建独立域，防止命名冲突
      controller: ['$rootScope', '$scope', function ($rootScope, $scope) {
        // 点击确认时调用
        $scope.confirm = function () {
          var confirmCallback = $scope.modalOpts.confirmCallback;
          if (confirmCallback) {
            confirmCallback();
          }
        };
        // 点击取消时调用
        $scope.cancel = function () {
          var cancelCallback = $scope.modalOpts.cancelCallback;
          if (cancelCallback) {
            cancelCallback();
          }
        };
        // 暴露打开信息弹窗的方法
        $rootScope.showMessageConfirmModal = function (modalOpts) {
          $scope.modalOpts = modalOpts;
          $('#message-confirm-modal').modal();
        }
      }]
    };
  }]);
