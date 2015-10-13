app.factory("Tastings", ['$firebaseArray', '$firebaseObject', 'Auth', function($firebaseArray, $firebaseObject, Auth) {
  var itemsRef = new Firebase("https://winemaker-notes.firebaseio.com/tastings");

  // build our wines $firebaseArray
  // but let's extend it so that we can do special things
  var Tastings = $firebaseArray.$extend({
    getTastingsByWine: function (wine_id) {
      var query = itemsRef.orderByChild('wine_id').equalTo(wine_id);
      return $firebaseArray(query);
    }
  });

  return {
    "$array": Tastings(itemsRef),
    "$object": function (objectId) {
      return $firebaseObject(itemsRef.child(objectId));
    }
  };
}]);
