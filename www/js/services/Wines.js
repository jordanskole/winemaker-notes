app.factory("Wines", ['$firebaseArray', function($firebaseArray) {
  var itemsRef = new Firebase("https://winemaker-notes.firebaseio.com/wines");
  return $firebaseArray(itemsRef);
}]);
