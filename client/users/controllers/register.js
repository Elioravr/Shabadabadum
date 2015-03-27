angular.module('familyst').controller('RegisterCtrl', ['$scope', '$rootScope', '$state', '$ionicPopup', function($scope, $rootScope, $state, $ionicPopup) {
  $scope.goToLogin = function() {
    $state.go('login');
  };

  $scope.register = function () {
    if ($scope.password === $scope.passwordConfirmation) {
      Accounts.createUser({
        email: $scope.emailAddress,
        password: $scope.password,
        profile: {
            firstName: $scope.firstName,
            lastName: $scope.lastName
        }
      }, function () {
        $state.go("lists");
      });
    } else {
      $ionicPopup.alert({
        title : 'Oops, Something went wrong',
        template : 'Your passwords doesn\'t match.'
      });
    }
  }

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
