angular.module("familyst").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('lists', {
        url: '/lists',
        templateUrl: 'client/lists/views/lists_list.ng.html',
        controller: 'ListsListCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'client/users/views/login_form.ng.html',
        controller: 'LoginCtrl'
      })
      .state('items', {
        url: '/list/:listId',
        templateUrl: 'client/items/views/items_list.ng.html',
        controller: 'ItemsListCtrl'
      });

      $urlRouterProvider.otherwise("/login");
}]);
