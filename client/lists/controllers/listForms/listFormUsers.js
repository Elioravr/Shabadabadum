angular
  .module('familyst')
  .controller('ListFormUsersCtrl', ListFormUsersCtrl);

ListFormUsersCtrl.$inject = [
  '$meteor',
  '$scope',
  '$stateParams',
  '$state',
  '$rootScope',
  '$ionicLoading',
  '$ionicHistory'
];

function ListFormUsersCtrl ($meteor,
                            $scope,
                            $stateParams,
                            $state,
                            $rootScope,
                            $ionicLoading,
                            $ionicHistory) {

  // Function declaration
  $scope.createList = createList;
  $scope.update = update;
  $scope.insert = insert;
  $scope.getChosenUsers = getChosenUsers;
  $scope.initChosenUsers = initChosenUsers;
  $scope.showLoading = showLoading;
  $scope.stopLoading = stopLoading;

  $meteor.subscribe("usersForNewListForm").then(function () {
    $scope.users = $meteor.collection(Users, false);
    $scope.initChosenUsers();
  });
  $scope.lists = $meteor.collection(Lists).subscribe('lists');
  $scope.listName = $stateParams.listName;
  $scope.searchedUser = '';

  function createList () {
    newList = {
      name: $scope.listName,
      users: $scope.getChosenUsers()
    }

    if ($scope.isNew) {
      $scope.insert(newList);
    }
    else {
      $scope.update();
    }
  }

  function insert (newList) {
    $scope.lists.save(newList).then(
      function (result) { // success
        $state.go("home.lists");
        $scope.chosenUsers = {};
      },
      function (err) { // err
        console.log(err);
      }
    );
  }

  function update () {
    $scope.list.users = $scope.getChosenUsers();
    $scope.list.save().then(
      function (result) { // success
        // $state.go("home.list", $scope.list._id);
        $ionicHistory.goBack(-1);
        $scope.chosenUsers = {};
      },
      function (err) { // err
        console.log(err);
      }
    );
  }

  function initChosenUsers () {
    $scope.chosenUsers = {};
    $scope.showLoading();
    $scope.isNew = true;
    var users = $stateParams.listUsers
    if (users.length !== 0) {
      _.each(users, function(user) {
        $scope.chosenUsers[user._id] = true;
      });

      console.log($stateParams.listId);
      $meteor.subscribe("list", $stateParams.listId).then(function(subscriptionHandle) {
        $scope.list = $meteor.object(Lists, $stateParams.listId, false);
        $scope.isNew = false;
        $scope.stopLoading();
      });
    }
    else {
      $scope.stopLoading();
    }
  }

  function getChosenUsers () {
    mappedUsers = [];

    mappedUsers = _.map($scope.users, function (user) {
      ids = _.keys($scope.chosenUsers);
      if (_.contains(ids, user._id) &&
          $scope.chosenUsers[user._id] &&
          $rootScope.currentUser._id !== user._id) {
        chosenUser = {
          _id: user._id,
          profile: user.profile
        };
        return chosenUser;
      }
    });

    mappedUsers.push($rootScope.currentUser);

    return _.without(mappedUsers, undefined);
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
