angular
  .module("familyst")
  .controller("ListsListCtrl", ListsListCtrl);

ListsListCtrl.$inject = [
  '$meteor',
  '$scope',
  '$rootScope',
  '$stateParams',
  '$ionicPopup',
  '$ionicHistory',
  '$state',
  '$ionicLoading',
  '$ionicNavBarDelegate'
];

function ListsListCtrl ($meteor,
                        $scope,
                        $rootScope,
                        $stateParams,
                        $ionicPopup,
                        $ionicHistory,
                        $state,
                        $ionicLoading,
                        $ionicNavBarDelegate) {

  if($rootScope.currentUser === "undefined" || $rootScope.currentUser === null) {
      $state.go("login");
  }

  $scope.$on('$ionicView.beforeEnter', function () {
    $ionicNavBarDelegate.showBackButton(false);
  });

  $scope.lists = $meteor.collection(Lists).subscribe('lists');//.then(function () {
  $scope.editable = false;
  //   console.log("Aaaaaaaaa");
  // });

  // Functions declartion
  $scope.insert = insert;
  $scope.toggleEdit = toggleEdit;
  $scope.goToNewList = goToNewList;
  $scope.remove = remove;

  function insert () {
    $scope.lists.save($scope.newList).then(
      function () {
        $scope.newList.name = "";
      }
    );
  };

  function toggleEdit () {
    $scope.editable = !$scope.editable;
  }

  function goToNewList () {
    $state.go("home.newListName");
  }

  function remove (list) {
    if ($scope.editable) {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Quitting from a List',
        template: 'Are you sure you want to quit from that list?'
      });
      confirmPopup.then(function(res) {
        if (res) {
          var index = list.users.indexOf($rootScope.currentUser._id);
          list.users.splice(index, 1);
          $scope.lists.save();
        }
      });
    }
  };
}
