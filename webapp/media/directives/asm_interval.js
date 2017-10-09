/**
 * SYNESIS-TIME-INTERVAL directive library:
 * """"""""""""""""""""""""""""""""""""
 * Created by Hariharaselvam Balasubramanian on 8/29/16.
 *
 * This directive is used for date time interval on drill down pages and dashboard pages
 */
window[appName].directive("synesisTimeInterval", function (http) {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/interval.tpl.html?v=" + window.version,

        scope: {
            config: '=options',
            show: '&showTab',
            reload: '&reload'
        },

        controller: function ($scope, $rootScope, $interval) {

            $('#daterange').daterangepicker(
                {
                    timePicker: true,
                    format: 'YYYY-MM-DD hh:mm:ss'
                },
                function (start, end) {
                    //$scope.graph_button = 'CUSTOM';
                    $('#reservationtime').val(start.format('MMMM D, YYYY h:mm A') + ' - ' + end.format('MMMM D, YYYY h:mm A'));
                    var startdate = start.format('YYYY-MM-DD H:mm:ss');
                    var enddate = end.format('YYYY-MM-DD H:mm:ss');
                    var api = '/api/ui/daterange/?start=' + startdate + '&end=' + enddate;
                    $scope.call_api(api, 'CUSTOM');
                }
            );

            $scope.select_range = function (range) {
                var api = "/api/ui/daterange/";
                api = (range == "WEEK") ? "/api/ui/daterange/?days=7" : api;
                api = (range == "MONTH") ? "/api/ui/daterange/?days=30" : api;
                //$scope.graph_button = range;
                $scope.call_api(api, range);
            };

            $scope.call_api = function (api, range) {
                $scope.graph_button = range;
                //$scope.$apply();


                http.Requests('get', api, '').success(function (response) {

                    $scope.start_date = response.start;
                    $scope.end_date = response.end;
                    $scope.local_timezone = response.timezone;
                    $rootScope.timeinterval = response;

                    $rootScope.timeinterval.active = range;

                });

            };
            if ($rootScope.timeinterval.active == "") {
                $scope.call_api("/api/ui/daterange/", 'DAY');
                $scope.graph_button = "DAY";
            } else {
                $scope.start_date = $rootScope.timeinterval.start;
                $scope.end_date = $rootScope.timeinterval.end;
                $scope.local_timezone = $rootScope.timeinterval.timezone;
                $scope.graph_button = $rootScope.timeinterval.active;

            }

            $scope.button_style = function (selected) {
                if ($scope.graph_button == selected) {
                    return {
                        "color": "black",
                        "background-color": "#e1e1e1",
                        "border-color": "rgba(0, 0, 0, 0.2)"

                    }
                }
                return {};

            };

            $scope.Timer = null;

            $scope.StartTimer = function () {
                //console.log("start timer");
                $scope.Timer = $interval(function () {
                    //console.log("interval Reloading...");
                    $scope.select_range($scope.graph_button);
                }, $rootScope.refresh * 60 * 1000);
            };


            $scope.StopTimer = function () {

                //console.log("stop timer");
                if (angular.isDefined($scope.Timer)) {
                    $interval.cancel($scope.Timer);
                }
            };

            $scope.StartTimer();


        },
        link: function (scope, element, attrs) {

            scope.$watchCollection('start_date', function () {
                //console.log("Trigger chart change from interval lib...");
                scope.show({arg1: scope.start_date, arg2: scope.end_date});
            });
            scope.$watchCollection('end_date', function () {
                //console.log("Trigger chart change from interval lib...");
                scope.show({arg1: scope.start_date, arg2: scope.end_date});
            });
            scope.$on('$destroy', function () {
                //console.log("Tab interval destroyed");
                scope.StopTimer();
            })


        }


    };
});