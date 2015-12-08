(function (global) {

    global
        .angular
        .module('speakerAuthClient')
        .factory('speakerApiConsumer', ['$http', speakerApiConsumer]);

    function speakerApiConsumer($http) {
        const DEFAULT_ENDPOINT = '10.0.3.2',
            DEFAULT_PORT = '8080';


        return {
            identityFromBlob: identityFromBlob
        };

        function identityFromBlob(fileName, blob) {
            var formData = new FormData();
            formData.append("voice", blob, fileName);

            return new Promise(function (resolve, reject) {
                console.log('Sending...')
                $http({
                    method: 'POST',
                    url: getUri('recognize/best'),
                    data: formData,
                    headers: {'Content-Type': undefined},
                    transformRequest: function (data, headersGetterFunction) {
                        return formData;
                    }
                }).then(function (response) {
                    console.log(response);
                    resolve(response);
                }, function (error) {
                    reject(error);
                });
            });
        }

        function getUri(path) {
            return 'http://' + DEFAULT_ENDPOINT + ':' + DEFAULT_PORT + '/' + path
        }
    }

})(this);