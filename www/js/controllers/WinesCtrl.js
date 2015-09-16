// Login Controller before everything
app.controller('WinesCtrl', ['$scope', '$state', '$ionicPopover', '$ionicPopup', 'Auth', 'Wines', function($scope, $state, $ionicPopover, $ionicPopup, Auth, Wines) {

  // get a list of the users wines
  $scope.wines = Wines.$array.getMyWines();
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

    // add the new wine to firebase
    Wines.$array.$add({
      "uid": Auth.$getAuth().uid,
      "name": $scope.newWine.title,
      "type": $scope.active,
      "created_on": moment().format(),
      "stage": "draft"
    })
    .then(function (ref) {
      // return our object to normal
      $scope.newWine.title = null;

      var id = ref.key();
      // list.$indexFor(id); // returns location in the array

      // hide the popover
      $scope.popover.hide();

      // and take us to the create wine view with our new wine
      $state.go('wines.edit', {"id": id});
    });

  };

  $scope.deleteWineAlert = function (id) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete Wine',
      template: 'Are you sure you want to delete this wine?'
    });
   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure about ' + id);
     } else {
       console.log('You are not sure about ' + id);
     }
   });
  }

}]);
