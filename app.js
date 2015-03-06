Items = new Mongo.Collection("items");

if (Meteor.isClient) {
  angular.module('familyst',['angular-meteor']);

  angular.module("familyst").controller("ItemsListCtrl", ['$scope', '$meteor',
    function($scope, $meteor){

      $scope.items = $meteor.collection(Items);

   }]);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    debugger
    if (Items.find().count() === 0) {
      var items = [
        {'title': 'Dubstep-Free Zone'},
        {'title': 'All dubstep all the time'},
        {'title': 'Savage lounging'}
      ];

      for (var i = 0; i < items.length; i++)
        Items.insert({title: items[i].title});

    }
   });
}
