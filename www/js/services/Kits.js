app.factory("Kits", ['$firebaseArray', '$firebaseObject', 'Auth', function($firebaseArray, $firebaseObject, Auth) {
  var itemsRef = new Firebase("https://winemaker-notes.firebaseio.com/kits");

  // build our wines $firebaseArray
  // but let's extend it so that we can do special things
  var Kits = $firebaseArray.$extend({
    filterByBrand: function (brand) {
      var query = itemsRef.orderByChild('brand').equalTo(brand);
      return $firebaseArray(query);
    },
    filterByVarietal: function (varietal) {
      var query = itemsRef.orderByChild('varietal').equalTo(varietal);
      return $firebaseArray(query);
    },
    filterByProduct: function (product) {
      var query = itemsRef.orderByChild('product').equalTo(product);
      return $firebaseArray(query);
    }
  });

  return {
    "$array": Kits(itemsRef),
    "$object": function (objectId) {
      return $firebaseObject(itemsRef.child(objectId));
    }
  };
}]);
