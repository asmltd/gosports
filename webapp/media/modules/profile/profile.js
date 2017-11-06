window[appName].controller('userprofile',function($scope,$rootScope,http){


function processTheData(method, action, url, parameter) {

        http.Requests(method, url, parameter).success(function (response) {

console.log(action);
            switch (action) {

                case 'session':
                    $scope.user = response;
                    console.log($scope.user);
                    break;

                case 'save':
                    processTheData("get", "users", "/api/ui/session/", {});
                    break;


            }
        });
    }

   processTheData("get", "session", "/api/ui/session/", {});


//processTheData("get", "users", "/api/users/" + $scope.id + "/", {});

$scope.updateprofile=function(){



processTheData("patch", "save", "/api/ui/users/" + $scope.user.id+"/",$scope.user );
console.log('data is changed');



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