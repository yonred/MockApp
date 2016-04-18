angular.module('myApp.controllers', ['flow']).

  /* mocks controller */

    controller('fileSystemController', function($scope, $rootScope, mocksAPIservice, $uibModal) {
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

            $scope.sort = function(keyname) {
                $scope.sortKey = keyname;
                $scope.reverse = !$scope.reverse;
            };

            $scope.openModal = function (path) {
                $scope.path = path;

                var modalInstance = $uibModal.open({
                    "animation": true,
                    "templateUrl": "resultContent.html",
                    "controller": "FileController",
                    "size": "lg",
                    "resolve": {
                        "path": function () {
                            return path;
                        }
                    }
                });
            };

            $scope.deleteObject = function (path, type) {
                var fileType = type;

                swal({
                    "title": "Are you sure?",
                    "text": "You will not be able to recover this " + fileType + "!",
                    "type": "warning",
                    "showCancelButton": true,
                    "confirmButtonColor": "#DD6B55",
                    "confirmButtonText": "Yes, delete it!",
                    "cancelButtonText": "No, cancel!",
                    "closeOnConfirm": false,
                    "closeOnCancel": false },

                    function(isConfirm) {
                        if (isConfirm) {
                            swal("Deleted!", "Your " + fileType + " has been deleted.", "success");

                            if (type === 'mock') {
                                mocksAPIservice.deleteFile(path);
                            } else {
                                mocksAPIservice.deleteFolder(path);
                            }
                        } else {
                            swal("Cancelled", "Your " + fileType + " is safe :)", "error");
                        }
                    }
                );
            };

            $rootScope.$on("CallDownloadMethod", function(event, path) {
                $scope.downloadFile(path);
            });


            $scope.downloadFile = function (path) {
                mocksAPIservice.downloadMock(path).success(function (response) {
                    swal("Downloaded!", "Your mock has been downloaded.", "success");
                });
            };

            $scope.createFolder = function () {
                swal({
                    "title": "Add folder!",
                    "text": "Type your new folder's name:",
                    "type": "input",
                    "showCancelButton": true,
                    "closeOnConfirm": false,
                    "animation": "slide-from-top",
                    "inputPlaceholder": "Folder_Name" },

                    function(inputValue) {
                        if (inputValue === false) return false;

                        if (inputValue === "") {
                            swal.showInputError("You need to type something!");
                            return false;
                        } else {
                            var result = inputValue.split(" ").join("_");

                            mocksAPIservice.createFolder(result).success(function (response) {
                                swal("Nice!", "You new folder: " + result + " was created", "success");
                            });
                        }
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
    controller('FileController', function ($scope, $rootScope, $uibModalInstance, mocksAPIservice, path) {
        "use strict";


        $scope.downloadFile = function(path) {
            $rootScope.$broadcast("CallDownloadMethod", path);
        };

        mocksAPIservice.getContentFile('/').success(function (response) {
            $scope.path = path;
            $scope.complex = response;
        });

        $scope.ok = function () {
            $uibModalInstance.close();
        };

    });
