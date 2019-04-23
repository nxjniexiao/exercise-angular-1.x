(function (angular) {
  angular.module("myApp", []).controller("myController", [
    "$scope",
    "$timeout",
    function ($scope, $timeout) {
      $scope.allArray = null;
      $scope.selectedArray = null;
      $timeout(function() {
        $scope.allArray = [
          {userId: 1, name: '领导1领导1'},
          {userId: 2, name: '领导2领导2'},
          {userId: 3, name: '领导3领导3'}
        ];
      },1000);

      $timeout(function() {
        $scope.selectedArray = [
          {userId: 1, name: '领导1111'}
        ];
      },500);

      $timeout(function() {
        // 1. 使用 watch 无法监听
        // 2. 使用 watchCollection 可以监听
        // 3. 使用 watch[true] 可以监听
        // $scope.selectedArray.splice(0, 1, {userId: 2, name: '领导2222'});

        // 1. 使用 watch 无法监听
        // 2. 使用 watchCollection 无法监听
        // 3. 使用 watch[true] 可以监听
        // $scope.selectedArray[0].userId = 2;

        $scope.selectedArray = [
          {userId: 1, name: '领导1111'},
          {userId: 2, name: '领导2222'},
          {userId: 3, name: '领导3333'}
        ];
      },1500);

      // $scope.allArray = [
      //   {userId: 1, name: '领导1'},
      //   {userId: 2, name: '领导2'},
      //   {userId: 3, name: '领导3'}
      // ];
      // $scope.selectedArray = [
      //   {userId: 1, name: '领导1-a'}
      // ];
      $scope.myLogger = function() {
        console.log($scope.selectedArray);
      }
    }
  ]);
})(window.angular);
