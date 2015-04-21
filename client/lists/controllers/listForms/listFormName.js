angular
  .module('familyst')
  .controller('ListFormNameCtrl', ListFormNameCtrl);

ListFormNameCtrl.$inject = [
  '$meteor',
  '$scope',
  '$state',
  '$ionicPopup',
  '$ionicNavBarDelegate'];

function ListFormNameCtrl ($meteor,
                           $scope,
                           $state,
                           $ionicPopup,
                           $ionicNavBarDelegate) {
  $scope.listName = '';

  $scope.$on('$ionicView.beforeEnter', function () {
    $ionicNavBarDelegate.showBackButton(true);
  });

  // // Functions Declaration
  $scope.goToUsersForm = goToUsersForm;
  $scope.alertNameRequire = alertNameRequire;

  function goToUsersForm () {
    if ($scope.listName.trim(' ') !== '') {
      $state.go("home.newListUsers", {listName: $scope.listName});
      $scope.listName = '';
    }
    else {
      $scope.alertNameRequire();
    }
  };

  function alertNameRequire () {
    $ionicPopup.alert({
      title : 'Every list needs a name',
      template : 'Please enter a name.'
    });
  }
}
