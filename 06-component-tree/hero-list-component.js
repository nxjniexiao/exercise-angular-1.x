(function (angular) {
  'use strict';
  angular.module('myApp').component('heroList', {
    templateUrl: 'hero-list-template.html',
    controller: HeroListController
  });

  function HeroListController() {
    this.heroList = [
      {
        name: 'Superman',
        location: ''
      },
      {
        name: 'Batman',
        location: 'Wayne Manor'
      }
    ];
    // 修改 hero
    this.updateHero = function (index, newHero) {
      console.log(index);
      index = Number(index);// 字符串转数字
      this.heroList.splice(index, 1, newHero);
    };
    // 删除 hero
    this.deleteHero = function(index) {
      index = Number(index);// 字符串转数字
      this.heroList.splice(index, 1);
    };
    // 新增 hero
    this.addHero = function() {
      this.heroList.push({name: '', location: ''})
    }
  }
})(window.angular);
