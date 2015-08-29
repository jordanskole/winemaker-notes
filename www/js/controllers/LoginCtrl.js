// Login Controller before everything
app.controller('LoginCtrl', ['$scope', '$state', '$timeout', 'Auth', function($scope, $state, $timeout, Auth) {

  // remove the error if the user makes changes to the user model
  $scope.error = null;

  // check if there is a problem with the username
  $scope.$watch('user.email', function (newValue, oldValue) {
    if ($scope.error && $scope.error.code === 'INVALID_USER') {
      $scope.error = null;
    }
  });


  // check if there is a problem with the password
  $scope.$watch('user.password', function (newValue, oldValue) {
    if ($scope.error && $scope.error.code === 'INVALID_PASSWORD') {
      $scope.error = null;
    }
  });

  $scope.user = {};

  // login the old fashioned way with a email/pw
  $scope.simpleLogin = function () {
    Auth.$authWithPassword($scope.user).then(function(authData) {
      // what a success!
      console.log("Logged in as:", authData.uid);
      $state.go('wines');
    }).catch(function(error) {
      $scope.error = error;
      console.log(error.code);
    });
  };

}]);
