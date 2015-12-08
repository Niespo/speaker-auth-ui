(function (global) {

    global
        .angular
        .module('speakerAuthClient')
        .directive('recognitionView', recognitionView);

    function recognitionView() {
        return {
            templateUrl: 'js/components/recognition/recognition-view.html',
            controller: ['$scope', '$ionicPlatform', 'soundRecorderFactory', 'speakerApiConsumer', 'fileReaderFactory', 'fileLoaderFactory', RecognitionViewController]
        };

        function RecognitionViewController($scope, $ionicPlatform, soundRecorderFactory, speakerApiConsumer, fileReaderFactory, fileLoaderFactory) {
            $scope.cordova = {loaded: false};
            $scope.recognize = recognize;

            $scope.$on('$ionicView.enter', onIonicEnter);
            $ionicPlatform.ready(onIonicReady);

            function recognize() {
                soundRecorderFactory
                    .newInstance()
                    .record()
                    .then(function (files) {
                        const filePath = files[0].localURL;
                        sendFile(filePath)
                    });

                function sendFile(uri) {
                    fileLoaderFactory.newInstance()
                        .load(uri)
                        .then(function (file) {
                            return fileReaderFactory.newInstance().read(file)
                        })
                        .then(function (result) {
                            return speakerApiConsumer.identityFromBlob(result.name, new Blob([result.buffer], {"type": 'audio/3gp'}))
                        })
                        .then(function (data) {
                            console.log(data);
                        })
                        .catch(function (error) {
                            console.log(error)
                        });
                }
            }

            function onIonicEnter() {
                console.log('recognition-view enter');
            }

            function onIonicReady() {
                $scope.$evalAsync(function () {
                    $scope.cordova.loaded = true;
                });
            }
        }
    }

})(this);