angular.module("familyst").controller("ListsListCtrl", ['$meteor', '$scope', '$stateParams',
  function($meteor, $scope, $stateParams){
    $scope.lists = $meteor.collection(Lists)

    // $scope.list = $stateParams.listId;

}]);
