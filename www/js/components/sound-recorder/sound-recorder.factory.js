(function (global) {

    global
        .angular
        .module('speakerAuthClient')
        .factory('soundRecorderFactory', function () {
            const DEFAULT_DURATION = 10;
            return {
                newInstance: newInstance
            };

            function newInstance(duration) {
                duration = duration | DEFAULT_DURATION;
                return {
                    record: record
                };

                function record() {
                    return new Promise(function (resolve, reject) {
                        navigator.device.capture
                            .captureAudio(resolve, reject, {duration: duration});
                    });
                }
            }

        });
})(this);