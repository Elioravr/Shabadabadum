angular.module("familyst").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'client/users/views/login_form.ng.html',
        views: {
          'profile-tab': {
            templateUrl: "client/users/views/login_form.ng.html",
            controller: 'LoginCtrl'
          }
        }
      })
      .state('lists', {
        url: '/lists',
        views: {
          'home-tab': {
            templateUrl: 'client/lists/views/lists_list.ng.html',
            controller: 'ListsListCtrl'
          }
        }
      })
      .state('list', {
        url: '/lists/:listId',
        views: {
          'home-tab': {
            templateUrl: 'client/items/views/items_list.ng.html',
            controller: 'ItemsListCtrl'
          }
        }
      });

      $urlRouterProvider.otherwise("/login");
}]);
