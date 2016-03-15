angular.module('myApp', [
  'myApp.services',
  'myApp.controllers',
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/results", {templateUrl: "partials/results.html", controller: "fileSystemController"}).
	when("/results/:id", {templateUrl: "partials/result.html", controller: "fileSystemController"}).
	otherwise({redirectTo: '/results'});
}]);
