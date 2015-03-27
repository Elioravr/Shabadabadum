angular.module("familyst").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          'login-tab': {
            templateUrl: "client/users/views/login_form.ng.html",
            controller: 'LoginCtrl'
          }
        }
      })
      .state('register', {
        url: '/register',
        views: {
          'login-tab': {
            templateUrl: "client/users/views/register_form.ng.html",
            controller: 'RegisterCtrl'
          }
        }
      })
      .state('profile', {
        url: '/profile',
        views: {
          'profile-tab': {
            templateUrl: "client/users/views/profile.ng.html",
            controller: 'ProfileCtrl'
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
