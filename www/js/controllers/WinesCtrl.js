// Login Controller before everything
app.controller('WinesCtrl', ['$scope', '$state', '$ionicPopover', 'Auth', function($scope, $state, $ionicPopover, Auth) {

  // get a list of the users wines
  $scope.wines = [];
  $scope.newWine = {};

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('templates/wines.create.popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.active = 'kit';
  $scope.setActive = function (type) {
    console.log($scope.newWine.title);
    $scope.active = type;
  };
  $scope.isActive = function (type) {
    return type === $scope.active;
  };

  $scope.openPopover = function ($event) {
    $scope.popover.show($event);
  };

  $scope.closePopover = function () {
    $scope.popover.hide();
  };

  $scope.createWine = function () {

    console.log($scope.newWine.title);
    console.log($scope.active);

    $scope.popover.hide();

    $state.go('wines.create', {
      "name": $scope.newWine.title,
      "type": $scope.active
    });
  };

}]);
