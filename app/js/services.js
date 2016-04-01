angular.module('myApp.services', [])
  .factory('mocksAPIservice', function($http) {

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
        method: "GET",
        //url: "http://localhost:8080/getFolder?path=" + path,
        url: "mocks/nivel3.json",
        headers: testHeaders
      });
    }

    mocksAPI.deleteFolder = function(name) {
      return $http({
        method: 'GET',
        url: config.url + config.deleteFolderMethod + name
      });
    }

    return mocksAPI;
  });
