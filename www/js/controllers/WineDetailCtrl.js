// Login Controller before everything
app.controller('WineDetailCtrl', ['$scope', '$state', '$stateParams', '$ionicPopup', 'Auth', 'Wines', 'Kits', 'Notes',  function($scope, $state, $stateParams, $ionicPopup, Auth, Wines, Kits, Notes) {

  // TODO: this should be a resolve
  var Wine = Wines.$object($state.params.id);

  Wine
    .$bindTo($scope, 'wine')
    .then(function () {
      // do something
    });

  $scope.notes = Notes.$array.getNotesByWine(Wine.$id);

  Wine
    .$watch(function () {

      // check if the wine is still a draft
      // if ($scope.wine.name && $scope.wine.kit.brand && $scope.wine.kit.product && $scope.wine.varietal) {
      //   $scope.wine.stage = 'ready';
      // } else {
      //   $scope.wine.stage = 'draft';
      // }

    });

}]);
