angular.module('myApp.services', [])
    .factory('mocksAPIservice', function($http) {
        'use strict';

        var mocksAPI = {},
            serverPath = 'http://localhost:8080/',
            testHeaders = {
                "Access-Control-Allow-Origin": "http://localhost:8000",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
                "Access-Control-Allow-Headers": "X-Requested-With,content-type",
                "Access-Control-Allow-Credentials": true
            };

        mocksAPI.getList = function(path) {
            return $http({
                "method": "GET",
                //url: "http://localhost:8080/getFolder?path=" + path,
                "url": "mocks/nivel2.json",
                "headers": testHeaders
            });
        };

        mocksAPI.getContentFile = function(path) {
            return $http({
                "method": "GET",
                //url: "http://localhost:8080/getFolder?path=" + path,
                "url": "mocks/content.json",
                "headers": testHeaders
            });
        };

        mocksAPI.downloadMock = function(path) {
            return $http({
                "method": "POST",
                //url: "http://localhost:8080/downloadObject/",
                "url": "mocks/nivel2.json",
                "headers": testHeaders,
                "data": {
                    "fileName": path
                }
            });
        };

        mocksAPI.deleteFolder = function(name) {
            return $http({
                "method": "GET",
                //url: "http://localhost:8080/deleteFolder?fileName=" + path,
                "url": "mocks/nivel2.json",
                "headers": testHeaders
            });
        };

        mocksAPI.deleteFile = function(name) {
            return $http({
                "method": "GET",
                //url: "http://localhost:8080/deleteFolder?fileName=" + path,
                "url": "mocks/nivel2.json",
                "headers": testHeaders
            });
        };

        return mocksAPI;
    });
