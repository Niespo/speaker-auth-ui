(function (global) {
    global
        .angular
        .module('speakerAuthClient')
        .factory('fileReaderFactory', [fileReaderFactory]);

    function fileReaderFactory() {

        return {
            newInstance: newInstance
        };

        function newInstance() {
            return {
                read: read
            };

            function read(file) {
                console.log('Trying read file: ' + file.name + ' with size: ' + file.size);
                return new Promise(function (resolve, reject) {
                    const reader = new FileReader();
                    reader.onloadend = function (evt) {
                        resolve({name: file.name, buffer: evt.target.result});
                    };
                    reader.onerror = reject;
                    reader.readAsArrayBuffer(file);
                });
            }
        }
    }
})(this);
