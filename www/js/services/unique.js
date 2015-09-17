app.filter('unique', function() {
    return function (array, field) {
        return _.uniq(array, function(a) { return a[field]; });
    };
});
