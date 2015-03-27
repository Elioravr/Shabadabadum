angular.module('familyst').controller("ItemsListCtrl", ['$scope', '$meteor', '$rootScope', '$stateParams',
  function($scope, $meteor, $rootScope, $stateParams){
    // debugger
    // $scope.listId = $stateParams.listId;
    $scope.list = $meteor.object(Lists, $stateParams.listId);
    $scope.items = $meteor.collection(Items);

    $scope.sortItems = function () {
      $scope.items.sort(function(a,b){
        return (new Date(a.createdAt) - new Date(b.createdAt)) * (-1);
      });
    }

    $scope.insert = function () {
      // $scope.newItem.owner = $rootScope.currentUser._id;
      $scope.newItem.createdAt = new Date();
      $scope.newItem.is_done = false;
      // $scope.list.items.push($scope.newItem);
      var list = {
        _id: $scope.list._id,
        name: $scope.list.name,
        createdAt: $scope.list.createdAt
      }
      $scope.newItem.list = list;
      $scope.items.save($scope.newItem).then(
        function () {
          $scope.newItem.title = "";
          $scope.sortItems();
        },
        function () {
          console.log(arguments);
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

    $scope.sortItems();
 }]);
