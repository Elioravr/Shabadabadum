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
  '$filter'
];

function ItemsListCtrl ($scope,
                        $meteor,
                        $rootScope,
                        $stateParams,
                        $ionicNavBarDelegate,
                        $state,
                        $filter) {

  $scope.list = $meteor.object(Lists, $stateParams.listId, false);

  $scope.$on('$ionicView.beforeEnter', function () {
    $ionicNavBarDelegate.showBackButton(true);
  });

  // Functions declartion
  $scope.insert = insert;
  $scope.markAsDone = markAsDone;
  $scope.remove = remove;
  $scope.addItemMessage = addItemMessage;

  function insert () {
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
    item.isDone = !item.isDone;
    $scope.list.save();
  }

  function remove (item) {
    var index = $scope.list.items.indexOf(item);
    $scope.list.items.splice(index, 1);
    $scope.list.save();
  }
}
