angular.module("familyst").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: "client/users/views/login_form.ng.html",
        controller: 'LoginCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: "client/users/views/register_form.ng.html",
        controller: 'RegisterCtrl'
      })
      .state('home', {
        url: '/home',
        abstract: true,
        templateUrl: "client/users/views/home.ng.html"
      })
      .state('home.profile', {
        url: '/profile',
        views: {
          'profile-tab': {
            templateUrl: "client/users/views/profile.ng.html",
            controller: 'ProfileCtrl'
          }
        }
      })
      .state('home.lists', {
        url: '/lists',
        views: {
          'home-tab': {
            templateUrl: 'client/lists/views/lists_list.ng.html',
            controller: 'ListsListCtrl'
          }
      }
      })
      .state('home.lists.newList', {
        url: '/newList',
        abstract: true,
        templateUrl: 'client/lists/views/list_forms/list_form_base.ng.html',
      })
      // .state('home.lists.newList.name', {
      .state('home.newListName', {
        url: '/newListName',
        views: {
          'home-tab': {
            templateUrl: 'client/lists/views/list_forms/list_form_name.ng.html',
            controller: 'ListFormNameCtrl'
          }
        }
      })
      // .state('home.lists.newList.users', {
      .state('home.newListUsers', {
        params: { listName: "" },
        url: '/newListUsers',
        views: {
          'home-tab': {
            templateUrl: 'client/lists/views/list_forms/list_form_users.ng.html',
            controller: 'ListFormUsersCtrl'
          }
        }
      })
      .state('home.list', {
        url: '/lists/:listId',
        views: {
          'home-tab': {
            templateUrl: 'client/items/views/items_list.ng.html',
            controller: 'ItemsListCtrl'
          }
        }
      })
      .state('home.list.details', {
        url: '/details',
        views: {
          'home-tab': {
            templateUrl: 'client/items/views/items_list.ng.html',
            controller: 'ItemsListCtrl'
          }
        }
      })
      // .state('home.list.chat', {
      .state('home.listChat', {
        url: '/:listId/chat',
        views: {
          'home-tab': {
            templateUrl: 'client/lists/views/list_chat.ng.html',
            controller: 'ListChatCtrl'
          }
        }
      });

      $urlRouterProvider.otherwise("/login");
}]);
