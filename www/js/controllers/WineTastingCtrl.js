app.controller('WineTastingCtrl', ['$scope', '$state', '$stateParams', 'Auth', 'Wine', 'Tastings', function($scope, $state, $stateParams, Auth, Wine, Tastings) {

  Wine.$bindTo($scope, 'wine');

  $scope.tasting = {
    "score": null
  };

  $scope.tastingScore = function (score) {
    console.log('Tasting Score: ' + score);
    $scope.tasting.score = score;
  }

  $scope.createTasting = function() {

    Tastings.$array.$add({
        "uid": Auth.$getAuth().uid,
        "wine_id": Wine.$id,
        "created_on": moment().format(),
        "edited_on": moment().format(),
        "message": $scope.tasting.message,
        "score": $scope.tasting.score
    }).then( function (ref) {
      $scope.tasting = {
        "score": null
      };
      $state.go('wines.detail', {'id': Wine.$id });
    });
  };

}]);
