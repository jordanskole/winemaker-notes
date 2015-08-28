// Login Controller before everything
app.controller('RegisterCtrl', ['$scope', '$state', function($scope, $state) {

  // create our empty scope user
  $scope.user = {};

  // login the old fashioned way with a email/pw
  $scope.register = function () {
    fb.createUser($scope.user, function (error, userData) {
      if (error) {
        // do something about the error
        console.log("Error creating user:", error);
      } else {
        // we have successfully created a user. Now, log them in and redirect them home to the wines page.
        // TODO: This should probably be in a then statement and not nested

        fb.authWithPassword($scope.user, function (error, authData) {

          if (error) {
            console.log('Error logging in user: ', error);
          } else {

            // successfully logged the user in.
            console.log("Authenticated successfully with payload:", authData);
          }
        });

      }
    });

  };

}]);
