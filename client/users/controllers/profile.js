angular.module('familyst').controller('ProfileCtrl', ['$scope', '$rootScope', '$state', '$ionicPopup', '$location', '$ionicHistory', function($scope, $rootScope, $state, $ionicPopup, $location, $ionicHistory) {
  if($rootScope.currentUser === "undefined" || $rootScope.currentUser === null) {
      $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
      });
      $location.path("/login");
  }
  $scope.logout = function () {
    Meteor.logout();
    $location.path("/login");
  };
}]);
