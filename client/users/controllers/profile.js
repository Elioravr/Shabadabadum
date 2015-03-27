angular.module('familyst').controller('ProfileCtrl', ['$scope', '$rootScope', '$state', '$ionicPopup', function($scope, $rootScope, $state, $ionicPopup) {
  $scope.logout = function () {
    Meteor.logout();
  };
}]);
