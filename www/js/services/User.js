app.factory('User', ['$firebaseAuth', '$firebaseObject', function($firebaseAuth, $firebaseObject) {
  var usersRef = new Firebase("https//winemaker-notes.firebaseio.com/users");
  return $firebaseObject(userRef);
}]);
