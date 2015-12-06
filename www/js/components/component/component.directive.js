(function (global) {
    "use strict";
    global
        .angular
        .module('app')
        .directive('componentView', componentView);

    function componentView() {
        return {
            templateUrl: 'js/components/component/component-view.html'
        };
    }

})(this);