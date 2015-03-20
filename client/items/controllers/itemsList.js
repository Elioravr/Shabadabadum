angular.module('familyst').controller("ItemsListCtrl", ['$scope', '$meteor', '$rootScope',
  function($scope, $meteor, $rootScope){

    // $scope.items = $meteor.collection(Items.find({}, {sort: {createdAt: -1}}));
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
