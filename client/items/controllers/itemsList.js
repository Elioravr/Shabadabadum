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
  $scope.getItemMessage = getItemMessage;
  $scope.itemsLeft = itemsLeft;
  $scope.itemsForAutoComplete = itemsForAutoComplete;
  $scope.items = items;
  $scope.getItemCheckboxIcon = getItemCheckboxIcon;
  $scope.showLoading = showLoading;
  $scope.stopLoading = stopLoading;

  $scope.showLoading();
  $scope.newItem = {};
  $scope.newItem.title = '';

  $scope.$on('$ionicView.beforeEnter', function () {

    $meteor.subscribe("list", $stateParams.listId).then(function(subscriptionHandle) {
      $scope.subscriptionHandle = subscriptionHandle;

      $scope.list = $meteor.object(Lists, $stateParams.listId, false);
      $scope.stopLoading();
    });

    Meteor.subscribe('list', $stateParams.listId)

    $ionicNavBarDelegate.showBackButton(true);
    if (typeof($scope.scrollPosition) !== "undefined") {
      $ionicScrollDelegate.scrollTo($scope.scrollPosition.left,
                                    $scope.scrollPosition.top,
                                    true);
    }
  });

  $scope.$on('$ionicView.beforeLeave', function () {
    $scope.scrollPosition = $ionicScrollDelegate.getScrollPosition();
  });

  $scope.$on('$ionicView.afterLeave', function () {
    $scope.subscriptionHandle.stop();
  });

  function insert () {
    var newItem = {
      title: $scope.newItem.title,
      isDone: false,
      profile: $rootScope.currentUser.profile,
      createdAt: new Date()
    };
    $scope.newItem.title = '';

    $meteor.call('insertNewItem', $scope.list._id, newItem, getItemMessage(newItem.title, 'insert')).then(
      function () {
        console.log("success");
      },
      function () {
        console.log(arguments);
      }
    );
  }

  function getItemMessage (title, action) {
    username = $filter('displayName')($rootScope.currentUser);
    if (action === 'insert') {
      content = username + " has added \"" + title + "\" to the list.";
    } else {
      content = username + " has removed \"" + title + "\" to the list.";
    }
    newMessage = {
      content:   content,
      createdAt: new Date()
    };

    return newMessage;
  }

  function markAsDone (item) {
    item.isDone = !item.isDone;
    console.log('isDone:', item.isDone);
    console.log('createdAt:', item.createdAt);
    $meteor.call('markAsDone', $scope.list._id, item.createdAt, item.isDone).then(
      function (data) {

      },
      function(err){

      }
    );
  }

  function remove (item) {
    var index = $scope.list.items.indexOf(item);
    $scope.list.items.splice(index, 1);
    $scope.list.save().then(
      function () {
        $scope.getItemMessage(item.title, 'remove');
      }
    );
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

  function itemsForAutoComplete () {
    if (!$scope.list) {
      return [];
    }

    var items = _.map($scope.list.items, function (item) {
      return(item.title)
    });

    return _.uniq(items);
  }

  function getItemCheckboxIcon (item) {
    if (item) {
      if (item.isDone === true) {
        return 'ion-android-checkbox-outline'
      }
      else {
        return 'ion-android-checkbox-outline-blank'
      }
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
