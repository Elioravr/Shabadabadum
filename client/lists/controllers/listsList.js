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
  '$ionicNavBarDelegate',
  '$ionicScrollDelegate'
];

function ListsListCtrl ($meteor,
                        $scope,
                        $rootScope,
                        $stateParams,
                        $ionicPopup,
                        $ionicHistory,
                        $state,
                        $ionicLoading,
                        $ionicNavBarDelegate,
                        $ionicScrollDelegate) {

  // Functions declartion
  $scope.insert = insert;
  $scope.toggleEdit = toggleEdit;
  $scope.goToNewList = goToNewList;
  $scope.remove = remove;
  $scope.removeFromCordova = removeFromCordova;
  $scope.itemsLeft = itemsLeft;
  $scope.goToChat = goToChat;
  $scope.getMomentedDate = getMomentedDate;
  $scope.showLoading = showLoading;
  $scope.stopLoading = stopLoading;

  if($rootScope.currentUser === "undefined" || $rootScope.currentUser === null) {
      $state.go("login");
  }

  $scope.showLoading();

  $scope.$on('$ionicView.beforeEnter', function () {
    // $scope.$apply();
    $ionicNavBarDelegate.showBackButton(false);
    if (typeof($scope.scrollPosition) !== "undefined") {
      $ionicScrollDelegate.scrollTo($scope.scrollPosition.left,
                                    $scope.scrollPosition.top,
                                    true);
    }
  });

  $scope.$on('$ionicView.beforeLeave', function () {
    $scope.scrollPosition = $ionicScrollDelegate.getScrollPosition();
  });

  // $scope.lists = $meteor.collection(Lists).subscribe('lists');
  // $scope.editable = false;

  $meteor.subscribe("lists").then(
    function(subscriptionHandle) {
      $scope.lists = $meteor.collection(Lists).subscribe('lists', false);
      $scope.stopLoading();
      $scope.editable = false;
    },
    function () {
      $scope.removeFromCordova();
      $scope.stopLoading();
      $state.go("login");
    }
  );

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

  function removeFromCordova () {
    if (cordova === "undefined" || cordova === null) {
      delete cordova.file["Meteor.loginToken"];
      delete cordova.file["Meteor.loginTokenExpires"];
      delete cordova.file["userId"];
    }
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

  function itemsLeft (list) {
    left = _.filter(list.items, function(item) {
      return(item.isDone !== true);
    });
    return left.length;
  }

  function goToChat (list) {
    // $state.go("home.newListName");
    $state.go("home.list.chat", { listId: list._id.toString() });
  }

  function getMomentedDate (date) {
    return moment(date).format("DD/MM HH:mm");
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
