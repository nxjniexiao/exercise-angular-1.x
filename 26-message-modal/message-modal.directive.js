angular.module('myApp')
  .directive('messageModal', [function () {
    return {
      templateUrl: 'message-modal.template.html',
      transclude: true,
      restrict: 'A',
      // scope: true, // 创建子域
      scope: {}, // 创建独立域，防止命名冲突
      controller: ['$rootScope', '$scope', function($rootScope, $scope) {
        // 暴露打开信息弹窗的方法
        $rootScope.showMessageModal = function(messageObj) {
          $scope.messageObj = messageObj;
          $('#messageModal').modal();
        }
      }]
    };
  }]);
