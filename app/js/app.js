var app = angular.module('myApp', [
    'myApp.services',
    'myApp.controllers',
    'angularUtils.directives.dirPagination',
    'ui.bootstrap',
    'ui.bootstrap.modal',
    'jsonFormatter',
    'ngRoute',
    'flow'
])
.constant('config', {
    "deleteFolderMethod": "deleteFolder?fileName=",
    "createFolderMethod": "createFolder?folderName=",
    "uploadObjectMethod": "uploadObject/",
    "downloadObjectMethod": "downloadObject/"
})
.config(['$routeProvider', 'flowFactoryProvider', function($routeProvider, flowFactoryProvider) {
    "use strict";

    $routeProvider.
    when("/results", {"templateUrl": "partials/results.html", "controller": "fileSystemController"}).
    when("/results/:id", {"templateUrl": "partials/result.html", "controller": "fileSystemController"}).
    otherwise({"redirectTo": "/results"});

    flowFactoryProvider.defaults = {
        "target": "http://localhost:8080/uploadObject",
        "permanentErrors": [404, 500, 501],
        "maxChunkRetries": 1,
        "chunkRetryInterval": 5000,
        "simultaneousUploads": 4
    };
}]);
