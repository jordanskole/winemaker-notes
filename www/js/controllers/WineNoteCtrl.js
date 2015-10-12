app.controller('WineNoteCtrl', ['$scope', '$state', '$stateParams', 'Auth', 'Wine', 'Notes', function($scope, $state, $stateParams, Auth, Wine, Notes) {

  Wine.$bindTo($scope, 'wine');
  $scope.note = {
    "event": false,
    "measurements": false,
    "specific_gravity": null,
    "color": null
  };

  $scope.createNote = function() {
    console.log('Note:');
    console.log($scope.note);

    Notes.$array.$add({
        "uid": Auth.$getAuth().uid,
        "wine_id": Wine.$id,
        "created_on": moment().format(),
        "edited_on": moment().format(),
        "message": $scope.note.message,
        "event": $scope.note.event,
        "measurements": $scope.note.measurements,
        "specific_gravity": $scope.note.specific_gravity,
        "color": $scope.note.color
    }).then( function (ref) {
      $scope.note = {
        "event": false,
        "measurements": false,
        "specific_gravity": null,
        "color": null
      };
      $state.go('wines.detail', {'id': Wine.$id });
    });
  };

}]);
