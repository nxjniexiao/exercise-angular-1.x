/**
 * 基于 jstree 的 angularjs 组件，带选框插件。
 * @param {Array} treeData - 树形数组。
 * @param {Array} selectedArr - 已选项数组。
 * @param {Function} onChangeFn - 已选项发生改变时的回调函数，第一参数为当前已选项数组。
 * @param {Object} [config] - 配置对象。
 * @param {boolean} [config.isSearchAvailable] - 搜索框是否可用，默认为 false。
 * */
angular.module('myApp')
  .directive('jsTree', ['$timeout', function ($timeout) {
    return {
      templateUrl: 'js-tree.template.html',
      restrict: 'E',
      scope: {
        treeData: '=',
        selectedArr: '=',
        onChangeFn: '&',
        config: '=?'
      },
      link: function (scope, element, attrs) {
        var jsTreeDom, jsTreeInstance, timerForSearch, isExternalChange = true;
        scope.config = scope.config || {};
        scope._id = 'jstree-' + Math.random().toString(36).substr(2);
        scope.noSearchResults = false;
        $timeout(function () {
          jsTreeDom = $('#' + scope._id);
          jsTreeDom
            .on('open_node.jstree', function (event, data) {
              console.log('open_node');
            })
            .on('redraw.jstree', function (event, data) {
              console.log('redraw...');
            })
            .on('ready.jstree', function (event, data) {
              console.log('ready.jstree');
            })
            .on('select_node.jstree', function(event, data) {
              console.log('select_node');
              // var selectedArr = data.instance.get_checked(true);
              // console.log(selectedArr);
            })
            .on('deselect_node.jstree', function(event, data) {
              console.log('deselect_node');
              // var selectedArr = data.instance.get_checked(true);
              // console.log(selectedArr);
            })
            .on('deselect_all.jstree', function(event, data) {
              console.log('deselect_all');
              // var selectedArr = data.instance.get_checked(true);
              // console.log(selectedArr);
            })
            .on('changed.jstree', function (event, data) {
              console.log('changed');
              var arr = [];
              var selectedArr = data.instance.get_checked(true);
              selectedArr.forEach(function (item) {
                arr.push(item.original);
              });
              scope.selectedArr = arr;
              scope.$apply();
              scope.onChangeFn({selectedArr: arr});
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
                isExternalChange = false; //非外部改变已选项
                var className = event.target.getAttribute('class');
                var isCheckBox = /checkbox/.test(className);
                if (isCheckBox) {
                  // 'down': 勾选时，其子元素也会被勾选上
                  jsTreeInstance.settings.checkbox.cascade = 'down';
                } else {
                  // '': 勾选时，其子元素不会被勾选上
                  jsTreeInstance.settings.checkbox.cascade = '';
                }
                return true;
              }
            });
          jsTreeInstance = jsTreeDom.jstree(true); // 获取 jsTree 的实例
        });

        // 刷新 jstree 中的已选项
        function reselect(jstreeInstance, selectedArr) {
          //防止手动触发 select_node 事件时，其子元素也会被勾选上
          jsTreeInstance.settings.checkbox.cascade = ''; //大坑！！！！
          jstreeInstance.deselect_all(true); // true: 不会触发 changed.jstree 事件
          jstreeInstance.select_node(selectedArr, true); // true: 不会触发 changed.jstree 事件
        }

        // 监听树形数组 treeData
        scope.$watch('treeData', function () {
          if (scope.treeData && jsTreeInstance) {
            jsTreeInstance.settings.core.data = scope.treeData;
            jsTreeInstance.refresh();
          }
        }, true);

        // 监听已选项 selectedArr
        scope.$watch('selectedArr', function (newValue) {
          if (!newValue) {
            return;
          }
          if (newValue && jsTreeInstance && isExternalChange) {
            reselect(jsTreeInstance, newValue);
          }
          isExternalChange = true; //重置 isExternalChange
        }, true);

        // 监听搜索框
        if (scope.config.isSearchAvailable) {
          scope.$watch('keywords', function () {
            $timeout.cancel(timerForSearch);
            timerForSearch = $timeout(function () {
              jsTreeInstance.search(scope.keywords || '');
            }, 500)
          });
        }
      }
    };
  }]);
