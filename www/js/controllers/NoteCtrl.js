// Login Controller before everything
app.controller('NoteCtrl', ['$scope', '$state', '$stateParams', 'Auth', 'Note',  function($scope, $state, $stateParams, Auth, Note) {

  Note
    .$bindTo($scope, 'note')
    .then(function () {
      // do something
      console.log($scope.note);
    });

}]);
