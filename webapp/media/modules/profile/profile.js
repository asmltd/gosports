window[appName].controller('userprofile',function($scope,$rootScope,http){


function processTheData(method, action, url, parameter) {

        http.Requests(method, url, parameter).success(function (response) {


            switch (action) {

                case 'user':
                    $scope.user = response;
                    console.log($scope.athlete);
                    break;

                case 'save':
                    processTheData("get", "athlete", "/api/athlete/" + $scope.id + "/", {});
                    break;


            }
        });
    }

    processTheData("get", "user", "/api/ui/session/", {});




$scope.updateprofile=function(home){
console.log('hi this is upadate profile');
$scope.h2=home;
console.log($scope.h2);



}

$scope.set=function(){
console.log('profile is created');
$scope.pwdchange=true;
}

$scope.h1={};
$scope.setpwd=function(home){
console.log('saved');
$scope.h1=home;
console.log($scope.h1);

}


});