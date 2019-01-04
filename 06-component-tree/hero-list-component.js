(function(angular) {
  'use strict';
  angular.module('myApp').component('heroList', {
    templateUrl: 'hero-list-template.html',
    controller: HeroListController
  });
  function HeroListController() {
    this.list = [
      {
        name: 'Superman',
        location: ''
      },
      {
        name: 'Batman',
        location: 'Wayne Manor'
      }
    ];
  }
})(window.angular);
