angular.module('myApp', [
  'myApp.services',
  'myApp.controllers',
  'angularUtils.directives.dirPagination',
  'ngRoute'
])

.constant('config', {
    deleteFolderMethod: 'deleteFolder?fileName=',
    createFolderMethod: 'createFolder?folderName=',
    uploadObjectMethod: 'uploadObject/',
    downloadObjectMethod: 'downloadObject/'
})

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/results", {templateUrl: "partials/results.html", controller: "fileSystemController"}).
	when("/results/:id", {templateUrl: "partials/result.html", controller: "fileSystemController"}).
	otherwise({redirectTo: '/results'});
}]);
