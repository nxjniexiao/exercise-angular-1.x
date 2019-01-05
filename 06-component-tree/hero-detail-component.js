(function(angular) {
  'use strict';
  angular.module('myApp').component('heroDetail', {
    bindings: {
      // < 为单向绑定，但 hero 为对象，需改其值也会影响其父 scope
      index: '<',
      hero: '<',
      // 绑定回调函数
      updateHero: '&',
      deleteHero: '&',
    },
    templateUrl: 'hero-detail-template.html',
    controller: HeroDetailController
  });
  function HeroDetailController() {
    // 初始化(重点)
    this.$onInit = function() {
      // 备份初始值(angular.copy() 为深拷贝)
      this.heroCopy = angular.copy(this.hero);
    };
    // 是否为修改模式
    this.isEditMode = false;
    // 修改/保存
    this.toggleEditMode = function() {
      if(this.isEditMode) {
        // 当前状态为修改状态，执行保存
        // // 1. 备份上一次修改的值
        // this.heroCopy = this.hero;
        // 2. 提交修改
        this.updateHero({
          index: this.index,
          newHero: this.heroCopy
        })
      }
      this.isEditMode = !this.isEditMode;
    };
    // 重置输入框中的值
    this.resetHero = function() {
      this.heroCopy = angular.copy(this.hero);
    };
  }
})(window.angular);
