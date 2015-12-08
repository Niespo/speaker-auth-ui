(function (global) {

    global
        .angular
        .module('speakerAuthClient')
        .factory('soundRecorderFactory', function () {
            const DEFAULT_SAMPLE_RATE = 44100;
            return {
                newInstance: newInstance
            };

            function newInstance() {
                const recorder = new martinescu.Recorder('/aaaD-record.wav', {sampleRate: DEFAULT_SAMPLE_RATE}, function (data) {
                    console.log('st')
                    console.log(data)
                }, function (error) {
                    console.log('dddd')
                    console.log(error)
                });
                return {
                    record: recorder.record,
                    stop: stop
                };

                function stop() {
                    return new Promise(function (resolve, reject) {
                        recorder.stop(onStop);
                        function onStop(results) {
                            recorder.release();
                            resolve(results[0]);
                        }
                    });
                }
            }

        });
})(this);