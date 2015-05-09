angular
  .module('familyst')
  .controller('ListDetailsCtrl', ListDetailsCtrl);

ListDetailsCtrl.$inject = [
  '$meteor',
  '$scope',
  '$rootScope',
  '$state',
  '$ionicPopup',
  "$stateParams",
  '$ionicLoading'
];

function ListDetailsCtrl ($meteor,
                          $scope,
                          $rootScope,
                          $state,
                          $ionicPopup,
                          $stateParams,
                          $ionicLoading) {

  // Functions declartion
  $scope.getUserPicture = getUserPicture;
  $scope.changeName = changeName;
  $scope.showLoading = showLoading;
  $scope.stopLoading = stopLoading;

  $scope.showLoading();

  $meteor.subscribe("list", $stateParams.listId).then(function(subscriptionHandle) {
    $scope.list = $meteor.object(Lists, $stateParams.listId, false);
    $scope.newListName = $scope.list.name;
    $scope.stopLoading();
  });

  function getUserPicture (user) {
    if (user.profile.picture) {
      return user.profile.picture;
      // $scope.view.class = "user-picture user-picture-facebook"
    }
    else {
      return "FamilystSuit.svg"
      // $scope.view.class = "user-picture"
    }
  }

  function changeName () {
    $scope.showLoading();
    $scope.list.name = $scope.newListName;
    $scope.list.save().then(
      function () {
        $scope.newListName = $scope.list.name;
        $scope.stopLoading();
      },
      function () {
        $scope.stopLoading();
        $ionicPopup.alert({
          title : 'Something went wrong',
          templateUrl: "client/users/views/login_error.ng.html"
        });
      }
    );
  }

  function showLoading () {
    $ionicLoading.show({
      templateUrl: "client/users/views/loading.ng.html"
    });
  }

  function stopLoading () {
    $ionicLoading.hide();
  }
}
