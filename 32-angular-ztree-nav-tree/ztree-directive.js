/**
 * 基于 zTree 的 angularjs 组件
 * @param {Array} treeData - 树形数组。
 * @param {Array} selectedArr - 已选项数组。
 * @param {Function} onChangeFn - 已选项发生改变时的回调函数，第一参数为当前已选项数组。
 * @param {Object} [config] - 配置对象。
 * @param {boolean} [config.hasCheckbox] - 是否有选框，默认为 false。
 * */
angular.module('myApp')
  .directive('zTree', ['$timeout', function ($timeout) {
    return {
      templateUrl: 'ztree.template.html',
      restrict: 'E',
      scope: {
        treeData: '=',
        selectedArr: '=',
        onChangeFn: '&',
        config: '=?'
      },
      link: function (scope, element, attrs) {
        var isExternalChange = true;
        scope.config = scope.config || {};
        scope._id = 'zTree-' + Math.random().toString(36).substr(2);
        scope.setting = {
          data: {
            simpleData: {
              enable: true, // 使用非树形数组
              idKey: 'id',
              pIdKey: 'pid',
              rootPid: 0
            }
          },
          callback: {
            onClick: onClick
          }
        };
        // 是否有选框插件
        if (scope.config.hasCheckbox) {
          scope.setting.check = {
            enable: true,
            chkboxType: {"Y": "s", "N": "s"} // Y:勾选，N:取消勾选
          };
          scope.setting.callback.onCheck = onCheck;
        }

        // 点击回调函数
        function onClick(event, treeId, treeNode) {
          isExternalChange = false; // 不是组件外部修改
          if (scope.config.hasCheckbox) {
            // 带选框
            scope.zTreeObj.checkNode(treeNode);
            $timeout(function () {
              var checkedNodes = scope.zTreeObj.getCheckedNodes();
              scope.selectedArr = checkedNodes;
              scope.$apply();
              scope.onChangeFn({selectedArr: checkedNodes});
            });
          } else {
            // 不带选框
            scope.selectedArr = [treeNode];
            scope.$apply();
            scope.onChangeFn({selectedArr: [treeNode]});
          }
        }

        // 选中回调函数
        function onCheck(event, treeId, treeNode) {
          isExternalChange = false; // 不是组件外部修改
          var checkedNodes = scope.zTreeObj.getCheckedNodes();
          scope.selectedArr = checkedNodes;
          scope.$apply();
          scope.onChangeFn({selectedArr: checkedNodes});
          scope.zTreeObj.selectNode(treeNode);
        }

        // 初始化zTree
        $timeout(function () {
          scope.zTreeObj = $.fn.zTree.init($("#" + scope._id), scope.setting, scope.treeData);
        });

        // 根据 selectedArr 重新勾选
        function reCheckTree(selectedArr) {
          var i, len, item, node;
          var zTreeObj = scope.zTreeObj;
          zTreeObj.checkAllNodes(false); // 取消所有勾选
          for (i = 0, len = selectedArr.length; i < len; i++) {
            item = selectedArr[i];
            node = zTreeObj.getNodeByParam('id', item.id);
            if (node) {
              zTreeObj.checkNode(node, true, false);
            }
          }
        }

        // 根据 selectedArr 重新选择
        function reSelectTree(selectedArr) {
          var i, len, item, node;
          var zTreeObj = scope.zTreeObj;
          zTreeObj.cancelSelectedNode(); // 取消所有选中
          for (i = 0, len = selectedArr.length; i < len; i++) {
            item = selectedArr[i];
            node = zTreeObj.getNodeByParam('id', item.id);
            if (node) {
              zTreeObj.selectNode(node);
            }
          }
        }

        // 监听组件外部修改 selectedArr
        scope.$watch('selectedArr', function (newValue) {
          if (!newValue) {
            return;
          }
          // 组件外部修改了 selectedArr
          if (isExternalChange) {
            if (scope.config.hasCheckbox) {
              reCheckTree(newValue);
            } else {
              reSelectTree(newValue);
            }
          }
          isExternalChange = true; //重置 isExternalChange
        }, true);

        // 监听组件外部修改 treeData
        scope.$watch('treeData', function (newValue) {
          if (!newValue) {
            return;
          }
          scope.zTreeObj.destroy();
          scope.zTreeObj = $.fn.zTree.init($("#" + scope._id), scope.setting, scope.treeData);
        }, true);

        // 监听组件销毁
        element.on('$destroy', function () {
          scope.zTreeObj.destroy();
        });
      }
    };
  }]);
