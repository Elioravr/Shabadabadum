angular
  .module('familyst')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['$scope',
                        '$rootScope',
                        '$state',
                        '$ionicPopup',
                        '$ionicLoading',
                        '$ionicNavBarDelegate'];

function RegisterCtrl ($scope,
                       $rootScope,
                       $state,
                       $ionicPopup,
                       $ionicLoading,
                       $ionicNavBarDelegate) {

  $scope.$on('$ionicView.beforeEnter', function () {
    $ionicNavBarDelegate.showBackButton(true);
  });

  // Functions declartion
  $scope.backToLogin = backToLogin;
  $scope.register = register;
  $scope.serializeUser = serializeUser;
  $scope.showLoading = showLoading;
  $scope.stopLoading = stopLoading;
  $scope.goToHome = goToHome;
  $scope.alertPasswordsError = alertPasswordsError;
  $scope.clearForm = clearForm;
  $scope.confirmPasswords = confirmPasswords;

  function backToLogin () {
    $state.back();
  }

  function register () {
    if ($scope.confirmPasswords()) {
      $scope.showLoading();
      var user = $scope.serializeUser();
      Accounts.createUser(user, function () {
        $scope.stopLoading();
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

  function showLoading () {
    $ionicLoading.show({
      templateUrl: "client/users/views/loading.ng.html"
    });
  }

  function stopLoading () {
    $ionicLoading.hide();
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
