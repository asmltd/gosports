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


window[appName].directive("synesisTables", function (http, message, pin, wmslib, $rootScope) {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/datatable.tpl.html",

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

                $scope.api = $scope.config.api + "?page=" + $scope.pagination.current + "&page_limit=" + $scope.itemperpage;
                $scope.api = $scope.api + "&sort=" + $scope.sort + "&order=" + $scope.order + "&filter=" + $scope.filter;

                if ($scope.config.start != undefined && $scope.config.end != undefined) {
                    $scope.api = $scope.api + "&start=" + $scope.config.start + "&end=" + $scope.config.end;
                }

                if ($scope.config.type == 'nodes' || $scope.config.type == 'controllers') {
                    $scope.api = $scope.api + "&removed=" + $scope.toggle_status;
                }

                http.Requests('get', $scope.api, '').success(function (response) {
                    wmslib.log_plt($scope.config.api, response);
                    $scope.loaded = true;
                    $scope.list = response.result;
                    $scope.items = response.total_rows;
                    $scope.start = ($scope.itemperpage * ($scope.pagination.current - 1)) + 1;
                    $scope.end = $scope.start + response.number_of_rows - 1;
                    $scope.export = $scope.config.api + "?export=true&page=1&page_limit=" + $scope.items;
                    $scope.pages = generatePagesArray($scope.pagination.current, $scope.items, $scope.itemperpage, 7);
                    $scope.pagination.last = $scope.pages[$scope.pages.length - 1];

                    if ($scope.config.type == "clusters" || $scope.config.type == "zones" || $scope.config.type == "controllers" || $scope.config.type == "access_point") {
                        for (i = 0; i < $scope.list.length; i++) {
                            if ($scope.list[i].throughput == null || $scope.list[i].throughput == undefined) {
                                continue;
                            }
                            $scope.list[i].throughput.tx = wmslib.convert_throughput($scope.list[i].throughput.tx);
                            $scope.list[i].throughput.rx = wmslib.convert_throughput($scope.list[i].throughput.rx);
                        }
                    }
                    if ($scope.config.type == "uesessions" || $scope.config.type == "interface") {
                        for (i = 0; i < $scope.list.length; i++) {
                            $scope.list[i].rx_rate = wmslib.convert_throughput($scope.list[i].rx_rate);
                            $scope.list[i].tx_rate = wmslib.convert_throughput($scope.list[i].tx_rate);
                        }
                    }
                    if ($scope.config.type == "uedevices" || $scope.config.type == "controllers" || $scope.config.type == "access_point") {
                        for (i = 0; i < $scope.list.length; i++) {
                            if ($scope.list[i].hostname == "" || $scope.list[i].hostname == null || $scope.list[i].hostname == undefined) {
                                $scope.list[i].hostname = "Unknown";
                            }
                        }
                    }
                    if ($scope.config.type == "clusters" || $scope.config.type == "zones") {
                        for (i = 0; i < $scope.list.length; i++) {
                            if ($scope.list[i].name == "" || $scope.list[i].name == null || $scope.list[i].name == undefined) {
                                $scope.list[i].name = "Unknown";
                            }
                        }
                    }
                    if ($scope.config.type == "datalake") {
                        for (i = 0; i < $scope.list.length; i++) {
                            $scope.list[i].processing_time = wmslib.uptime_convertion($scope.list[i].processing_time);
                            $scope.list[i].download = "/api/datalake/" + $scope.list[i].id.toString() + "/download/?token=" + $scope.list[i].token;
                            $scope.list[i].reprocess = "/api/datalake/" + $scope.list[i].id.toString() + "/reprocess/?token=" + $scope.list[i].token;
                            if ($scope.list[i].content == 'heartbeat') {
                                $scope.list[i].icon = "fa-heartbeat"
                            }
                            if ($scope.list[i].content == 'events') {
                                $scope.list[i].icon = "fa-calendar"
                            }
                            if ($scope.list[i].content == 'statistics') {
                                $scope.list[i].icon = "fa-bar-chart"
                            }
                            if ($scope.list[i].content == 'config') {
                                $scope.list[i].icon = "fa-gear"
                            }
                            //console.log($scope.list[i].icon);
                            //console.log($scope.list[i].processing_time);
                        }
                    }
                    if ($scope.config.type == "threshold") {
                        for (i = 0; i < $scope.list.length; i++) {
                            var start = $scope.list[i].min;
                            var end = $scope.list[i].max;
                            var inc = $scope.list[i].increment;
                            var value_list = [];
                            value_list.push(start);
                            while (start != end) {
                                start = start + inc;
                                value_list.push(start);
                            }

                            $scope.list[i].values_list = value_list;
                            if (value_list.indexOf($scope.list[i].value) == -1 && $scope.list[i].increment != -1) {
                                $scope.list[i].value = value_list[0];
                            }

                        }
                    }
                    if ($scope.config.type == "wms_settings") {
                        for (i = 0; i < $scope.list.length; i++) {
                            if ($scope.list[i].type == 'select') {
                                var start = parseInt($scope.list[i].min);
                                var end = parseInt($scope.list[i].max);
                                var inc = parseInt($scope.list[i].step);
                                var value_list = [];
                                value_list.push(start);
                                while (start != end) {
                                    start = start + inc;
                                    value_list.push(start.toString());
                                }

                                $scope.list[i].values_list = value_list;
                                //console.log($scope.list[i].value);
                            }
                        }
                    }
                    if ($scope.config.type == "controller_authorize") {
                        for (i = 0; i < $scope.list.length; i++) {
                            if ($scope.list[i]["authorized"] == false) {
                                $scope.list[i]["new"] = true;
                                $scope.list[i]["Status_text"] = "Unauthorized";
                                $scope.list[i]["toggle"] = "fa-toggle-off";

                            }
                            else {
                                $scope.list[i]["new"] = false;
                                $scope.list[i]["Status_text"] = "Authorized";
                                $scope.list[i]["toggle"] = "fa-toggle-on";
                            }
                        }
                    }
                    if ($scope.config.type == "agent_management") {
                        for (i = 0; i < $scope.list.length; i++) {
                            if ($scope.list[i]["enabled"] == false) {
                                $scope.list[i]["new"] = true;
                                $scope.list[i]["Status_text"] = "Disabled";
                                $scope.list[i]["toggle"] = "fa-toggle-off";

                            }
                            else {
                                $scope.list[i]["new"] = false;
                                $scope.list[i]["Status_text"] = "Enabled";
                                $scope.list[i]["toggle"] = "fa-toggle-on";
                            }
                        }
                    }
                    if ($scope.config.type == "agents") {
                        $rootScope.latest_upgrade_id = null;
                        for (i = 0; i < $scope.list.length; i++) {
                            if ($scope.list[i]["latest"] == true) {
                                $rootScope.latest_upgrade_id = $scope.list[i]["id"];
                                //console.log($rootScope.latest_upgrade_id);

                            }
                            if ($scope.list[i]["upgrade_time"] == null) {
                                $scope.list[i]["upgrade_time"] = "";

                            }

                        }
                    }

                    if ($scope.config.type == "interface") {
                        $rootScope.latest_upgrade_id = null;
                        for (i = 0; i < $scope.list.length; i++) {
                            if ($scope.list[i].speed == -1) {
                                $scope.list[i].speed = "UNKNOWN";
                            }

                        }
                    }
                    if ($scope.config.type == "nodes") {

                        for (i = 0; i < $scope.list.length; i++) {
                            var roles = ["UNIVERSAL", "WORKER", "FRONTEND", "BACKEND"];
                            if ($scope.list[i].status == "removed") {
                                $scope.list[i].color = "grey";
                                $scope.list[i].status = "REMOVED";
                            }
                            if ($scope.list[i].status == "online") {
                                $scope.list[i].color = "green";
                                $scope.list[i].status = "ONLINE";
                            }
                            if ($scope.list[i].status == "offline") {
                                $scope.list[i].color = "red";
                                $scope.list[i].status = "OFFLINE";
                            }
                            try {
                                $scope.list[i].role = roles[$scope.list[i].role - 1];
                            } catch (e) {
                                $scope.list[i].role = "UNKNOWN";
                            }


                        }
                    }
                    if ($scope.config.type == "controllers") {

                        for (i = 0; i < $scope.list.length; i++) {
                            if ($scope.list[i].ips.management != "") {
                                $scope.list[i].ip = $scope.list[i].ips.management;
                                continue;
                            }
                            if ($scope.list[i].ips.control != "") {
                                $scope.list[i].ip = $scope.list[i].ips.control;
                                continue;
                            }

                        }
                    }

                    if ($scope.config.type == "uesessions") {
                        $rootScope.latest_upgrade_id = null;
                        for (i = 0; i < $scope.list.length; i++) {
                            $scope.list[i].est_tp = wmslib.convert_throughput($scope.list[i].estimated_throughput);
                            if ($scope.list[i].ue_hostname == null || $scope.list[i].ue_hostname == "") {
                                $scope.list[i].ue_hostname = "UNKNOWN";
                            }

                        }
                    }
                    if ($scope.config.type == "etld_options" || $scope.config.type == "wms_patch") {
                        $rootScope.latest_upgrade_id = null;
                        for (i = 0; i < $scope.list.length; i++) {
                            $scope.list[i].style = "pointer";
                            if ($scope.list[i].fixed == true) {
                                $scope.list[i].style = "not-allowed";
                            }

                        }
                    }
                    if ($scope.config.type == "uesession_history") {

                        for (i = 0; i < $scope.list.length; i++) {
                            var ls = new Date($scope.list[i].last_seen);
                            var fs = new Date($scope.list[i].first_seen);
                            var seconds = (ls - fs);
                            $scope.list[i].session_time = wmslib.uptime_convertion(seconds);

                        }
                    }
                    if ($scope.config.type == "anomaly") {

                        for (i = 0; i < $scope.list.length; i++) {
                            $scope.list[i].mlp_tt = wmslib.uptime_convertion(parseInt($scope.list[i].mlp_tt));
                        }
                    }
                    $scope.highlight();


                });


            };
            $scope.showtable_menu = function () {
                bootbox.dialog({
                    title: $scope.title + " Table",
                    message: "This is " + $scope.title + " table"
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

                                /*
                                 var matches = $scope.list[i][columns[j]].match(regEx);
                                 if (matches == null) {
                                 continue;
                                 }

                                 if (matches.length > 0) {
                                 var highlight = "<span class='highlight'>$&</span>";
                                 $scope.list[i][columns[j]] = $scope.list[i][columns[j]].replace(regEx, highlight);
                                 }*/
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
                if ($scope.config.type == "datalake" || $scope.config.type == "events") {
                    $scope.sort = "timestamp";
                    $scope.order = "desc";
                }
                if ($scope.config.type == "nodes") {
                    $scope.sort = "hostname";
                    $scope.order = "desc";
                }
                if ($scope.config.type == "users") {
                    $scope.sort = "username";
                    $scope.order = "desc";
                }
                if ($scope.config.type == "permission") {
                    $scope.sort = "codename";
                    $scope.order = "desc";
                }
                if ($scope.config.type == "controller_authorize") {
                    $scope.sort = "serial";
                    $scope.order = "desc";
                }
                if ($scope.config.type == "alarms") {
                    $scope.sort = "opened";
                    $scope.order = "desc";
                }
                if ($scope.config.type == "agent_management") {
                    $scope.sort = "version";
                    $scope.order = "desc";
                }
                if ($scope.config.type == "email_notification") {
                    $scope.sort = "alarm_type";
                    $scope.order = "desc";
                }
                if ($scope.config.type == "wms_settings") {
                    $scope.sort = "option";
                }
                if ($scope.config.type == "session_history") {
                    $scope.sort = "created";
                    $scope.order = "asc";
                }
                if ($scope.config.type == "anomaly") {
                    $scope.sort = "object_model_type";
                    $scope.order = "asc";
                }
                if ($scope.config.type == "zones" || $scope.config.type == "uptime" || $scope.config.type == "groups") {
                    $scope.sort = "name";
                    $scope.order = "asc";
                }
                if ($scope.config.type == "threshold") {
                    $scope.sort = "name";
                    $scope.order = "asc";
                }
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

                return "/media/js/directive/templates/tables/" + $scope.config.type + ".table.html?v=" + window.version;
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

            /* for client devices operating system icons */
            $scope.get_os = function (os) {
                if (os == null || os == undefined) {
                    os = "unknown";
                }

                var os_name = os.replace("<span class='highlight'>", "");
                var os_name = os_name.replace("</span>", "");
                return wmslib.icon_for_os(os_name);
            };

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

            $scope.delete_row = function (id,text) {
                bootbox.confirm("<i class='fa fa-fw fa-info'></i> Are you sure you want to remove "+text+" ?", function (result) {
                    if (result) {
                        $scope.update_and_call_back('delete', $scope.config.api + id + "/", '');
                    }

                });

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
});
