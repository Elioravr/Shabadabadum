angular.module("familyst").controller("ListsListCtrl", ['$meteor', '$scope', '$rootScope', '$stateParams', '$ionicPopup', '$ionicHistory', '$location', '$state',
  function($meteor, $scope, $rootScope, $stateParams, $ionicPopup, $ionicHistory, $location, $state){
    if($rootScope.currentUser === "undefined" || $rootScope.currentUser === null) {
        $state.go("login");
    }

    $scope.lists = $meteor.collection(Lists).subscribe('Lists');

    $scope.insert = function () {
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
