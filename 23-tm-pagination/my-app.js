(function(angular) {
  angular.module("myApp", ['tm.pagination']).controller("myController", [
    "$scope",
    function($scope) {
      $scope.paginationConfig = {
        currentPage: 1,// 当前页
        itemsPerPage: 3,// 每页显示条数
        totalItems: 60,// 总条数
        perPageOptions: [3, 4, 10]// 每页显示条数选项
      };
      let count = 0;
      $scope.test = function() {
        console.log('第' + (++ count) + '次请求');
      }
    }
  ]);
})(window.angular);
