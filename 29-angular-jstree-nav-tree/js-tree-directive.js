/**
 * 基于 jstree 的 angularjs 组件，带选框插件。
 * @param {Array} treeData - 树形数组。
 * @param {Array} selectedArr - 已选项数组。
 * @param {Function} onChangeFn - 已选项发生改变时的回调函数，第一参数为当前已选项数组。
 * @param {Function} lazyUrlFn - 懒加载时请求的url地址的创建函数。
 * @param {Function} onLazyLoadFn - 处理懒加载响应数据的函数。
 * @param {Object} [config] - 配置对象。
 * @param {boolean} [config.hasCheckbox] - 是否有选框，默认为 false。
 * @param {boolean} [config.hasSearchBox] - 是否有搜索框，默认为 false。
 * @param {boolean} [config.lazy] - 是否为懒加载，默认为 false。
 * */
angular.module('myApp')
  .directive('jsTree', ['$timeout', function ($timeout) {
    return {
      templateUrl: 'js-tree.template.html',
      restrict: 'E',
      scope: {
        treeData: '=?',
        selectedArr: '=',
        onChangeFn: '&',
        lazyUrlFn: '&',
        onLazyLoadFn: '&',
        config: '=?'
      },
      link: function (scope, element, attrs) {
        var jsTreeDom, timerForSearch, isExternalChange = true;
        scope.config = scope.config || {};
        scope._id = 'jstree-' + Math.random().toString(36).substr(2);
        scope.jsTreeInstance = null;
        scope.noSearchResults = false;
        $timeout(function () {
          jsTreeDom = $('#' + scope._id);
          var opts = initOpts();
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
            .on('check_node', function (event, data) {
              console.log('check_node.jstree'); // works when tie_selection is false
            })
            .on('uncheck_node', function (event, data) {
              console.log('uncheck_node'); // works when tie_selection is false
            })
            .on('select_node.jstree', function (event, data) {
              console.log('select_node');
            })
            .on('deselect_node.jstree', function (event, data) {
              console.log('deselect_node');
            })
            .on('deselect_all.jstree', function (event, data) {
              console.log('deselect_all');
            })
            .on('refresh.jstree', function (event, data) {
              console.log('refresh');
              reselect(scope.selectedArr); // 修复初始化时不勾选初始已选项
            })
            .on('changed.jstree', function (event, data) {
              console.log('changed');
              var arr = [];
              if (scope.config.hasCheckbox) {
                // 有多选框
                var selectedArr = data.instance.get_checked(true);
                selectedArr.forEach(function (item) {
                  arr.push(item.original);
                });
              } else {
                // 取消选择时，data.selected 为 []
                if (data.selected.length) {
                  arr.push(data.node.original);
                }
              }
              scope.selectedArr = arr;
              scope.$apply();
              scope.onChangeFn({ selectedArr: arr });
            })
            .on('search.jstree', function (event, data) {
              scope.noSearchResults = !data.res.length;
            })
            .on('clear_search.jstree', function (event, data) {
              scope.noSearchResults = false;
            })
            .jstree(opts);
          scope.jsTreeInstance = jsTreeDom.jstree(true); // 获取 jsTree 的实例
        });

        // 初始化 options
        function initOpts() {
          var config = scope.config;
          var opts = {
            core: {},
            plugins: ['conditionalselect'],
            conditionalselect: function (node, event) {
              isExternalChange = false; //非外部改变已选项
              var className = event.target.getAttribute('class');
              var isCheckBox = /checkbox/.test(className);
              if (config.hasCheckbox && isCheckBox) {
                // 'down': 勾选时，其子节点也会被勾选上
                scope.jsTreeInstance.settings.checkbox.cascade = 'down+undetermined';
              } else {
                // '': 勾选时，其子节点不会被勾选上
                scope.jsTreeInstance.settings.checkbox.cascade = 'undetermined';
              }
              return true;
            }
          };
          var core = opts.core;
          if (config.lazy) {
            // 懒加载
            core.data = {};
            core.data.url = function(node) {
              return scope.lazyUrlFn({node: node});
            }
            core.data.data = function(res) {
              return scope.onLazyLoadFn({res: res});
            };
          } else {
            // 一次性数据
            core.data = scope.treeData
          }
          // 有多选框
          if (config.hasCheckbox) {
            opts.core.multiple = true;
            opts.plugins.push('checkbox');
            opts.checkbox = {
              three_state: true,
              cascade: 'down+undetermined'
            };
          }
          // 有搜索框
          if (config.hasSearchBox) {
            opts.plugins.push('search');
            opts.search = {
              show_only_matches: true,
              show_only_matches_children: true
            }
          }
          return opts;
        }

        // 刷新 jstree 中的已选项
        function reselect(selectedArr) {
          var jsTreeInstance = scope.jsTreeInstance;
          //防止手动触发 select_node 事件时，其子元素也会被勾选上
          jsTreeInstance.settings.checkbox.cascade = 'undetermined'; //大坑！！！！
          jsTreeInstance.deselect_all(true); // true: 不会触发 changed.jstree 事件
          jsTreeInstance.select_node(selectedArr, true, true); // true: 不会触发 changed.jstree 事件
          jsTreeInstance.redraw(); // 重绘
        }

        // 监听树形数组 treeData ($watchCollection 优化性能)
        scope.$watchCollection('treeData', function () {
          if (scope.treeData && scope.jsTreeInstance) {
            scope.jsTreeInstance.settings.core.data = scope.treeData;
            scope.jsTreeInstance.refresh(false, true); //skip_loading, forget_state(为true时保存状态)
          }
        });

        // 监听已选项 selectedArr ($watchCollection 优化性能)
        scope.$watchCollection('selectedArr', function (newValue) {
          if (!newValue) {
            return;
          }
          if (newValue && scope.jsTreeInstance && isExternalChange) {
            reselect(newValue);
          }
          isExternalChange = true; //重置 isExternalChange
        });

        // 监听搜索框
        if (scope.config.hasSearchBox) {
          scope.$watch('keywords', function () {
            $timeout.cancel(timerForSearch);
            timerForSearch = $timeout(function () {
              scope.jsTreeInstance.search(scope.keywords || '');
            }, 500)
          });
        }

        // 监听组件销毁
        element.on('$destroy', function () {
          scope.jsTreeInstance.destroy();
        });
      }
    };
  }]);
