app.factory('Auth', function($firebaseAuth) {
  var usersRef = new Firebase("https//winemaker-notes.firebaseio.com/users");
  return $firebaseAuth(usersRef);
});
