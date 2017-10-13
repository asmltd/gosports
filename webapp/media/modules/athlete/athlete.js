/**
 * Created by hariharaselvam on 10/9/17.
 */
window[appName].controller('athlete', function ($rootScope, $scope, $state, $http, $interval,$stateParams, fileUpload, http) {

    $scope.id = $stateParams.id;
    function processTheData(method, action, url, parameter) {

        http.Requests(method, url, parameter).success(function (response) {


            switch (action) {

                case 'athlete':
                    $scope.athlete = response;
                    console.log($scope.athlete);
                    break;

                case 'save':
                    processTheData("get", "athlete", "/api/athlete/"+$scope.id+"/", {});
                    break;


            }
        });
    }
    processTheData("get", "athlete", "/api/athlete/"+$scope.id+"/", {});
    $scope.disable_edit = true;
    $scope.enable_edit = function(){
        $scope.disable_edit = false;
    };
    $scope.save_changes = function(){
        processTheData("patch", "save", "/api/athlete/"+$scope.id+"/edit", $scope.athlete);
        $scope.disable_edit = true;
    };


});
