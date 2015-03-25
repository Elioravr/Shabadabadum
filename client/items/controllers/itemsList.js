angular.module('familyst').controller("ItemsListCtrl", ['$scope', '$meteor', '$rootScope', '$stateParams',
  function($scope, $meteor, $rootScope, $stateParams){
    $scope.listId = $stateParams.listId;
    console.log($scope.listId);
    $scope.items = $meteor.collection(Items);

    $scope.insert = function () {
      $scope.newItem.owner = $rootScope.currentUser._id;
      $scope.newItem.createdAt = new Date();
      $scope.items.save($scope.newItem).then(
        function () {
          $scope.newItem.title = "";
        }
      );
    };

    $scope.markAsDone = function (item) {
      item.is_done = !item.is_done;
    };

    $scope.remove = function (item) {
      $scope.items.remove(item).then (
        function() {}, // success
        function (error) { // error
          console.log(error.reason);
        }
      );
    };
 }]);
