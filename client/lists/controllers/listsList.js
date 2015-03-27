angular.module("familyst").controller("ListsListCtrl", ['$meteor', '$scope', '$rootScope', '$stateParams', '$ionicPopup',
  function($meteor, $scope, $rootScope, $stateParams, $ionicPopup){
    $scope.lists = $meteor.collection(Lists)

    // $scope.list = $stateParams.listId;
    $scope.lists = $meteor.collection(Lists);

    $scope.insert = function () {
      // $scope.newList.owner = $rootScope.currentUser._id;
      $scope.newList.createdAt = new Date();
      $scope.lists.save($scope.newList).then(
        function () {
          $scope.newList.name = "";
        }
      );
    };

    $scope.remove = function (list) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Removing a List',
        template: 'Are you sure you want to remove that list?'
      });
      confirmPopup.then(function(res) {
        if (res) {
          $scope.lists.remove(list).then (
            function() {}, // success
            function (error) { // error
              console.log(error.reason);
            }
          );
        }
      });
    };
}]);
