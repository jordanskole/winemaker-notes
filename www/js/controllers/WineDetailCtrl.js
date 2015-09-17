// Login Controller before everything
app.controller('WineDetailCtrl', ['$scope', '$state', '$stateParams', '$ionicPopup', 'Auth', 'Wines', 'Kits', function($scope, $state, $stateParams, $ionicPopup, Auth, Wines, Kits) {

  $scope.filter = {
    "products": this.products,
    "kits": false
  }
  var Wine = Wines.$object($state.params.id);


  Wine
    .$bindTo($scope, 'wine')
    .then(function () {

      // $scope.filter.products
      Kits.$array
        .getProductsByBrand($scope.wine.kit.brand)
        .then(function (products) {
          $scope.filter.products =  products;
          Kits.$array.filterByProduct($scope.wine.kit.product).$loaded().then( function (data) {
            $scope.filter.kits = data;
          });
        }, function (err) {
          console.warn(err);
        });

    });

  Wine
    .$watch(function () {

      // check if the wine is still a draft
      // if ($scope.wine.name && $scope.wine.kit.brand && $scope.wine.kit.product && $scope.wine.varietal) {
      //   $scope.wine.stage = 'ready';
      // } else {
      //   $scope.wine.stage = 'draft';
      // }

    });

  $scope.updateNames = function () {
    if ($scope.wine.kit.product) {
      $scope.filter.kits = Kits.$array.filterByProduct($scope.wine.kit.product);
    }
  }

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
