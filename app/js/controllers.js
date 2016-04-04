angular.module('myApp.controllers', ['flow']).

  /* mocks controller */

    controller('fileSystemController', function($scope, mocksAPIservice, $uibModal) {
        "use strict";

        var breads = [],
            fileList = [];

        $scope.currentFilesList = [];
        $scope.breadList = [];

        mocksAPIservice.getList('/').success(function (response) {
            // create breadcrumb
            if (response.files[0].parent !== null) {
                breads = response.files[0].parent.split('/');
                breads.unshift('root');
                breads.pop();
                $scope.breadList = breads;
            } else {
                $scope.breadList.push('root');
            }

            // create lsit data
            angular.forEach(response.files, function(value, key) {
                var path = value.path,
                    name,
                    type;

                if (value.parent !== null) {
                    name = path.replace(value.parent, '');
                } else {
                    name = path;
                }

                if (value.isFile === false) {
                    type = 'folder';
                    name = path.replace(/\//g, '');
                } else if (value.isFile === true) {
                    type = 'mock';
                }

                fileList.push({
                    "path": name,
                    "date1": "123",
                    "date2": "34672381205",
                    "type": type
                });
            });

            // sort lists
            $scope.currentFilesList = fileList;
            console.log(fileList);

            $scope.sort = function(keyname) {
                $scope.sortKey = keyname;
                $scope.reverse = !$scope.reverse;
            };

            $scope.openModal = function () {

                var modalInstance = $uibModal.open({
                    "animation": true,
                    "templateUrl": "resultContent.html",
                    "controller": "FileController",
                    "size": "lg"
                });
            };
        });
    }).
    controller('UploadController', function ($scope) {
        "use strict";
        $scope.button = false;

        $scope.$on('flow::fileAdded', function (event, $flow, flowFile) {
            $scope.button = true;
        });

        $scope.cancelUpload = function(keyname) {
            $scope.button = false;
        };
    }).
    controller('FileController', function ($scope, $uibModalInstance) {
        "use strict";

        $scope.complex = {
            "numbers": [1, 2, 3],
            "boolean": true,
            "null": null,
            "number": 123,
            "anObject": {
                "a": 'b',
                "c": 'd',
                "e": 'f\"'
            },
            "string": 'Hello World',
            "url": 'https://github.com/',
            "date": 'Sun Aug 03 2014 20:46:55 GMT-0700 (PDT)'
        };
        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
