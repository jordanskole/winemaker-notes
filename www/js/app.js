// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('wineApp', ['ionic', 'firebase', 'ngCordova']);
var fb = new Firebase("https://winemaker-notes.firebaseio.com");

app.config(function($httpProvider, $stateProvider, $urlRouterProvider) {

  $httpProvider.defaults.useXDomain = true;
  // don't put controllers here, load them via the templates
  // this has to do with the way scope works in angular it needs to be applied to the ion-content directive
  // this will attach scope to the ion-view
  $stateProvider

    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html"
    })
    .state('logout', {
      url: "/logout",
      controller: "LogoutCtrl"
    })
    .state('register', {
      url: "/register",
      templateUrl: "templates/register.html"
    })
    .state('account', {
      url: "/account",
      templateUrl: "templates/account.html",
      resolve: {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth", function(Auth) {
          // $requireAuth returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Auth.$requireAuth();
        }]
      }
    })
    /*
     * Our Wine Views
     */
    .state('wines', {
      abstract: true,
      url: "/wines",
      template: "<ion-nav-view/>",
      resolve: {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        currentAuth: function (Auth) {
          // $requireAuth returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Auth.$requireAuth();
        }
      }
    })
    .state('wines.index', {
      url: "/index",
      templateUrl: "templates/wines.index.html"
    })
    .state('wines.detail', {
      url: "/:id",
      templateUrl: "templates/wines.detail.html"
    })
    .state('wines.note', {
      url: "/:id/note",
      templateUrl: "templates/wines.note.html",
      resolve: {
        // controller will not be loaded until these promises resolve
        // Wines refers to our Wines service
        Wine: function ($stateParams, Wines) {
          return Wines.$object($stateParams.id).$loaded();
        }
      },
      controller: "WineNoteCtrl"
    })
    .state('wines.edit', {
      url: "/:id/edit",
      templateUrl: "templates/wines.edit.html",
      resolve: {
        // controller will not be loaded until these promises resolve
        // Wines refers to our Wines service
        Wine: function ($stateParams, Wines) {
          return Wines.$object($stateParams.id).$loaded();
        },
        // Kits refers to our Kits service
        Products: function (Kits) {
          // $requireAuth returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Kits.$array.getProductsByBrand('Wine Expert');
        }
      },
      controller: "WineEditCtrl"
    });

  // if we aren't at a known route
  $urlRouterProvider.otherwise("/wines/index");

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

// for states that require authentication send them to login
app.run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // throw the error
    console.warn(error);
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $state.go("login");
    }
  });
}]);
