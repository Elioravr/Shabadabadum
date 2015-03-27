// angular.module("familyst").run(["$rootScope", "$state", function($rootScope, $state) {
//   $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
//     // We can catch the error thrown when the $requireUser promise is rejected
//     // and redirect the user back to the main page
//     if (error === "AUTH_REQUIRED") {
//       $state.go("login");
//     }
//   });
// }]);

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
        // resolve: {
        //   "currentUser": ["$meteor", function($meteor){
        //     return $meteor.requireUser();
        //   }]
        // }
      })
      .state('list', {
        url: '/lists/:listId',
        views: {
          'home-tab': {
            templateUrl: 'client/items/views/items_list.ng.html',
            controller: 'ItemsListCtrl'
          }
        }
        // resolve: {
        //   "currentUser": ["$meteor", function($meteor){
        //     return $meteor.requireUser();
        //   }]
        // }
      });

      $urlRouterProvider.otherwise("/login");
}]);
