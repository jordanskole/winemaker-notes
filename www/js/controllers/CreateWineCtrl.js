// Login Controller before everything
app.controller('CreateWineCtrl', ['$scope', '$state', '$stateParams', 'Auth', 'Wines', function($scope, $state, $stateParams, Auth, Wines) {

  console.log($state.params);
  $scope.wine = $state.params;

}]);
