angular
  .module('familyst')
  .controller('ItemsListCtrl', ItemsListCtrl);

ItemsListCtrl.$inject = [
  '$scope',
  '$meteor',
  '$rootScope',
  '$stateParams',
  '$ionicNavBarDelegate',
  '$state',
  '$filter',
  '$ionicLoading',
  '$ionicScrollDelegate'
];

function ItemsListCtrl ($scope,
                        $meteor,
                        $rootScope,
                        $stateParams,
                        $ionicNavBarDelegate,
                        $state,
                        $filter,
                        $ionicLoading,
                        $ionicScrollDelegate) {

  // Functions declartion
  $scope.insert = insert;
  $scope.markAsDone = markAsDone;
  $scope.remove = remove;
  $scope.addItemMessage = addItemMessage;
  $scope.itemsLeft = itemsLeft;
  $scope.items = items;
  $scope.getItemCheckboxIcon = getItemCheckboxIcon;
  $scope.showLoading = showLoading;
  $scope.stopLoading = stopLoading;

  $scope.showLoading();

  $meteor.subscribe("list", $stateParams.listId).then(function(subscriptionHandle) {
    $scope.list = $meteor.object(Lists, $stateParams.listId, false);
    $scope.stopLoading();
  });

  $scope.$on('$ionicView.beforeEnter', function () {
    $ionicNavBarDelegate.showBackButton(true);
    $ionicScrollDelegate.scrollTop(true);
  });

  function insert () {
    $scope.newItem.createdAt = new Date();
    $scope.newItem.isDone = false;
    $scope.list.items.push($scope.newItem);
    $scope.list.save().then(
      function () {
        $scope.addItemMessage($scope.newItem.title);
        $scope.newItem.title = '';
      },
      function () {
        console.log(arguments);
      }
    );
  }

  function addItemMessage (title) {
    username = $filter('displayName')($rootScope.currentUser);
    content = username + " has added \"" + title + "\" to the list.";
    newMessage = {
      content:   content,
      createdAt: new Date()
    };
    $scope.list.messages.push(newMessage);
    $scope.list.save().then(
      function () {
        console.log(arguments);
      },
      function () {
        console.log(arguments);
      }
    );
  }

  function markAsDone (item) {
    console.log("markAsDone start");
    $scope.showLoading();
    item.isDone = !item.isDone;
    $scope.list.save().then(
      function () {
        console.log("markAsDone ends");
        $scope.stopLoading();
      }
    );
  }

  function remove (item) {
    var index = $scope.list.items.indexOf(item);
    $scope.list.items.splice(index, 1);
    $scope.list.save();
  }

  function items () {
    if (!$scope.list) {
      return [];
    }

    var items = $scope.list.items.sort(function (a, b) {
      return b.createdAt - a.createdAt;
    });
    return items;
  }

  function itemsLeft () {
    if (!$scope.list) {
      return 0;
    }

    left = _.filter($scope.list.items, function(item) {
      return(item.isDone !== true);
    });
    return left.length;
  }

  function getItemCheckboxIcon (item) {
    if (item.isDone === true) {
      return 'ion-android-checkbox-outline'
    }
    else {
      return 'ion-android-checkbox-outline-blank'
    }
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
