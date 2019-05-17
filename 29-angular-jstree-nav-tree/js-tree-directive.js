angular.module('myApp')
  .directive('jsTree', ['$timeout', function ($timeout) {
    return {
      templateUrl: 'js-tree.template.html',
      restrict: 'E',
      scope: {
        id: '@',
        treeData: '=',
        selectedArr: '=',
        onChangeFn: '&',
        config: '=?'
      },
      link: function (scope, element, attrs) {
        var jsTreeDom;
        var jsTreeInstance;
        var timerForSearch;
        scope._id = 'jstree-' + Math.random().toString(36).substr(2);
        scope.noSearchResults = false;
        $timeout(function () {
          jsTreeDom = $('#' + scope._id);
          jsTreeDom
            .on('open_node.jstree', function (event, data) {
              // console.log(data);
            })
            .on('redraw.jstree', function (event, data) {
              console.log('redraw...');
            })
            // 数据回显
            .on('ready.jstree', function (event, data) {
              console.log('=== ready.jstree ===');
              freshJSTreeSelected(data.instance, scope.selectedArr);
            })
            .on('changed.jstree', function (event, data) {
              // console.log(data);
              var arr = [];
              var selectedArr = data.instance.get_checked(true);
              selectedArr.forEach(function (item) {
                arr.push(item.original);
              });
              // scope.selectedArr = arr;
              // scope.$apply();
              // scope.onChangeFn({arr: arr});
              if (typeof scope.onChangeFn === 'function') {
                scope.onChangeFn({arr: arr});
              }
            })
            .on('select_node.jstree', function(node, selected, event) {
              console.log('select_node');
              console.log(selected);
            })
            .on('deselect_node.jstree', function(node, selected, event) {
              console.log('deselect_node');
              console.log(selected);

            })
            .on('search.jstree', function (event, data) {
              scope.noSearchResults = !data.res.length;
            })
            .on('clear_search.jstree', function (event, data) {
              scope.noSearchResults = false;
            })
            .jstree({
              core: {
                data: scope.treeData,
              },
              plugins: ['checkbox', 'conditionalselect', 'search'],
              checkbox: {
                three_state: false,
                cascade: 'down'
              },
              search: {
                show_only_matches: true,
                show_only_matches_children: true
              },
              conditionalselect: function (node, event) {
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
          jsTreeInstance = jsTreeDom.jstree(); // 获取 jsTree 的实例
        });

        // 刷新 jstree 中的已选项
        function freshJSTreeSelected(jstreeInstance, selectedArr) {
          resetJSTreeSelected(jstreeInstance);
          var data = jstreeInstance._model.data;
          if (selectedArr instanceof Array) {
            for (var i = 0, len = selectedArr.length; i < len; i++) {
              var item = selectedArr[i];
              var id = item.id;
              if (data.hasOwnProperty(id)) {
                data[id].state.selected = true;
              }
            }
            jstreeInstance.refresh();
          }
        }

        // 重置 jstree 中的已选项
        function resetJSTreeSelected(jstreeInstance) {
          var data = jstreeInstance._model.data;
          for (var propName in data) {
            data[propName].state.selected = false;
          }
        }

        // 监听树形数组 treeData
        scope.$watch('treeData', function () {
          if (scope.treeData && jsTreeInstance) {
            jsTreeInstance.settings.core.data = scope.treeData;
            jsTreeInstance.refresh();
          }
        }, true);

        // 监听已选项 selectedArr(有bug)
        scope.$watch('selectedArr', function (newValue) {
          if (!newValue) {
            return;
          }
          if (scope.treeData && jsTreeInstance) {
            freshJSTreeSelected(jsTreeInstance, scope.selectedArr);
          }
        }, true);

        // // 事件
        // scope.$on('refresh-tree-' + scope.id, function () {
        //   if (scope.treeData && jsTreeInstance) {
        //     freshJSTreeSelected(jsTreeInstance, scope.selectedArr);
        //   }
        // });

        // 监听搜索框
        scope.$watch('keywords', function () {
          $timeout.cancel(timerForSearch);
          timerForSearch = $timeout(function () {
            jsTreeInstance.search(scope.keywords || '');
          }, 500)
        });
      }
    };
  }]);
