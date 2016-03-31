angular.module('myApp.controllers', ['flow']).

  /* mocks controller */

    controller('fileSystemController', function($scope, mocksAPIservice) {
        var breads = [],
            fileList = [];

        $scope.currentFilesList = [];
        $scope.breadList = [];

        mocksAPIservice.getList('/').success(function (response) {
            // create breadcrumb
            if (response.files[0].parent !== null) {
                breads = response.files[0].parent.split('/')
                breads.unshift('root');
                breads.pop();
                $scope.breadList = breads;
            } else {
                $scope.breadList.push('root');
            }

            // create data
            fileList = response.files;

            angular.forEach(fileList, function(value, key) {
                if (value.isFile === false) {

                } else if (value.isFile === true) {

                }
            });

            // sort lists
            $scope.currentFilesList = fileList;
            console.log(response.files);
            console.log(breads);

            $scope.sort = function(keyname){
                $scope.sortKey = keyname;
                $scope.reverse = !$scope.reverse;
            }
        });
    }).

    controller('UploadController', function ($scope) {
        $scope.button = false;

        $scope.$on('flow::fileAdded', function (event, $flow, flowFile) {
            $scope.button = true;
        });

        $scope.cancelUpload = function(keyname){
            $scope.button = false;
        }
    });

