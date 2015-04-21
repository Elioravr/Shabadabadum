angular
  .module("familyst")
  .controller("ListChatCtrl", ListChatCtrl);

ListChatCtrl.$inject = [
  '$meteor',
  '$scope',
  '$rootScope',
  '$ionicNavBarDelegate',
  '$stateParams',
  '$ionicScrollDelegate'
];

function ListChatCtrl ($meteor,
                       $scope,
                       $rootScope,
                       $ionicNavBarDelegate,
                       $stateParams,
                       $ionicScrollDelegate) {

  $scope.hideTabs = true;
  $scope.list = $meteor.object(Lists, $stateParams.listId, false);
  $scope.newMessage = '';

  $scope.$on('$ionicView.beforeEnter', function () {
    $ionicNavBarDelegate.showBackButton(true);
  });

  $scope.$on('$ionicView.afterEnter', function () {
    $ionicScrollDelegate.scrollBottom(true);
  });

  // Functions declaration
  $scope.getMomentedDate = getMomentedDate;
  $scope.insertNewMessage = insertNewMessage;

  function getMomentedDate (date) {
    return moment(date).format("DD/MM hh:mm");
  }

  function insertNewMessage () {
    newMessage = {
      content: $scope.newMessage,
      profile: $rootScope.currentUser.profile,
      userId:  $rootScope.currentUser._id
    };

    $scope.list.messages.push(newMessage);
    $scope.list.save().then(
      function () {
        $scope.newMessage = '';
        $ionicScrollDelegate.scrollBottom(true);
      },
      function () {
        console.log(arguments);
      }
    );
  }
}
