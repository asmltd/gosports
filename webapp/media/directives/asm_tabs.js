/**
 * SYNESIS-TABS Directive library:
 * """""""""""""""""""""""""""
 * Created by Hariharaselvam Balasubramanian on 8/19/16.
 * This directive is used for customizable tabs on drill down pages
 */
window[appName].directive("synesisTabs", function (http) {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tab.tpl.html?v=" + window.version,

        scope: {
            config: '=options',
            show: '&showTab'
        },

        controller: function ($scope, $location) {


            $(function () {
                $("#sortable").sortable({
                    update: function (event, ui) {

                        var menu = [];

                        var custom_objects = $('.ui-state-default');
                        for (i = 0; i < custom_objects.length; i++) {

                            var tab = $scope.config.menu.filter(function (m) {
                                return m.tab == custom_objects[i].id;
                            });

                            menu.push(tab[0]);

                            var param = {'id': tab[0].id,  'order_number': i + 1};
                            http.Requests('patch', '/api/ui/tabs/' + $scope.config.page + '/' + tab[0].id + '/', param);
                        }
                        $scope.config.menu = menu;

                        $scope.$$phase || $scope.$apply();

                        $scope.init_menu();


                    }
                });
                $("#sortable").disableSelection();
            });


            $scope.config.menu = [];


            $scope.other = "More";

            $scope.unknown_tab = true;


            $scope.init_menu = function () {


                $scope.menu_primary = [];
                $scope.menu_secondary = [];

                $scope.count_primary = 8;

                var menu = $scope.config.menu.filter(function (m) {
                    return m.hide == false;
                });

                $scope.full_menu = menu;

                if (menu.length < ($scope.count_primary + 1)) {
                    $scope.menu_primary = menu;
                }
                else {
                    $scope.menu_primary = menu.slice(0, ($scope.count_primary - 1));
                    $scope.menu_secondary = menu.slice($scope.count_primary - 1);
                }
                for (i = 0; i < $scope.full_menu.length; i++) {
                    if ($scope.full_menu[i]['tab'] == $location.search().tab) {
                        $scope.unknown_tab = false;
                        break;
                    }
                }
                if($location.search().tab==undefined || $scope.unknown_tab == true)
                {
                    $scope.config.tab = $scope.menu_primary[0]['tab'];
                    $location.search('tab', $scope.config.tab);
                }else {
                    $scope.config.tab = $location.search().tab;
                }


            };

            $scope.call_api = function () {

                http.Requests('get', '/api/ui/tabs/' + $scope.config.page + '/', '').success(function (response) {
                    $scope.backup = response;
                    $scope.config.menu = response;
                    $scope.config.menu.sort(function (a, b) {
                        return parseFloat(a.order) - parseFloat(b.order);
                    });

                    $scope.init_menu();
                });

            };


            $scope.tab_change = function (tab) {

                $scope.config.tab = tab;
                $scope.other = "More";
                for (i = 0; i < $scope.menu_secondary.length; i++) {
                    if ($scope.menu_secondary[i]['tab'] == tab) {
                        $scope.other = $scope.menu_secondary[i]['title'];
                        break;
                    }
                }
                $location.search('tab', tab);
            };

            $scope.toggle_menu = function (tab) {
                for (i = 0; i < $scope.config.menu.length; i++) {
                    if ($scope.config.menu[i]['tab'] == tab) {

                        if ($scope.config.menu[i].hide == true) {

                            $scope.config.menu[i].hide = false;

                        }
                        else {
                            if($scope.full_menu.length==1)
                            {
                                bootbox.alert("You cannot disable all menu!");
                                break;
                            }
                            $scope.config.menu[i].hide = true;

                        }
                        var param = {'id': $scope.config.menu[i].id, 'hide': $scope.config.menu[i].hide};
                        http.Requests('patch', '/api/ui/tabs/' + $scope.config.page + '/' + $scope.config.menu[i].id + '/', param);
                        break;

                    }

                }
                $scope.init_menu();

            };

            $scope.get_icon = function (tab) {

                var tab = $scope.config.menu.filter(function (m) {
                    return m.tab == tab;
                });
                if (tab[0]['hide']) {
                    return "fa-toggle-off";
                }
                return "fa-toggle-on";

            };

            $scope.reset = function () {


                $scope.call_api();


            };



            $scope.update = function () {
                parent.Lightview.hide();
                var custom_objects = $('.ui-state-default');
                for (i = 0; i < custom_objects.length; i++) {

                    var tab = $scope.config.menu.filter(function (m) {
                        return m.tab == custom_objects[i].id;
                    });


                    var param = {'id': tab[0].id, 'hide': tab[0].hide, 'order_number': i + 1};
                    http.Requests('patch', '/api/ui/tabs/' + $scope.config.page + '/' + tab[0].id + '/', param);

                }

                $scope.call_api();

            };

            $scope.call_api();


        },


        link: function (scope, element, attrs) {

            scope.$watchCollection('config', function () {
                //console.log("Trigger tab change from tabs lib...");
                scope.show({arg: scope.config.tab});
            });


        }
    };
});



