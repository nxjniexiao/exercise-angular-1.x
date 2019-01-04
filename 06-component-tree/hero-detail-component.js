(function(angular) {
  'use strict';
  angular.module('myApp').component('heroDetail', {
    bindings: {
      hero: '<',
    },
    templateUrl: 'hero-detail-template.html',
    controller: HeroDetailController
  });
  function HeroDetailController() {

  }
})(window.angular);
