// Login Controller before everything
app.controller('WineDetailCtrl', ['$scope', '$state', '$stateParams', '$ionicPopup', 'Auth', 'Wines', 'Kits', function($scope, $state, $stateParams, $ionicPopup, Auth, Wines, Kits) {

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

  $scope.filters = {
    "brand": "Wine Expert"
  };
  
  $scope.kits = Kits.$array.filterByBrand($scope.filters.brand);
  console.log($scope.kits);


  $scope.deleteWine = function (id) {

    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete Wine',
      template: 'Are you sure you want to delete this wine?',
      okType: 'button-assertive',
      okText: 'Delete'
    });

    confirmPopup.then(function(res) {

      if(res) {

        Wines.$array
          .$remove(Wines.$array.$getRecord(id))
          .then( function (ref) {
            // wine deleted
            $state.go('wines.index');
          }, function (err) {
            // some error happened
            console.warn(err);
          });

      } else {

        // the user canceled delete
        // console.log('You are not sure about ' + id);

      }

    });
  };

}]);
