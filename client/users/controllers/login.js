// angular.module("familyst").controller("LoginCtrl", ['$scope', '$stateParams',
//   function($scope, $stateParams){

//     // $scope.listId = $stateParams.listId;

// }]);
angular.module('familyst').controller('LoginCtrl', ['$scope', '$rootScope', '$state', '$ionicPopup', function($scope, $rootScope, $state, $ionicPopup) {
  $scope.goToSignup = function() {
    $state.go('register');
  };

  $scope.login = function() {
    Meteor.loginWithPassword($scope.emailAddress.toLowerCase(), $scope.password, function(err) {
      if (err)
        $ionicPopup.alert({
          title : 'Error Occurred',
          template : 'Error occurred while logging in.'
        });
      else
        $state.go('lists');
    });
  };
}]);
