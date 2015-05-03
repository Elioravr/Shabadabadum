angular
  .module('familyst')
  .controller('ListFormUsersCtrl', ListFormUsersCtrl);

ListFormUsersCtrl.$inject = [
  '$meteor',
  '$scope',
  '$stateParams',
  '$state',
  '$rootScope'
];

function ListFormUsersCtrl ($meteor,
                            $scope,
                            $stateParams,
                            $state,
                            $rootScope) {

  $scope.users = $meteor.collection(Users, false).subscribe('usersForNewListForm');
  $scope.lists = $meteor.collection(Lists).subscribe('lists');
  $scope.listName = $stateParams.listName;
  $scope.searchedUser = '';
  $scope.chosenUsers = {};

  // Function declaration
  $scope.createList = createList;
  $scope.insert = insert;
  $scope.getChosenUsers = getChosenUsers;

  function createList () {
    newList = {
      name: $scope.listName,
      users: $scope.getChosenUsers()
    }

    $scope.insert(newList);
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

  function getChosenUsers () {
    mappedUsers = [];

    mappedUsers = _.map($scope.users, function (user) {
      ids = _.keys($scope.chosenUsers);
      if (_.contains(ids, user._id)) {
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
}
