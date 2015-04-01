angular
  .module('familyst')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['$scope', '$rootScope', '$state', '$ionicPopup', '$ionicHistory', '$location'];

function RegisterCtrl ($scope, $rootScope, $state, $ionicPopup, $ionicHistory, $location) {

  // Functions declartion
  $scope.register = register;
  $scope.serializeUser = serializeUser;
  $scope.goToHome = goToHome;
  $scope.alertPasswordsError = alertPasswordsError;
  $scope.clearForm = clearForm;
  $scope.confirmPasswords = confirmPasswords;

  function register () {
    if ($scope.confirmPasswords()) {
      var user = $scope.serializeUser();
      Accounts.createUser(user, function () {
        $scope.clearForm();
        $scope.goToHome();
      });
    } else {
      $scope.alertPasswordsError();
    }
  }

  function serializeUser () {
    return {
      email: $scope.emailAddress,
      password: $scope.password,
      profile: {
          firstName: $scope.firstName,
          lastName: $scope.lastName
      }
    }
  }

  function goToHome () {
    $state.go("home.lists")
  }

  function alertPasswordsError () {
    $ionicPopup.alert({
      title : 'Oops, Something went wrong',
      template : 'Your passwords doesn\'t match.'
    });
  }

  function clearForm () {
    $scope.emailAddress = '';
    $scope.password = '';
    $scope.passwordConfirmation = '';
    $scope.firstName = '';
    $scope.lastName = '';
  }

  function confirmPasswords () {
    return $scope.password === $scope.passwordConfirmation
  }
}
