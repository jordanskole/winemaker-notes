app.factory("Wines", ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject) {
  var itemsRef = new Firebase("https://winemaker-notes.firebaseio.com/wines");
  var Wines = $firebaseArray(itemsRef);

  return {
    "$array": Wines,
    "$object": function (objectId) {
      return $firebaseObject(itemsRef.child(objectId));
    }
  };
}]);
