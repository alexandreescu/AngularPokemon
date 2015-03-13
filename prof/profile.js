(function(){
 var profile = angular.module('Profile', []);
 profile.controller('EditProfile', ['$scope', function($scope){ // controls the edit buttons beside the fields that can be changed
  $scope.editfield = function(){ // this function will be accessible to all editable fields, however its functionality should be to only allow on fieid to be edited at any given time
   console.log('poop');
  }
 }])
})();