app.controller('LogoutCtrl', ['$scope', '$state', 'Auth', function($scope, $state, Auth) {
  Auth.$unauth();
  console.log('Logged out');
  $state.go('login');
}]);
