// Login Controller before everything
app.controller('WinesCtrl', ['$scope', '$state', '$ionicPopover', 'Auth', function($scope, $state, $ionicPopover, Auth) {

  // get a list of the users wines
  $scope.wines = [];

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('templates/wines.create.popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.active = 'kit';
  $scope.setActive = function(type) {
      $scope.active = type;
  };
  $scope.isActive = function(type) {
      return type === $scope.active;
  };

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };

  $scope.closePopover = function() {
    $scope.popover.hide();
  };

}]);
