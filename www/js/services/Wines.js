app.factory("Wines", ['$firebaseArray', '$firebaseObject', 'Auth', function($firebaseArray, $firebaseObject, Auth) {
  var itemsRef = new Firebase("https://winemaker-notes.firebaseio.com/wines");

  // build our wines $firebaseArray
  // but let's extend it so that we can do special things
  var Wines = $firebaseArray.$extend({
    getMyWines: function () {
      var query = itemsRef.orderByChild('uid').equalTo(Auth.$getAuth().uid);
      return $firebaseArray(query);
    }
  });

  return {
    "$array": Wines(itemsRef),
    "$object": function (objectId) {
      return $firebaseObject(itemsRef.child(objectId));
    }
  };
}]);
