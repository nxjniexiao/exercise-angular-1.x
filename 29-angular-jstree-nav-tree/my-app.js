angular.module('myApp', []);
angular.module('myApp').controller('MyController', ['$rootScope', '$scope', '$timeout', function ($rootScope, $scope, $timeout) {
  $scope.treedata = {
    treedata1: [
      {
        text: 'Root node',
        id: 1,
        children: [
          {
            text: 'Child node 1',
            id: 11,
            children: [
              {text: 'Child node 1-1', id: 111},
              {text: 'Child node 1-2', id: 112},
              {text: 'Child node 1-3', id: 113},
              {text: 'Child node 1-4', id: 114},
            ]
          },
          {text: 'Child node 2', id: 12},
          {text: 'Child node 3', id: 13}
        ]
      },
      {
        text: 'Root node 2',
        id: 2,
        children: []
      }
    ],
    treedata2: [
      {
        text: 'Root node',
        id: 1,
        children: true
      },
      {
        text: 'Root node 2',
        id: 2,
        children: true
      },
      {
        text: 'Root node 3',
        id: 3,
        children: true
      }
    ],
  };
  $timeout(function () {
    $scope.treedataName = 'treedata1';
  }, 500);
  $timeout(function () {
    $scope.selectedArray = [
      {"text": "Root node 2", "id": 2},
      {"text": "Child node 1-2", "id": 112},
    ];
    $scope.selectedArray2 = [
      {"text": "Root node 2", "id": 2},
    ]
  }, 1000);
  $scope.onChangeFnc = function (selectedArr) {
    // $scope.selectedArray = arr;
    // $scope.$apply();
    console.log(selectedArr);
  };
  $scope.changeData = function () {
    var treedataName = $scope.treedataName;
    if (treedataName === 'treedata1') {
      $scope.treedataName = 'treedata2';
    } else {
      $scope.treedataName = 'treedata1';
    }
  };
  var flag = true;
  $scope.changeSelected = function () {
    if (flag) {
      $scope.selectedArray = [
        {"text": "Root node 2", "id": 2},
        {"text": "Child node 1-2", "id": 112},
        {"text": "Child node 1-4", "id": 114}
      ];
    } else {
      $scope.selectedArray = [
        {"text": "Root node 2", "id": 2},
        {"text": "Child node 1-1", "id": 111}
      ];
    }
    flag = !flag;
  };
  $scope.config = {
    //待完成
  };
  $scope.unselect = function(arr, index) {
    arr.splice(index, 1);
  }
  $scope.lazyUrlFn = function(node) {
    console.log(node);
    return '/json?operation=get_node';
  }
  $scope.onLazyLoadFn = function(res) {
    console.log(res);
    return res;
  }
}]);
