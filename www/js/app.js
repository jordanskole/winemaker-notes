// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('wineApp', ['ionic', 'firebase']);

app.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
  $httpProvider.defaults.useXDomain = true;
  // don't put controllers here, load them via the templates
  // this has to do with the way scope works in angular it needs to be applied to the ion-content directive
  // this will attach scope to the ion-view
  $stateProvider
    .state('login', {
      url: "/",
      templateUrl: "templates/login.html"
    });

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
