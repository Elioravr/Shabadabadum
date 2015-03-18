Items = new Mongo.Collection("items");

Items.allow({
  insert: function (userId, item) {
    return userId && item.owner === userId;
  },
  update: function (userId, item, fields, modifier) {
    if (userId !== item.owner)
      return false;

    return true;
  },
  remove: function (userId, item) {
    if (userId !== item.owner)
      return false;

    return true;
  }
});

if (Meteor.isClient) {
  var app = angular.module('familyst', [
    'angular-meteor',
    'ui.router',
    'ionic']); //,
    // 'ngCordova.plugins.datePicker']);

  function onReady() {
    angular.bootstrap(document, ['familyst']);
  }

  if (Meteor.isCordova) {
    angular.element(document).on("deviceready", onReady);
  }
  else {
    angular.element(document).ready(onReady);
  }


  // angular.module('familyst',['angular-meteor']);

  angular.module('familyst').controller("ItemsListCtrl", ['$scope', '$meteor', '$rootScope',
    function($scope, $meteor, $rootScope){

      $scope.items = $meteor.collection(Items);

      $scope.insert = function () {
        $scope.newItem.owner = $rootScope.currentUser._id;
        $scope.items.push($scope.newItem);
      }

      $scope.remove = function (item) {
        $scope.items.remove(item);
      };
   }]);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // if (Items.find().count() === 0) {
    //   var items = [
    //     {'title': 'Dubstep-Free Zone'},
    //     {'title': 'All dubstep all the time'},
    //     {'title': 'Savage lounging'}
    //   ];

    //   for (var i = 0; i < items.length; i++)
    //     Items.insert({title: items[i].title});

    // }
   });
}
