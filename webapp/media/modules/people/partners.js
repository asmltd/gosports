/**
 * Created by hariharaselvam on 10/9/17.
 */
window[appName].controller('partners', function ($rootScope, $scope, $state, $http, $interval, fileUpload) {


    $scope.athlete_table = {
        "api": "/api/athlete/",
        "type": "athletes",

        "title": "Partners",
        "auto_reload": true,

    };
});
