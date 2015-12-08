(function (global) {
    global
        .angular
        .module('speakerAuthClient')
        .factory('fileLoaderFactory', [fileLoaderFactory]);

    function fileLoaderFactory() {

        return {
            newInstance: newInstance
        };

        function newInstance() {
            return {
                load: load
            };

            function load(uri) {
                console.log('Trying load file: ' + uri);
                return new Promise(function (resolve, reject) {
                    window.resolveLocalFileSystemURL(uri, resolveOnSuccess, resOnError);
                    function resolveOnSuccess(entry) {
                        entry.file(function (file) {
                            resolve(file);
                        }, resOnError);
                    }

                    function resOnError(error) {
                        reject(error);
                    }
                });
            }
        }
    }
})(this);