angular.module('familyst').controller('RegisterCtrl', ['$scope', '$rootScope', '$state', '$ionicPopup', function($scope, $rootScope, $state, $ionicPopup) {
  $scope.goToLogin = function() {
    $state.go('login');
  };

  // $scope.login = function() {
  //   Meteor.loginWithPassword($scope.emailAddress.toLowerCase(), $scope.password, function(err) {
  //     if (err)
  //       $ionicPopup.alert({
  //         title : 'Error Occurred',
  //         template : 'Error occurred while logging in.'
  //       });
  //     else
  //       $state.go('lists');
  //   });
  // }
}]);
