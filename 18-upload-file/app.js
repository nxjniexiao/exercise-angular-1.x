angular.module('myApp', ['angularFileUpload']).controller('MyController', [
  '$scope', 'FileUploader',
  function ($scope, FileUploader) {
    $scope.uploader = new FileUploader();
  }
]);
