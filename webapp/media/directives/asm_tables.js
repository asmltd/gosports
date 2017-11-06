/**
 * SYNESIS-TABLES Directive library:
 * """""""""""""""""""""""""
 * Created by Hariharaselvam Balasubramanian on 8/8/16.
 * for Ruckus Synesis Project
 *
 *   This directive for table to have pagination, column sorting, data filter by search keyword, export and other options
 *   will be useful for wms project only
 *
 *   Main Template:
 *   """"""""""""""
 *   /media/js/directive/templates/datatable.tpl.html is the main template to have following special options
 *   1. Pagination
 *   2. Page size selection
 *   3. Start and end with total
 *   4. Filter
 *   5. Download
 *   6. Pin or edit button
 *   7. Loading icon while data fetching from api
 *
 *
 *   /media/js/directive/templates/tables/ folder have templates for each type of table
 *
 *   How to use:
 *   """ "" """"
 *   <synesis-tables options="ap_events"></synesis-tables> on your html ( controller scope )
 *
 *   $scope.ap_events={ "api": "/api/ap/1/events/", "type": "events"}; on your js  ( controller function )
 *
 *   Options:
 *   """""""
 *   1. api         it is the url of the api which allows get method with following common parameters
 *                  page_size, page_number, sort, order, filter
 *   2. type        it is the name of the template file.
 *   3. title       it is optional parameter. it will be displyed above the table
 *   3. tools       it is optional paramater. default value is true. if we pass as false it will hide export, page size and
 *                  filter
 *   4. itemperpage it is optional parameter. default value is 10.
 *   5. location    it is to show hide some column based on the page
 *
 *
 * */


window[appName].directive("asmTables", function (http, message, pin, $rootScope) {
    return {

        restrict: 'E',

        templateUrl: "/media/directives/templates/datatable.tpl.html",

        scope: {
            config: '=options',
            popup: "&showPopup"
        },

        controller: function ($scope, $sce, $interval) {


            $scope.start = 0;
            $scope.end = 0;
            $scope.items = 0;
            $scope.list = [];
            $scope.boundaryLinks = true;
            $scope.directionLinks = true;
            $scope.title = $scope.config.title;
            $scope.alert = false;
            $scope.toggle_status = false;
            $scope.toggle_button = "fa-toggle-off";
            $scope.toggle_tooltip = "Show Removed";
            $scope.host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');


            $scope.get_data = function () {
                if ($scope.config.api == "" || $scope.config.api == undefined) {
                    return false;
                }
                $scope.loaded = false;
                var offset = parseInt($scope.pagination.current) * parseInt($scope.itemperpage) - parseInt($scope.itemperpage);

                $scope.api = $scope.config.api + "?offset=" + offset.toString() + "&limit=" + $scope.itemperpage;
                $scope.api = $scope.api + "&sort=" + $scope.sort + "&order=" + $scope.order + "&filter=" + $scope.filter;

                if ($scope.config.start != undefined && $scope.config.end != undefined) {
                    $scope.api = $scope.api + "&start=" + $scope.config.start + "&end=" + $scope.config.end;
                }


                http.Requests('get', $scope.api, '').success(function (response) {

                    $scope.loaded = true;
                    $scope.list = response.results;
                    $scope.items = response.count;
                    $scope.start = ($scope.itemperpage * ($scope.pagination.current - 1)) + 1;
                    $scope.end = $scope.start + $scope.list.length - 1;
                    $scope.export = $scope.config.api + "?export=true&page=1&page_limit=" + $scope.items;
                    $scope.pages = generatePagesArray($scope.pagination.current, $scope.items, $scope.itemperpage, 7);
                    $scope.pagination.last = $scope.pages[$scope.pages.length - 1];

                    $scope.highlight();
                    for(i=0;i<$scope.list.length;i++){
                        $scope.list[i].editable = false;
                    }


                });


            };

            $scope.to_trusted = function (html_code) {
                var html = "";
                try {
                    html = $sce.trustAsHtml(html_code)
                }
                catch (e) {
                    //console.log(html_code);
                    html = html_code
                }
                return html;
            };

            $scope.highlight = function () {
                if ($scope.filter != "" && $scope.filter != undefined) {
                    //var regEx = new RegExp($scope.filter, "ig");
                    for (i = 0; i < $scope.list.length; i++) {
                        var columns = Object.keys($scope.list[i]);
                        var no_highlight = ['id', 'record_id', 'value', 'codename', 'status_color', 'content', 'status', 'tx_rate', 'rx_rate', 'acked_by', 'acked_comment', 'acked_date', 'summary'];

                        for (j = 0; j < columns.length; j++) {
                            if (no_highlight.indexOf(columns[j]) != -1) {
                                continue;
                            }
                            if (typeof $scope.list[i][columns[j]] == "string") {
                                var keys = $scope.filter.split(" ");
                                for (k = 0; k < keys.length; k++) {

                                    if (['or', 'Or', 'OR', 'and', 'And', 'AND'].indexOf(keys[k]) != -1) {
                                        continue;
                                    }

                                    var regEx = new RegExp(keys[k], "ig");
                                    var to_match = $scope.list[i][columns[j]].replace(/<span class='highlight'>(.*?)<\/span>/g, '');
                                    var matches = to_match.match(regEx);
                                    //var matches = $scope.list[i][columns[j]].match(regEx);
                                    //console.log("match " + matches);
                                    if (matches != null) {
                                        //console.log("key " + keys[j]);
                                        var highlight = "<span class='highlight'>$&</span>";
                                        $scope.list[i][columns[j]] = $scope.list[i][columns[j]].replace(regEx, highlight);
                                        //console.log($scope.list[i][columns[j]]);
                                    }


                                }

                            }

                        }

                    }

                }


            };

            $scope.default_page = function () {
                $scope.sort = "";
                if ($scope.config.type == "uedevices" || $scope.config.type == "access_point") {
                    $scope.sort = "hostname";
                }


                $scope.order = "";
                $scope.filter = "";

                if ($scope.config.filter != undefined) {
                    $scope.filter = $scope.config.filter;
                }
                $scope.itemperpage = 10;
                if ($scope.config.itemperpage != undefined) {
                    $scope.itemperpage = $scope.config.itemperpage;
                }
                $scope.pagination = {};
                $scope.pagination.current = 1;
                $scope.get_data();

            };

            $scope.setCurrent = function (pagenum) {
                if (pagenum == '...') {
                    return false;
                }
                $scope.pagination.current = pagenum;
                $scope.get_data();
            };
            $scope.setSize = function () {
                $scope.pagination.current = 1;
                $scope.get_data();
            };
            $scope.firstPage = function () {
                $scope.pagination.current = 1;
                $scope.get_data();
            };

            $scope.colum_sort = function (colname) {
                if ($scope.sort == colname) {
                    if ($scope.order == "") {
                        $scope.order = "desc";
                    }
                    else {
                        $scope.order = "";

                    }

                }
                $scope.sort = colname;
                $scope.get_data();
            };
            $scope.get_col_icon = function (colname) {

                if ($scope.sort == colname) {
                    if ($scope.order == "") {
                        return "fa-sort-asc";
                    }
                    else {
                        return "fa-sort-desc";

                    }

                }
                else {
                    return "fa-sort";

                }

            };

            $scope.get_template = function () {

                return "/media/directives/templates/tables/" + $scope.config.type + ".table.html?v=" + window.version;
            };

            /* for custom dashboard's object drag and drop option */
            $scope.get_style = function () {
                if ($scope.config.db_id != undefined) {
                    return {cursor: "move"};
                }
                return {}
            };
            /* for loading time */
            $scope.get_opacity = function () {
                if (!$scope.loaded) {
                    return {opacity: 0.5};
                }
                return {}
            };

            /* for nodes table */
            $scope.toggle_data = function () {
                if ($scope.toggle_status == true) {
                    $scope.toggle_status = false;
                    $scope.toggle_button = "fa-toggle-off";
                    $scope.toggle_tooltip = "Show Removed";
                } else {
                    $scope.toggle_status = true;
                    $scope.toggle_button = "fa-toggle-on";
                    $scope.toggle_tooltip = "Hide Removed";
                }
                $scope.get_data();

            };

            $scope.default_page();



            /* for pin to dashboard option */
            $scope.pin_table = function () {
                pin.popup($scope.config.api, $scope.config.type);
            };

            /* for Data Management */
            $scope.reprocess = function (link) {
                http.Requests('get', link, '');
                $scope.get_data();
            };

            /* for Alarms */
            $scope.acknowledge = function (id) {

                bootbox.prompt("Acknowledgement Comment", function (result) {
                    if (result != null && result != '' && result != undefined) {

                        $scope.update_and_call_back('patch', '/api/alarm/' + id + '/', {
                            "acked_comment": result,
                            "type": "ack"
                        });

                    }

                });


            };
            $scope.force_close = function (id) {

                bootbox.confirm("Proceeding will mark this alarm as closed. Are you sure you want to continue?", function (result) {
                    if (result) {

                        $scope.update_and_call_back('patch', '/api/alarm/' + id + '/', {"type": "close"});

                    }

                });


            };
            /* for Threshold alert settings */
            $scope.threshold_change = function (id, value, element) {

                var param = {};
                switch (element) {
                    case 'oper':
                        param = {"oper": parseInt(value)};
                        break;
                    case 'value':
                        param = {"value": value};
                        break;
                    case 'toggle':
                        param = {"enabled": value};
                        break;
                }
                $scope.update_and_call_back('patch', $scope.config.api + id + '/', param);

            };
            /* for WMS Global settings */
            $scope.wms_value_change = function (id, value, element, locked) {
                if (locked) {
                    return false;
                }

                var param = {};
                switch (element) {
                    case 'value':
                        param = {"value": value};
                        break;
                    case 'toggle':
                        param = {"value": value};
                        break;
                }
                $scope.update_and_call_back('patch', $scope.config.api + id + '/', param);

            };
            /* for User Permission settings */
            $scope.change_permission = function (codename, status) {

                $scope.update_and_call_back('post', $scope.config.api, {"codename": codename, "enabled": status});

            };
            /* for agent management */
            $scope.toggle_ebility = function (etld_id, status) {

                $scope.update_and_call_back('patch', $scope.config.api + etld_id + '/', {"enable": status});

            };
            /* for Controller Authorization */
            $scope.authorize = function (id, status) {

                $scope.update_and_call_back('patch', "/api/controllerauthorization/" + id.toString() + "/", {"authorized": status});

            };

            /* for email settings table at profile and accounts pages */
            $scope.update_email_settings = function (id, interval, enable) {

                var param = {"update_interval": interval, "enabled": enable};
                $scope.update_and_call_back('patch', $scope.config.api + id.toString() + "/", param);

            };

            /* for Session history clear session */
            $scope.clear_session = function (id) {

                $scope.update_and_call_back('patch', $scope.config.api + id.toString() + "/", {"expire": true});

            };

            /* for group table remove user */
            $scope.remove_user = function (id) {
                var param = {'id': $scope.config.group_id, 'groupname': $scope.config.group_name, 'member': false};
                bootbox.confirm("<i class='fa fa-fw fa-info'></i> Are you sure you want to remove the user from " + $scope.config.group_name + " ?", function (result) {
                    if (result) {
                        $scope.update_and_call_back('post', '/api/wmsauth/users/' + id + '/groups/', param);
                    }
                });


            };

            /* for Accounts table remove group */
            $scope.remove_group = function (id, name) {
                var param = {'id': id, 'groupname': name, 'member': false};
                bootbox.confirm("<i class='fa fa-fw fa-info'></i> Are you sure you want to remove the user from " + name + " ?", function (result) {
                    if (result) {
                        $scope.update_and_call_back('post', '/api/wmsauth/users/' + $scope.config.user_id + '/groups/', param);
                    }

                });


            };

            /* for Custom dashboard share to group and users tables */
            $scope.toggle_dash = function (id, share) {

                var param = {'object_id': id, 'action': share};
                $scope.update_and_call_back('post', $scope.config.api, param);

            };

            /* for Controller ETLD Options table */
            $scope.etld_change = function (id, enabled, toggle) {

                if (enabled) {
                    return false;
                }
                var param = {'id': id, 'enabled': toggle};
                $scope.update_and_call_back('post', $scope.config.api, param);

            };

            /* for Synesis Patch Options table */
            $scope.wms_patch_change = function (id, enabled, toggle) {

                if (enabled) {
                    return false;
                }
                var param = {'id': id, 'enabled': toggle};
                $scope.update_and_call_back('patch', $scope.config.api + id + "/", param);

            };

            /* for Syslog table */
            $scope.toggle_syslog_filter = function (id, toggle) {

                var param = {'id': id, 'status': toggle};
                $scope.update_and_call_back('patch', $scope.config.api + id + "/", param);

            };

            $scope.delete_filter = function (id) {
                bootbox.confirm("<i class='fa fa-fw fa-info'></i> Are you sure you want to remove filter ?", function (result) {
                    if (result) {
                        $scope.update_and_call_back('delete', $scope.config.api + id + "/", '');
                    }

                });

            };

            $scope.delete_userfinance = function (row) {
                bootbox.confirm("<i class='fa fa-fw fa-info'></i> Are you sure you want to remove "+name+" ?", function (result) {
                    if (result) {
                        $scope.update_and_call_back('delete', 'api/athlete/finance/' + row.athlete+'/'+row.id + "/delete", row);
                    }

                });

            };

            $scope.delete_userinter = function (row){
                bootbox.confirm("<i class'fa fa-fw fa-info'></i> Are you sure you want to remove "+name+" ?", function (result) {
                    if (result) {
                        $scope.update_and_call_back('delete', 'api/athlete/interactions/' + row.athlete+'/'+row.id + "/delete", row);
                    }
                });


            };

            $scope.delete_row = function (id,text) {
                bootbox.confirm("<i class='fa fa-fw fa-info'></i> Are you sure you want to remove "+text+" ?", function (result) {
                    if (result) {
                        $scope.update_and_call_back('delete', $scope.config.api + id + "/", '');
                    }

                });

            };

            $scope.save_row = function(row){
    console.log(row);
    if(row.editable==false){
        row.editable=true;
    }else{
    console.log('api/athlete/finance/'+row.athlete + '/'+ row.id + "/edit")
    bootbox.confirm("<i class='fa fa-fw fa-info'></i> Are you sure you want to save changes ?", function (result) {
                    if (result) {
                        $scope.update_and_call_back('patch','api/athlete/finance/'+row.athlete + '/'+ row.id + "/edit", row);
                    }

                });
        row.editable=false;


    }

    };
    $scope.save_rowinter = function(row){
    console.log (row);
    if(row.editable1==false){
    row.editable1=true;
    }else{
    bootbox.confirm("<i class='fa fa-fw fa-info'></i> Are you sure you want to save changes ?", function (result) {
                    if (result) {
                        $scope.update_and_call_back('patch','api/athlete/interactions/'+row.athlete + '/'+ row.id + "/edit", row);
                    }

                });
        row.editable1=false;
    }


    };


            /* update the table operations and call the data back */
            $scope.update_and_call_back = function (method, api, param) {

                http.Requests(method, api, param).success(function (response) {
                    $scope.alert = true;
                    $("#alert").html(message.alert(response.status, response.result));
                    $scope.get_data();
                });

            };

            $scope.Timer = null;

            $scope.StartTimer = function () {

                $scope.Timer = $interval(function () {
                    console.log("Table Reloading...");
                    $scope.get_data();
                }, $rootScope.refresh * 60 * 1000);
            };


            $scope.StopTimer = function () {

                if (angular.isDefined($scope.Timer)) {
                    $interval.cancel($scope.Timer);
                }
            };

            if ($scope.config.auto_reload == true) {
                $scope.StartTimer();
            }


            /* to get array of pages */
            function generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {
                var pages = [];
                var totalPages = Math.ceil(collectionLength / rowsPerPage);
                var halfWay = Math.ceil(paginationRange / 2);
                var position;

                if (currentPage <= halfWay) {
                    position = 'start';
                } else if (totalPages - halfWay < currentPage) {
                    position = 'end';
                } else {
                    position = 'middle';
                }

                var ellipsesNeeded = paginationRange < totalPages;
                var i = 1;
                while (i <= totalPages && i <= paginationRange) {
                    var pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);

                    var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
                    var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
                    if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                        pages.push('...');
                    } else {
                        pages.push(pageNumber);
                    }
                    i++;
                }
                return pages;
            }

            function calculatePageNumber(i, currentPage, paginationRange, totalPages) {
                var halfWay = Math.ceil(paginationRange / 2);
                if (i === paginationRange) {
                    return totalPages;
                } else if (i === 1) {
                    return i;
                } else if (paginationRange < totalPages) {
                    if (totalPages - halfWay < currentPage) {
                        return totalPages - paginationRange + i;
                    } else if (halfWay < currentPage) {
                        return currentPage - halfWay + i;
                    } else {
                        return i;
                    }
                } else {
                    return i;
                }
            }


        },
        link: function (scope, element, attrs) {
            scope.$watch('config', function () {
                scope.default_page();
            });

            scope.$on('$destroy', function () {
                console.log(scope.config.type + " Table destroyed");
                scope.StopTimer();
            })


        }
    };


//        $scope.editable=false;
//        $scope.edit_userhtml=function(){
//        console.log('hiii this is edit fields');
//        $scope.editable=true;
//    }

});
