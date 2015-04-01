angular
  .module('familyst')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', '$rootScope', '$state', '$ionicPopup', '$ionicHistory', '$location'];

function LoginCtrl ($scope, $rootScope, $state, $ionicPopup, $ionicHistory, $location) {
  if($rootScope.currentUser) {
    $state.go("home.lists");
  }

  // Functions declartion
  $scope.goToSignup = goToSignup;
  $scope.login = login;
  $scope.clearForm = clearForm;

  function goToSignup () {
    $state.go('register');
  }

  function login () {
    Meteor.loginWithPassword($scope.emailAddress.toLowerCase(), $scope.password, function(err) {
      if (err)
        $ionicPopup.alert({
          title : 'Error Occurred',
          template : 'Error occurred while logging in.'
        });
      else
        $scope.clearForm()
        $state.go("home.lists");
    });
  }

  function clearForm () {
    $scope.emailAddress = '';
    $scope.password = '';
  }
}
