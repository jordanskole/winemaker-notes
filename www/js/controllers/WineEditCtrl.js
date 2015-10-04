app.controller('WineEditCtrl', ['$scope', '$state', '$stateParams', '$ionicPopup', 'Auth', 'Kits', 'Products', 'Wine', function($scope, $state, $stateParams, $ionicPopup, Auth, Kits, Products, Wine) {

  $scope.filter = {
    "products": Products,
    "kits": false
  };

  Wine.$bindTo($scope, 'wine').then(function () {
    $scope.filter.kits = Kits.$array.filterByProduct($scope.wine.kit.product);
  });

  $scope.updateNames = function () {
    if ($scope.wine.kit.product) {
      $scope.filter.kits = Kits.$array.filterByProduct($scope.wine.kit.product);
    }
  };

  // delete wine function
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
