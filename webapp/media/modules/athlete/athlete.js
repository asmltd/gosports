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



            }
        });
    }
    processTheData("get", "athlete", "/api/athlete/"+$scope.id+"/", {});


});
