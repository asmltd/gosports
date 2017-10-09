/**
 * Created by hariharaselvam on 7/27/16.
 */
window[appName].factory('message', function () {
    return {
    	alert: function (flag, message) {

            var divhtml = "<div class='alert alert-dismissible ";
            if (flag == true) {
                //document.getElementById('alert_ok').play();
                divhtml = divhtml + "alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-check' ></i>";
            }
            if (flag == false) {
                divhtml = divhtml + "alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-close' ></i>";
            }
            if (flag != false && flag != true) {
                divhtml = divhtml + "alert-warning'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-check' ></i>";
            }
            divhtml = divhtml + message + "</h4> </div>";
            window.setTimeout(function () {
                $(".alert").fadeTo(500, 0).slideUp(500, function () {

                });

            }, 6000);
            return divhtml;
        }
    }
});