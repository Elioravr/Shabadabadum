angular
  .module('familyst')
  .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = [
  '$scope',
  '$rootScope',
  '$state',
  '$ionicPopup',
  '$location',
  '$ionicHistory',
  '$ionicLoading'
];

function ProfileCtrl ($scope,
                      $rootScope,
                      $state,
                      $ionicPopup,
                      $location,
                      $ionicHistory,
                      $ionicLoading) {

  if($rootScope.currentUser === "undefined" || $rootScope.currentUser === null) {
      $location.path("/login");
  }

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.view = {};

    if ($rootScope.currentUser.profile.picture) {
      $scope.view.profileSrc = $rootScope.currentUser.profile.picture;
      $scope.view.class = "user-picture user-picture-facebook"
    }
    else {
      // $scope.view.profileSrc = "/FamilystSuit.svg"
      $scope.view.class = "user-picture"
    }
  });

  // Function Declaration
  $scope.logout = logout;

  function logout () {
    $ionicLoading.show({
      templateUrl: "client/users/views/loading.ng.html"
    });
    Meteor.logout(function () {
      $ionicLoading.hide();
      $location.path("/login");
    });
  };
}

