app.controller('WineNoteCtrl', ['$scope', '$state', '$stateParams', 'Auth', 'Wine', function($scope, $state, $stateParams, Auth, Wine) {

  Wine.$bindTo($scope, 'wine');

}]);
