angular
  .module('familyst')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope',
                     '$rootScope',
                     '$state',
                     '$ionicPopup',
                     '$ionicLoading',
                     '$ionicNavBarDelegate'];

function LoginCtrl ($scope,
                    $rootScope,
                    $state,
                    $ionicPopup,
                    $ionicLoading,
                    $ionicNavBarDelegate) {

  $rootScope.$watch("currentUser", function() {
    $state.go("home.lists");
  });

  $scope.$on('$ionicView.beforeEnter', function () {
    $ionicNavBarDelegate.showBackButton(false);
  });

  $scope.$on('$ionicView.afterEnter', function () {
    setTimeout(function() {
      $('.login-form .padding').fadeIn()
    }, 1000)
  });

  // Functions declartion
  $scope.goToSignup = goToSignup;
  $scope.alertFacebookError = alertFacebookError;
  $scope.showLoading = showLoading;
  $scope.stopLoading = stopLoading;
  $scope.login = login;
  $scope.saveToCordova = saveToCordova;
  $scope.moveToHome = moveToHome;
  $scope.loginWithFacebook = loginWithFacebook;
  $scope.clearForm = clearForm;

  function goToSignup () {
    $state.go('register');
  }

  function login () {
    $scope.showLoading();
    Meteor.loginWithPassword($scope.emailAddress.toLowerCase(), $scope.password, function(err) {
      $scope.stopLoading();
      if (err)
        $ionicPopup.alert({
          title : 'Error Occurred',
          template : 'Error occurred while logging in.'
        });
      else
        $scope.saveToCordova();
        $scope.moveToHome();
    });
  }

  function loginWithFacebook () {
    $scope.showLoading();
    Meteor.loginWithFacebook({}, function(err){
      $scope.stopLoading();
      if (err) {
        console.log(err);
        $scope.alertFacebookError()
      }
      else {
        $scope.saveToCordova();
        $scope.moveToHome();
      }
    });
  }

  function saveToCordova () {
    if (typeof(cordova) !== "undefined") {
      cordova.file["Meteor.loginToken"] = localStorage.getItem("Meteor.loginToken");
      cordova.file["Meteor.loginTokenExpires"] = localStorage.getItem("Meteor.loginTokenExpires");
      cordova.file["userId"] = localStorage.getItem("userId");
    }
  }

  function moveToHome () {
    $scope.clearForm()
    $state.go("home.lists");
  }

  function alertFacebookError () {
    $ionicPopup.alert({
      title : 'Something went wrong',
      templateUrl: "client/users/views/login_error.ng.html"
    });
  }

  function showLoading () {
    $ionicLoading.show({
      templateUrl: "client/users/views/loading.ng.html"
    });
  }

  function stopLoading () {
    $ionicLoading.hide();
  }

  function clearForm () {
    $scope.emailAddress = '';
    $scope.password = '';
  }
}
