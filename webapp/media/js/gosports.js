window.appName = 'GoSports';

window[appName] = angular.module(appName,['ui.router']);


window[appName].config(function ($stateProvider, $urlRouterProvider, $httpProvider) {


    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl:'/media/modules/dashboard/dashboard.html?v=' + window.version,
            controller: 'dashboard'
        });

    $stateProvider
        .state('create', {
            url: '/create',
            templateUrl: '/media/modules/people/add_user.html?v=' + window.version,
            controller: 'add_user'
        });

    $stateProvider
        .state('athletes', {
            url: '/athletes',
            templateUrl: '/media/modules/people/athletes.html?v=' + window.version,
            controller: 'athletes'
        });

    $stateProvider
        .state('athlete', {
            url: '/athlete/:id',
            templateUrl: '/media/modules/athlete/athlete.html?v=' + window.version,
            controller: 'athlete'
        });

        $stateProvider
        .state('partners', {
            url: '/partners',
            templateUrl: '/media/modules/people/partners.html?v=' + window.version,
            controller: 'partners'
        });

        $stateProvider
        .state('user_details', {
            url: '/user_details',
            templateUrl: '/media/modules/user_details/user_details.html?v=' + window.version,
            controller: 'user_details'
        });

        $stateProvider
        .state('add_user', {
            url: '/add_user',
            templateUrl: '/media/modules/add_user/add_user.html?v=' + window.version,
            controller: 'add_user_controller'
        });

        $stateProvider
        .state('update_user', {
            url: '/update_user/:id',
            templateUrl: '/media/modules/update_user/update_user.html?v=' + window.version,
            controller: 'update_user_controller'
        });

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        });


window[appName].service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file,user,uploadUrl){
        var fd = new FormData();

        fd.append('image', file);
        var keys = Object.keys(user);
        for(i=0;i<keys.length;i++){
        fd.append(keys[i], user[keys[i]]);
        }

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);


window[appName].controller('gosports_controller', function ($rootScope, $scope, http, $state, $window, $interval) {

    $scope.logout = function () {


        window.location = window.logout;


    };

    function processTheData(method, action, url, parameter) {

        http.Requests(method, url, parameter).success(function (response) {


            //wmslib.log_plt(action, response);
            switch (action) {

                case 'session':
                    $rootScope.user = response;
                    break;



            }
        });
    }





    $scope.search_query = "";
    $rootScope.alert = "";
    $rootScope.alert_message = "";
    $rootScope.alert_icon = "";
    $rootScope.interval = {};
    $rootScope.refresh = 15;

    processTheData("get", "session", "/api/ui/session/", {});




});
