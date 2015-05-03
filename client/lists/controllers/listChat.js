angular
  .module("familyst")
  .controller("ListChatCtrl", ListChatCtrl);

ListChatCtrl.$inject = [
  '$meteor',
  '$scope',
  '$rootScope',
  '$ionicNavBarDelegate',
  '$stateParams',
  '$ionicScrollDelegate',
  '$ionicLoading'
];

function ListChatCtrl ($meteor,
                       $scope,
                       $rootScope,
                       $ionicNavBarDelegate,
                       $stateParams,
                       $ionicScrollDelegate,
                       $ionicLoading) {

  // Functions declaration
  $scope.getMomentedDate = getMomentedDate;
  $scope.insertNewMessage = insertNewMessage;
  $scope.showLoading = showLoading;
  $scope.stopLoading = stopLoading;

  $scope.showLoading();

  // $rootScope.hideTabs = true;
  $scope.newMessage = '';

  $meteor.subscribe("list", $stateParams.listId).then(function(subscriptionHandle) {
    $scope.list = $meteor.object(Lists, $stateParams.listId, false);
    $ionicScrollDelegate.scrollBottom(true);
    $scope.stopLoading();

    $scope.$watch('list.messages', function(newValue, oldValue) {
      console.log(newValue);
      $ionicScrollDelegate.scrollBottom(true);
    });
  });


  $scope.$on('$ionicView.beforeEnter', function () {
    $ionicNavBarDelegate.showBackButton(true);
  });

  function getMomentedDate (date) {
    return moment(date).format("DD/MM hh:mm");
  }

  function insertNewMessage () {
    newMessage = {
      content:   $scope.newMessage,
      profile:   $rootScope.currentUser.profile,
      userId:    $rootScope.currentUser._id,
      createdAt: new Date()
    };

    $scope.list.messages.push(newMessage);
    $scope.newMessage = '';
    $scope.list.save().then(
      function () {
        $ionicScrollDelegate.scrollBottom(true);
      },
      function () {
        console.log(arguments);
      }
    );
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
