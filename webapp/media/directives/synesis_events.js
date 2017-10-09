/**
 * SYNESIS-Events Directive library:
 * Created by hariharaselvam on 8/9/16.
 *
 *  This directive can be used for enter key events on text boxes
 */
window[appName].directive('synesisEnterKey', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.synesisEnterKey);
                });
                event.preventDefault();
            }
        });
    };
});

window[appName].directive('synesisRightClick', function() {
    return function(scope, element, attrs) {
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                scope.$eval(attrs.synesisRightClick);
            });
            event.preventDefault();
        });
    };
});
