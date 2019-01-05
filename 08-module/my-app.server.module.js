(function(angular) {
  angular.module('myApp.server', []);
  angular.module('myApp.server')
    // 注册 value 服务(service)，可以是 string/number/array/function
    // 注册 服务(service) 的简化版
    // 无法把其他服务(service)注入到 value service
    .value('greeter', {
      salutation: 'Hello',
      localize: function(newSalutation) {
        this.salutation = newSalutation;
      },
      get: function(name) {
        return this.salutation + ' ' + name + '!';
      }
    })
    .value('user', {
      name: 'world',
      set: function(newName) {
        this.name = newName;
      }
    });
})(window.angular);