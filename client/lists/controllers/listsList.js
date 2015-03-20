angular.module("familyst").controller("ListsListCtrl", ['$scope', '$stateParams',
  function($scope, $stateParams){

    $scope.listId = $stateParams.listId;

}]);
