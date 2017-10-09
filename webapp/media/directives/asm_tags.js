/**
 * SYNESIS-CUSTOM-TAGS Directive library:
 * """"""""""""""""""""""""""""""""""
 * Created by Hariharaselvam Balasubramanian on 8/26/16.
 *
 * Custom tags for Synesis
 *
 */

window[appName].directive("synesisStatusLed", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/status.html?v=" + window.version,

        scope: {
            device: '=options'
        }


    };
});

window[appName].directive("synesisApStatus", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/ap_status.html?v=" + window.version,

        scope: {
            ap: '=options'
        }


    };
});

window[appName].directive("synesisControllerStatus", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/controller_status.html?v=" + window.version,

        scope: {
            controller: '=options'
        }


    };
});
window[appName].directive("synesisClientStatus", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/client_status.html?v=" + window.version,

        scope: {
            client: '=options'
        }


    };
});
window[appName].directive("synesisClientSessions", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/uesessions.html?v=" + window.version,

        scope: {
            ues: '=options'
        }


    };
});

window[appName].directive("synesisAccessPoints", function ($rootScope) {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/accesspoints.html?v=" + window.version,

        scope: {
            ap: '=options'
        }


    };
});

window[appName].directive("synesisControllers", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/controllers.html?v=" + window.version,

        scope: {
            controllers: '=options'
        }


    };
});

window[appName].directive("synesisCpuLoad", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/cpuload.html?v=" + window.version,

        scope: {
            load: '=options'
        }


    };
});

window[appName].directive("synesisCpuState", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/cpustate.html?v=" + window.version,

        scope: {
            usage: '=options'
        }


    };
});

window[appName].directive("synesisDisk", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/disk.html?v=" + window.version,

        scope: {
            disks: '=options'
        }


    };
});

window[appName].directive("synesisDiskTable", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/disk_table.html?v=" + window.version,

        scope: {
            disks: '=options'
        }


    };
});

window[appName].directive("synesisMemory", function () {
    return {

        restrict: 'E',

        templateUrl: "/media/js/directive/templates/tags/memory.html?v=" + window.version,

        scope: {
            mem: '=options'
        }


    };
});

window[appName].directive("synesisRxTp", function () {
    return {

        restrict: 'E',

        template: '<span style="color: #000080;"><i class="fa fa-arrow-up"></i> {{ rx }}</span>',

        scope: {
            rx: '=rx'
        }


    };
});

window[appName].directive("synesisTxTp", function () {
    return {

        restrict: 'E',

        template: '<span style="color: #008000;"><i class="fa fa-arrow-down"></i> {{ tx }}</span>',

        scope: {
            tx: '=tx'
        }


    };
});