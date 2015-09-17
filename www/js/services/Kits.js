app.factory("Kits", ['$q', '$firebaseArray', '$firebaseObject', 'Auth', function($q, $firebaseArray, $firebaseObject, Auth) {
  var itemsRef = new Firebase("https://winemaker-notes.firebaseio.com/kits");

  // build our wines $firebaseArray
  // but let's extend it so that we can do special things
  var Kits = $firebaseArray.$extend({

    // @param: String brand
    filterByBrand: function (brand) {
      var query = itemsRef.orderByChild('brand').equalTo(brand);
      return $firebaseArray(query);
    },
    getProductsByBrand: function (brand) {

      // return a promise
      return $q(function (resolve, reject) {
        var query = itemsRef.orderByChild('brand').equalTo(brand);
        var kits = $firebaseArray(query);

        // with a list of unique products given a filter by brand
        // once the data has loaded
        kits.$loaded()
          .then(function (data) {
            var products = _.chain(data).map('product').uniq().value();
            resolve(products);
          }, function (err) {
            reject(err);
          });
      });
    },
    getVarietalsByBrand: function (brand) {

      // return a promise
      return $q(function (resolve, reject) {
        var query = itemsRef.orderByChild('brand').equalTo(brand);
        var kits = $firebaseArray(query);

        // with a list of unique varietals given a filter by brand
        // once the kits have loaded
        kits.$loaded()
          .then(function (data) {
            var varietals = _.chain(data).map('varietal').uniq().value();
            resolve(varietals);
          }, function (err) {
            reject(err);
          });

      });
    },

    // @param: String varietal
    filterByVarietal: function (varietal) {
      var query = itemsRef.orderByChild('varietal').equalTo(varietal);
      return $firebaseArray(query);
    },
    getBrandsByVarietal: function (varietal) {

      // return a promise
      return $q(function (resolve, reject) {
        var query = itemsRef.orderByChild('varietal').equalTo(varietal);
        var kits = $firebaseArray(query);

        // with a list of unique brands given a filter by varietal
        // once the kits have loaded
        kits.$loaded()
          .then(function (data) {
            var brands = _.chain(data).map('brand').uniq().value();
            resolve(brands);
          }, function (err) {
            reject(err);
          });

      });
    },

    // @param: String product
    filterByProduct: function (product) {
      var query = itemsRef.orderByChild('product').equalTo(product);
      return $firebaseArray(query);      
    },
    getNamesByProduct: function (product) {
      // return a promise
      return $q(function (resolve, reject) {
        var query = itemsRef.orderByChild('product').equalTo(product);
        var kits = $firebaseArray(query);

        kits.$loaded()
          .then(function (data) {
            var names = _.chain(data).map('name').uniq().value();
            resolve(names);
          }, function (err) {
            reject(err);
          });
      });
    }
  });

  return {
    "$array": Kits(itemsRef),
    "$object": function (objectId) {
      return $firebaseObject(itemsRef.child(objectId));
    }
  };
}]);
