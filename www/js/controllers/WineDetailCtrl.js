// Login Controller before everything
app.controller('WineDetailCtrl', ['$scope', '$state', '$stateParams', 'Auth', 'Wines', function($scope, $state, $stateParams, Auth, Wines) {

  var Wine = Wines.$object($state.params.id);

  Wine
    .$bindTo($scope, 'wine')
    .then(function () {
      $scope.saved = true;
    });

  Wine
    .$watch(function () {
      $scope.saved = true;
    });

  $scope.inputChange = function () {

    // set our local changes to saving
    $scope.saved = false;

    if ($scope.wine.name && $scope.wine.kit.brand && $scope.wine.kit.product && $scope.wine.varietal && $scope.wine.stage === 'draft') {
      $scope.wine.stage = 'ready';
    } else {
      $scope.wine.stage = 'draft';
    }
  };


}]);
