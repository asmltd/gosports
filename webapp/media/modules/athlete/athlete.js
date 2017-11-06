/**
 * Created by hariharaselvam on 10/9/17.
 */
window[appName].controller('athlete', function($rootScope, $scope, $state, $http, $interval, $stateParams, fileUpload, http) {

    $scope.id = $stateParams.id;
    $scope.active_tab = "achievement";

    function processTheData(method, action, url, parameter) {

        http.Requests(method, url, parameter).success(function(response) {

            console.log(action);
            switch (action) {

                case 'athlete':

                    $scope.athlete = response;
                    console.log($scope.athlete);
                    break;

                case 'save':
                    console.log(response);
                    processTheData("get", "athlete", "/api/athlete/" + $scope.id + "/", {});
                    break;

                case 'save_interaction':
                    $scope.interactions_table = {
                        "api": "/api/athlete/interactions/" + $scope.id + "/",
                        "type": "interactions",

                        "title": "",
                        "auto_reload": true,
                    };
                    break;
                case 'save_finance':
                    $scope.finance_table = {
                        "api": "/api/athlete/finance/" + $scope.id + "/",
                        "type": "finance",

                        "title": "",
                        "auto_reload": true,
                    };


            }
        });
    }

    processTheData("get", "athlete", "/api/athlete/" + $scope.id + "/", {});
    $scope.disable_edit = true;
    $scope.enable_edit = function() {
        $scope.disable_edit = false;
    };
    $scope.save_changes = function() {
        //var file = $scope.myFile;
        //fileUpload.uploadFileToUrl(file,$scope.athlete,"/api/athlete/"+$scope.id+"/edit");
        delete $scope.athlete.image;
        processTheData("patch", "save", "/api/athlete/" + $scope.id + "/edit", $scope.athlete);
        $scope.disable_edit = true;
    };
    $scope.save_changes1=function(){

    console.log('hii this is profile function');
    var file = $scope.myFile;
    console.dir(file);
        fileUpload.uploadFileToUrl(file,$scope.athlete,"/api/athlete/"+$scope.id+"/edit");

    //console.log(image);

    }

    $scope.achievement_table = {
        "api": "/api/athlete/achievements/" + $scope.id + "/",
        "type": "achievements",

        "title": "",
        "auto_reload": true,
    };

    $scope.interactions_table = {
        "api": "/api/athlete/interactions/" + $scope.id + "/",
        "type": "interactions",

        "title": "",
        "auto_reload": true,
    };
    $scope.finance_table = {
        "api": "/api/athlete/finance/" + $scope.id + "/",
        "type": "finance",

        "title": "",
        "auto_reload": true,
    };
     $scope.performance_table = {
        "api": "/api/athlete/performance/" + $scope.id + "/",
        "type": "performance",

        "title": "",
        "auto_reload": true,
    };
     $scope.wellness_table = {
        "api": "/api/athlete/wellness/" + $scope.id + "/",
        "type": "wellness",

        "title": "",
        "auto_reload": true,
    };
     $scope.medicalandscience_table = {
        "api": "/api/athlete/medicalandscience/" + $scope.id + "/",
        "type": "medicalandscience",

        "title": "",
        "auto_reload": true,
    };
     $scope.media_table = {
        "api": "/api/athlete/medi/" + $scope.id + "/",
        "type": "medi",

        "title": "",
        "auto_reload": true,
    };

    $scope.save_interaction = function() {
        console.log('entered the finance');
        //console.log($scope.newfinance);
        $scope.newinteraction['athlete'] = $scope.athlete.id;
        console.log($scope.athlete.id);
        processTheData("post", "save_interaction", "/api/athlete/interactions/create/", $scope.newinteraction);
        return $scope.newinteraction="";



    };
     $scope.save_finance = function() {
        console.log('entered the finance');
        //console.log($scope.newfinance);
        $scope.newfinance['athlete'] = $scope.athlete.id;
        processTheData("post", "save_finance", "/api/athlete/finance/create/", $scope.newfinance);
        return $scope.newfinance="";


    };
     $scope.save_achivements = function() {
        console.log('entered the finance');
        //console.log($scope.newfinance);
        $scope.newfinance['athlete'] = $scope.athlete.id;
        processTheData("post", "save_achivements", "/api/athlete/interactions/create/", $scope.newachivement);
       return  $scope.newachivement="";


    };
    $scope.change_tab = function(tab) {
        $scope.active_tab = tab;
        console.log(tab);
    };
    $scope.get_active = function(tab) {
        if ($scope.active_tab == tab) {
            return "active"
        }
        return "";
    };


});