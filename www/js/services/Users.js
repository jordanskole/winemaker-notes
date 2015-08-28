app.factory('Users', function($firebaseAuth, $firebaseObject) {
  var usersRef = new Firebase("https//winemaker-notes.firebaseio.com/users");
  return $firebaseObject(usersRef);
});
