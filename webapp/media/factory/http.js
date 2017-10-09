/**
 * Created by hariharaselvam on 7/27/16.
 */

window[appName].factory('http', function ($http, $rootScope, $state) {
    return {
        Requests: function (method, URL, parameter) {

            $rootScope.showLoader = true;
            var $promise = {};
            switch (method) {
                case 'post':
                    $promise = $http.post(URL, parameter);
                    break;
                case 'patch':
                    $promise = $http.patch(URL, parameter);
                    break;
                case 'put':
                    $promise = $http.put(URL, parameter);
                    break;
                case 'get':
                    $promise = $http.get(URL, parameter);
                    break;
                case 'delete':
                    $promise = $http.delete(URL, parameter);
                    break;
            }
            $promise.error(function (response, error) {



                if (response["detail"] == "Authentication credentials were not provided.") {
                    window.location = "/auth/login/?next=/" + window.location.hash;
                }
                else {
                    $state.go('error', {type: error.toString()});

                }


            });
            $promise.finally(function () {
                $rootScope.showLoader = false;
            });

            return $promise;

        },
        Uploads: function (file, data, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);
            var params = Object.keys(data);
            for (i = 0; i < params.length; i++) {
                fd.append(params[i], data[params[i]])
            }
            $rootScope.showLoader = true;
            $promise = $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
            $promise.error(function (response, error) {

                if (response["detail"] == "Authentication credentials were not provided.") {
                    window.location = "/auth/login/?next=/" + window.location.hash;
                }
                else {

                    $state.go('error', {type: error.toString()});

                }


            });
            $promise.finally(function () {
                $rootScope.showLoader = false;
            });

            return $promise;


        }

    }
});

