/**
 * Created by hariharaselvam on 10/9/17.
 */
window[appName].controller('add_user', function ($rootScope, $scope, $state, $http, $interval, fileUpload, http) {

    $scope.user = {};

    $scope.addUser = function (user) {
    console.log($scope.user);
    if($scope.user.password==$scope.user.repassword){

        http.Requests('post', "/api/ui/users/", $scope.user).success(function (response) {
            bootbox.alert(response.result);
            if ($scope.user.usertype == "athlete") {
                $state.go("athletes");
            }

        })
        }else{
        $scope.unmatch="password dosn't match";
        }

    }


});
