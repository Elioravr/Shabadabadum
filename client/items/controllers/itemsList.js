angular
  .module('familyst')
  .controller('ItemsListCtrl', ItemsListCtrl);

ItemsListCtrl.$inject = ['$scope', '$meteor', '$rootScope', '$stateParams'];

function ItemsListCtrl ($scope, $meteor, $rootScope, $stateParams) {
  $scope.list = $meteor.object(Lists, $stateParams.listId, false);

  // Functions declartion
  $scope.insert = insert;
  $scope.markAsDone = markAsDone;
  $scope.remove = remove;

  function insert () {
    $scope.newItem.isDone = false;
    $scope.list.items.push($scope.newItem);
    $scope.list.save().then(
      function () {
        $scope.newItem.title = '';
      },
      function () {
        console.log(arguments);
      }
    );
  }

  function markAsDone (item) {
    item.isDone = !item.isDone;
  }

  function remove (item) {
    var index = $scope.list.items.indexOf(item);
    $scope.list.items.splice(index, 1);
  }
}
