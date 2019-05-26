angular.module('myApp', []);
angular.module('myApp').controller('MyController',
  ['$rootScope', '$scope', '$timeout', '$q',
    function ($rootScope, $scope, $timeout, $q) {
      $scope.loadMore = function () {
        console.log('load more...');
        // return $q(function (resolve, reject) {
        //   $timeout(function () {
        //     console.log('load more end');
        //     resolve();
        //   }, 3000);
        // });
      }
    }
  ]);
