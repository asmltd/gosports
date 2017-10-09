/**
 * Created by hariharaselvam on 7/28/16.
 */
window[appName].factory('pin', function (http, message) {
    return {
        popup: function (api_link, g_type) {

            var result = {};


            http.Requests('get', '/api/dashboard/', '').success(function (response) {


                var dblist = response.result;


                var html_text = '<div class="form-group"> <label class="col-sm-2 control-label" for="gp_title">Title </label>';
                html_text += '<input type="text" class="form-control"  id="p_title" ></div>';
                html_text += '<div class="form-group"><label class="col-sm-2 control-label" for="gp_desc">Description </label>';
                html_text += '<input type="text" class="form-control"  id="p_desc" ></div>';
                html_text += '<div class="form-group"><label class="col-sm-2 control-label" for="db_name">Dashboard </label>';
                html_text += '<select class="form-control" name="db_name" id="p_name">';
                html_text += '<div class="box-body" role="alert" id="alert_box"></div>';
                for (i = 0; i < dblist.length; i++) {
                    html_text += '<option  value="' + dblist[i]['id'] + '">' + dblist[i]['name'] + '</option>'

                }
                html_text += '</select></div>';

                bootbox.dialog({
                    message: html_text,
                    title: "Pin to Custom Dashboards",
                    buttons: {
                        main: {
                            label: "Pin to Dashboard",
                            className: "btn-primary",
                            callback: function () {
                                var title = $('#p_title').val();
                                var desc = $('#p_desc').val();
                                var dash = $('#p_name').val().toString();

                                var param = {
                                    "action": "pin",
                                    "title": title,
                                    "description": desc,
                                    "type": g_type,
                                    "data_endpoint": api_link
                                };
                                http.Requests('patch', '/api/dashboard/' + dash + '/', param).success(function (response) {

                                    bootbox.alert(response.result)


                                });


                            }
                        }

                    }
                });


            });


        }

    }
});
