// Login Controller before everything
app.controller('LoginCtrl', ['$scope', '$state', '$firebaseAuth', '$cordovaOauth', 'Auth', function($scope, $state, $firebaseAuth, $cordovaOauth, Auth) {

  // login the old fashioned way with a email/pw
  $scope.simpleLogin = function (user) {

  };

  // login with facebook
  // we'll ignore this for now, but this is ready to be used in the future
  $scope.facebookLogin = function() {
      $cordovaOauth.facebook("881440081934880", ["email"]).then(function(result) {
          Auth.$authWithOAuthToken("facebook", result.access_token).then(function(authData) {
              console.log(JSON.stringify(authData));
          }, function(error) {
              console.error("ERROR: " + error);
          });
      }, function(error) {
          console.log("ERROR: " + error);
      });
  };


}]);
