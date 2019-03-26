angular.module('myApp')
  .directive('jsTree', ['$timeout', function ($timeout) {
    return {
      templateUrl: 'js-tree.template.html',
      restrict: 'E',
      scope: {
        treeData: '=',
        selectedArr: '=',
        onChangeFn: '&'
      },
      link: function(scope, element, attrs) {
        var jsTreeInstance;
        scope._id = 'jstree-' + Math.random().toString(36).substr(2);
        $timeout(function () {
          $('#' + scope._id)
            .on('open_node.jstree', function(event, data) {
              console.log(data);
            })
            .on('changed.jstree', function (event, data) {
              // console.log(data);
              var arr = [];
              var selectedArr = data.instance.get_checked(true);
              selectedArr.forEach(function (item) {
                arr.push(item.original);
              });
              scope.selectedArr = arr;
              scope.$apply();
              scope.onChangeFn({data: data});
            })
            .jstree({
              core: {
                data: scope.treeData,
              },
              plugins: ['checkbox', 'conditionalselect'],
              checkbox: {
                three_state: false,
                cascade: 'down'
              },
              conditionalselect: function (node, event) {
                // console.log(node);
                // console.log(event);
                var className = event.target.getAttribute('class');
                var isCheckBox = /checkbox/.test(className);
                if (isCheckBox) {
                  jsTreeInstance.settings.checkbox.cascade = 'down';
                } else {
                  jsTreeInstance.settings.checkbox.cascade = '';
                }
                return true;
              }
            });
          jsTreeInstance = $('#' + scope._id).jstree(); // 获取 jsTree 的实例
        });
        scope.$watch('treeData', function () {
          // if (!scope.treeData || !jsTreeInstance) {
          //   return;
          // }
          // jsTreeInstance.settings.core.data = scope.treeData;
          // jsTreeInstance.refresh();
        }, true);
      }
    };
  }]);
