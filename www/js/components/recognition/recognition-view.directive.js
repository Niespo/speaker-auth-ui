(function (global) {

    global
        .angular
        .module('speakerAuthClient')
        .directive('recognitionView', recognitionView);

    function recognitionView() {
        return {
            templateUrl: 'js/components/recognition/recognition-view.html',
            controller: ['$scope', '$ionicPlatform', 'soundRecorderFactory', 'speakerApiConsumer', RecognitionViewController]
        };

        function RecognitionViewController($scope, $ionicPlatform, soundRecorderFactory, speakerApiConsumer) {
            $scope.cordova = {loaded: false};
            $scope.recognize = recognize;

            $scope.$on('$ionicView.enter', onIonicEnter);
            $ionicPlatform.ready(onIonicReady);

            function recognize() {
                console.log('recognize');

                soundRecorderFactory
                    .newInstance()
                    .record()
                    .then(function (files) {
                        const filePath = files[0].localURL;

                        getFile(filePath)

                    })

                function getFile(uri) {
                    window.resolveLocalFileSystemURI(uri, resolveOnSuccess, resOnError);
                    console.log('dupa');
                    console.log(entry)
                    function resolveOnSuccess(entry) {
                        entry.file(function (file) {
                            console.log(file)
                            var reader = new FileReader();
                            reader.onloadend = function (evt) {

                                speakerApiConsumer.identityFromBlob(file.name, new Blob([evt.target.result], {"type": 'audio/3gp'}))
                                    .then(function (data) {
                                        console.log(data);
                                    }, function (error) {
                                        console.log(error)
                                    });
                            };
                            reader.readAsArrayBuffer(file);
                        }, resOnError);
                    }

                    function resOnError(error) {
                        console.log(error);

                    }
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