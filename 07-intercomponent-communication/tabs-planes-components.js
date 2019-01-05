(function(angular) {
  angular.module('tabsPlanesModule', []);
  // myTabs 组件
  angular.module('tabsPlanesModule').component('myTabs', {
    // 创建包含任意内容的指令(HTML 标签中使用 ng-transclude，任意内容将会插入到此标签内)
    transclude: true,
    templateUrl: 'my-tabs-template.html',
    controller: MyTabsController
  });
  function MyTabsController() {
    this.$onInit = function() {
      console.log(this);
    };
    var planes = this.planes = [];
    // addPlane 增加组件
    this.addPlane = function(plane) {
      if(this.planes.length === 0) {
        plane.selected = true;
      }
      this.planes.push(plane);
    };
    // selectPlane 选择组件
    this.selectPlane = function(plane) {
      this.planes.forEach(plane => plane.selected = false);
      plane.selected = true;
    }
  }
  // myPlanes 组件
  angular.module('tabsPlanesModule').component('myPlanes', {
    transclude: true,
    templateUrl: 'my-planes-template.html',
    // require 属性实现组件间通信
    // 把 myTabs 的 controller 作为第4个参数传入自己 controller
    // 可以为字符串，数组，或对象
    // 无符号表示搜寻自身
    // ^ 表示搜寻自身及其祖先(parents)
    // ^^ 表示搜寻其祖先(parents)
    // ?^ 和 ?^^ 搜寻不到时不会报错，传 null 给第4个参数
    require: {
      myTabs: '^myTabs'
    },
    bindings: {
      title: '@'
    },
    controller: MyTPlanesController
  });
  function MyTPlanesController() {
    this.i=10;// 不影响
    // require: '^myTabs' 能够让本组件的 controller 使用 myTabs 组件
    this.$onInit = function() {
      // 初始化时把controller自身 push 进 myTabs 组件的 planes 属性中
      this.myTabs.addPlane(this);
      console.log(this);
    }
  }
})(window.angular);