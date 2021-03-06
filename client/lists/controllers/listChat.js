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

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.showLoading();

    $scope.newMessage = '';

    $meteor.subscribe("listForChat", $stateParams.listId).then(function(subscriptionHandle) {
      $scope.subscriptionHandle = subscriptionHandle;
      $scope.list = $meteor.object(Lists, $stateParams.listId, false);
      $ionicScrollDelegate.scrollBottom(true);
      $scope.stopLoading();

      $scope.$watch('list.messages', function(newValue, oldValue) {
        $ionicScrollDelegate.scrollBottom(true);
      });
    });
  });

  $scope.$on('$ionicView.afterEnter', function () {
    $ionicNavBarDelegate.showBackButton(true);
    $(".tab-nav").hide();
    $(".bar-footer").css("bottom", 0);
    $(".chat-container").css("top", "43px").css("bottom", "44px");
  });

  $scope.$on('$ionicView.beforeLeave', function () {
    $(".tab-nav").show()
  });

  $scope.$on('$ionicView.afterLeave', function () {
    $scope.subscriptionHandle.stop();
  });

  function getMomentedDate (date) {
    return moment(date).format("DD/MM HH:mm");
  }

  function insertNewMessage () {
    newMessage = {
      content:   $scope.newMessage,
      profile:   $rootScope.currentUser.profile,
      userId:    $rootScope.currentUser._id,
      createdAt: new Date()
    };

    $meteor.call('insertNewMessage', $scope.list._id, newMessage).then(
      function () {
        $scope.newMessage = '';
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
