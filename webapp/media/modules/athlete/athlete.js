/**
 * Created by hariharaselvam on 10/9/17.
 */
window[appName].controller('athlete', function ($rootScope, $scope, $state, $http, $interval, $stateParams, fileUpload, http) {

    $scope.id = $stateParams.id;
    $scope.active_tab = "achievement";
    function processTheData(method, action, url, parameter) {

        http.Requests(method, url, parameter).success(function (response) {


            switch (action) {

                case 'athlete':
                    $scope.athlete = response;
                    console.log($scope.athlete);
                    break;

                case 'save':
                    processTheData("get", "athlete", "/api/athlete/" + $scope.id + "/", {});
                    break;


            }
        });
    }

    processTheData("get", "athlete", "/api/athlete/" + $scope.id + "/", {});
    $scope.disable_edit = true;
    $scope.enable_edit = function () {
        $scope.disable_edit = false;
    };
    $scope.save_changes = function () {
        //var file = $scope.myFile;
        //fileUpload.uploadFileToUrl(file,$scope.athlete,"/api/athlete/"+$scope.id+"/edit");
        delete $scope.athlete.image;
        processTheData("patch", "save", "/api/athlete/" + $scope.id + "/edit", $scope.athlete);
        $scope.disable_edit = true;
    };

    $scope.achievement_table = {
        "api": "/api/athlete/achievements/"+$scope.id+"/",
        "type": "achievements",

        "title": "",
        "auto_reload": true,
    };
    $scope.interactions_table = {
        "api": "/api/athlete/achievements/"+$scope.id+"/",
        "type": "interactions",

        "title": "",
        "auto_reload": true,
    };
    $scope.finance_table = {
        "api": "/api/athlete/achievements/"+$scope.id+"/",
        "type": "finance",

        "title": "",
        "auto_reload": true,
    };
    $scope.change_tab = function (tab) {
        $scope.active_tab = tab;
        console.log(tab);
    };
    $scope.get_active = function (tab) {
        if ($scope.active_tab == tab) {
            return "active"
        }
        return "";
    };


});
