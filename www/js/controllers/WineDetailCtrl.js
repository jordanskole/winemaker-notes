// Login Controller before everything
app.controller('WineDetailCtrl', ['$scope', '$state', '$stateParams', 'Auth', 'Wines', function($scope, $state, $stateParams, Auth, Wines) {

  Wines.$object($state.params.id).$bindTo($scope, 'wine');

}]);
