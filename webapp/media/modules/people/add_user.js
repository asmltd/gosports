/**
 * Created by hariharaselvam on 10/9/17.
 */
window[appName].controller('add_user', function ($rootScope, $scope, $state, $http, $interval, fileUpload) {

    $scope.user = {};

    $scope.addUser = function () {

        $scope.uploadFile = function () {
            var file = $scope.myFile;
            var uploadUrl = "/api/ui/users/";
            fileUpload.uploadFileToUrl(file, $scope.user, uploadUrl);
        };
        $scope.uploadFile();
        if($scope.user.usertype=="athlete"){
            $state.go("athletes");
        }

    }


});
