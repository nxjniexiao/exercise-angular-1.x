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
            // 数据回显
            .on('ready.jstree', function(event, data) {
              console.log(event);
              console.log(data);
              var obj = data.instance._model.data;
              var selectedArr = scope.selectedArr;
              if (selectedArr instanceof Array) {
                for(var i = 0, len = selectedArr.length; i < len; i++) {
                  var item = selectedArr[i];
                  var id = item.id;
                  if(obj.hasOwnProperty(id)) {
                    obj[id].state.selected = true;
                  }
                }
                data.instance.refresh(true);
              }
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
