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

      // check if the wine is still a draft
      if ($scope.wine.name && $scope.wine.kit.brand && $scope.wine.kit.product && $scope.wine.varietal) {
        $scope.wine.stage = 'ready';
      } else {
        $scope.wine.stage = 'draft';
      }

    });

}]);
