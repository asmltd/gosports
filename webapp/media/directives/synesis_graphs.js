/**
 * Created by hariharaselvam on 6/9/17.
 */
/**
 * SYNESIS-CHARTS Directive library:
 * """""""""""""""""""""""""""""
 * Created by Hariharaselvam Balasubramanian on 6/9/17.
 * for Wireless Monitoring Server Project
 *
 * This directive to generate series and pie charts with following options
 *
 *  1. Dual charts
 *      one without title and smaller size adoptable to the page, visible
 *      another with title and 980 size, hidden
 *  2. Expand to view the bigger chart
 *  3. Minimize the widget
 *  4. Pin to Dashboard
 *  5. Loading icon while data fetching from api
 *  6. Event table which will be filtered while zooming
 *
 *
 *  Template "/media/js/directive/templates/graph.tpl.html"
 *
 *
 *  How to use:
 *  """ "" """"
 *  <synesis-graphs options="db_throughput"></synesis-graphs> on your html ( controller scope )
 *  $scope.db_throughput = {
            "api": "/api/dashboardmain/total/throughput/", "type": "throughput", "start": $scope.start_date,
            "end": $scope.end_date, "event": "/api/dashboardmain/events/","popid":"tpgraphp"
        };

 on your js  ( controller function )

 *  Options:
 *  """"""""
 *  1. api          api link to fetch data
 *  2. start        start time to be send as parameter to api
 *  3. end          end time to be send as parameter to api
 *  4. additional   like frames error graph or ap perspective option as additional parameter
 *  5. type         template name of the graph
 *  6. events       optional api for events table to be placed along with pop up chart
 *  7. popid        id of the popup chart
 *
 *
 *
 */
window[appName].directive("synesisGraphs", function (http, message, pin, wmslib, $rootScope, google_graph, $timeout) {
    return {

        restrict: 'EA',

        templateUrl: "/media/js/directive/templates/graph.tpl.html?v=" + window.version,

        scope: {
            config: '=options',
            popup: "&showPopup"
        },

        controller: function ($scope) {

            $scope.title = $scope.config.title;
            $scope.slider = {};
            $scope.button_enabled = true;
            $scope.char_data = [];
            $scope.no_data = false;
            $scope.chartObject = {
                "type": "AreaChart", "data": [['', ''], [0, 0]], "options": {
                    'hAxis': {
                        'gridlines': {
                            'color': 'transparent'
                        },
                        'minValue': 0
                    },
                    'vAxis': {
                        'gridlines': {
                            'color': 'transparent'
                        },
                        'minValue': 0
                    }
                }
            };
            $scope.re_render = {};
            $scope.chartObject_pop = $scope.chartObject;


            $scope.load_chart = function () {

                if ($scope.config.api == "" || $scope.config.api == undefined) {
                    return false;
                }
                $scope.loaded = false;

                $scope.api = $scope.config.api;


                if ($scope.config.start != undefined && $scope.config.end != undefined) {
                    $scope.api = $scope.api + "?start=" + $scope.config.start + "&end=" + $scope.config.end;
                }

                if ($scope.config.additional != undefined) {
                    $scope.api = $scope.api + $scope.config.additional;
                }


                $scope.load_api();


            };

            $scope.call_events = function () {
                //console.log("load event table");
                if ($scope.config.event != undefined) {

                    $scope.events = {
                        "api": $scope.config.event,
                        "type": "events",
                        "tools": false,
                        "itemperpage": 5
                    };
                    $scope.enable_event = true;
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.slider.enabled = true;
                            //console.log("enabled");
                        });
                    }, 2000);
                }
                setTimeout(function () {
                    $scope.chartObject_pop = {};
                    $scope.chartObject_pop = $scope.re_render;
                    //console.log("popup chart");
                }, 1000);

            };

            $scope.load_api = function () {
                http.Requests('get', $scope.api, '').success(function (response) {

                    wmslib.log_plt($scope.config.api, response);
                    if(response == []){
                        $scope.no_data = true;
                    }
                    $scope.loaded = true;
                    $scope.char_data = response;
                    $scope.populate_data(response);
                    try {
                        var min_value = response[0]['data'][0][0];
                        var max_value = response[0]['data'][response[0]['data'].length - 1][0];
                        $scope.slider.minValue = min_value;
                        $scope.slider.maxValue = max_value;
                        $scope.slider.enabled = true;
                        $scope.slider.options = {
                            floor: min_value,
                            ceil: max_value,
                            step: 900000,
                            translate: function (value) {
                                var date = new Date(value);
                                var utc_time = date.toUTCString();
                                return utc_time.replace(" GMT", "");

                            }
                        };
                        //console.log($scope.slider);

                    } catch (e) {

                    }


                    console.log($scope.config.type + " chart template created");


                });

            };

            $scope.populate_data = function (data) {
                var sensitivity = 100;
                if ($scope.config.additional != undefined) {
                    if ($scope.config.additional.indexOf("&sensitivity=") != -1) {
                        sensitivity = $scope.config.additional.match(/\d+/)[0];
                        sensitivity = parseInt(sensitivity);
                    }
                }
                sensitivity = 100;
                var config = google_graph.Configurations($scope.config.type, data, sensitivity);
                $scope.chartObject = config[0];
                $scope.chartObject_pop = config[1];
                $scope.title = config[2];
                $scope.no_data = config[4];

            };


            $scope.get_style = function () {
                if ($scope.config.db_id != undefined) {
                    return {cursor: "move"};
                }
                return {}
            };

            $scope.get_opacity = function () {
                if (!$scope.loaded) {
                    return {opacity: 0.1};
                }
                if($scope.no_data==true){
                    console.log("no data");
                    return {opacity: 0};
                }
                return {}
            };
            $scope.get_window_size = function () {
                if ($scope.config.event == undefined && $scope.slider.enabled == true) {
                    return {height: '300px'};
                }
                return {height: '600px'};
            };


            $scope.pin_graph = function () {
                pin.popup($scope.config.api, $scope.config.type);
            };

            $scope.download_graph = function () {
                $graph = $("#" + $scope.config.popid);
                var canvas = $graph.find('svg')[0];
                var title = "Ruckus_WMS_" + $scope.title.replace(" ", "_") + ".png";
                saveSvgAsPng(canvas, title);

            };


            $scope.load_chart();

            $rootScope.$watchCollection('interval', function () {

                if ($rootScope.interval != {} && $scope.enable_event == true) {

                    $scope.events = {
                        "api": $scope.config.event,
                        "type": "events",
                        "tools": false,
                        "itemperpage": 5,
                        "start": $rootScope.interval.start, "end": $rootScope.interval.end
                    };


                }


            }, true);
            $scope.filter_data = function () {
                t1 = new Date(parseInt($scope.slider.minValue));
                mint = wmslib.formatDate(t1);
                t2 = new Date(parseInt($scope.slider.maxValue));
                maxt = wmslib.formatDate(t2);
                $scope.events = {
                    "api": $scope.config.event,
                    "type": "events",
                    "tools": false,
                    "itemperpage": 5,
                    "start": mint, "end": maxt
                };

                var full_data = $scope.char_data;
                var filtered_data = [];
                for (i = 0; i < full_data.length; i++) {
                    var series = full_data[i];
                    var current_data = full_data[i]['data'];
                    var new_data = [];
                    for (j = 0; j < current_data.length; j++) {
                        if (current_data[j][0] >= $scope.slider.minValue && current_data[j][0] <= $scope.slider.maxValue) {
                            new_data.push(current_data[j]);
                        }
                    }
                    series.data = new_data;
                    filtered_data.push(series);
                }
                //console.log($scope.char_data);
                $scope.populate_data(filtered_data);

            };
            $scope.restore_size = function () {
                $scope.slider.minValue = $scope.slider.options.floor;
                $scope.slider.maxValue = $scope.slider.options.ceil;

            };

            $scope.$watchCollection('slider', function () {

                if ($scope.slider != {} && $scope.slider.enabled == true) {


                    $scope.button_enabled = false;

                }
                else {
                    $scope.button_enabled = true;
                }
                //console.log("button enabled " + $scope.button_enabled);
                //console.log($scope.slider.minValue);
                //console.log($scope.slider.maxValue);

            }, true);


        },
        link: function (scope, element, attrs) {
            scope.$watch('config', function () {
                scope.load_chart();
            });
            scope.$on('$destroy', function () {
                console.log(scope.config.type + " Graph destroyed");
            })


        }
    };
});

