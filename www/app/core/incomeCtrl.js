appcontrol.controller('incomeCtrl', function($rootScope, $state, $scope, $stateParams, appService, $ionicHistory, $ionicPopover, $ionicModal,
    $ionicScrollDelegate, $ionicLoading, $ionicActionSheet, $cordovaCamera, $cordovaSocialSharing,
    $cordovaGeolocation, $timeout, $ionicPopup, $document) {

    $scope.initIncome = function() {
        //getIncomeDocumentFromServer();
        $scope.searchText = "";
        $scope.searchFilter = "";
        $scope.popoverImageSrc = "";
        $scope.docs = [];
        $scope.hasMoreData = true;
        $scope.getSearch = function(search) {
            $scope.searchFilter = search;
        };

        $scope.searchPopover = function($event) {
            $ionicPopover.fromTemplateUrl('./app/common_template/searchTemplate.html', { scope: $scope })
                .then(function(popover) {
                    popover.show($event);
                    var stopListening = $scope.$on('popover.hidden', function() {
                        stopListening();
                        popover.remove();
                    });
                });
        };
        $scope.getIncomeDocumentsRefresh = function() {
            $scope.docs = [];
            $scope.hasMoreData = true;
            var showSpin = false;
            getIncomeDocuments(showSpin, function() {
                $scope.$broadcast('scroll.refreshComplete');
            })

        };
        $scope.getIncomeDocumentsLoad = function() {
            var showSpin = true;
            getIncomeDocuments(showSpin, function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })

        };
        $scope.addIncomeDocument = function($event) {
            $state.go('tabs.incomeAdd');
        };
        // image modal
        $scope.imagePopover = function() {
            $ionicPopover.fromTemplateUrl('./app/common_template/imageModal.html', { scope: $scope })
                .then(function(popover) {
                    $scope.imagePopoverModal = popover;
                    popover.show();
                    var stopListening = $scope.$on('popover.hidden', function() {
                        stopListening();
                        popover.remove();
                    });
                });
        };

        $scope.showImagePopover = function(index) {
            // use index and load from server!!!!
            $scope.popoverImageSrc = "img/images/1.jpg";
            $scope.imagePopover();
        };
        $scope.closeModal = function() {
            $scope.imagePopoverModal.hide();
        };

    };

    function getIncomeDocuments(showSpin, callback) {
        var result = {};
        appService.getDocument(showSpin, "income", $scope.docs.length, function(doc) {
            if (doc.length === 0) $scope.hasMoreData = false;
            $scope.docs = $scope.docs.concat(doc);
            $scope.docs.forEach(function(doc) {

                var date = new Date(doc.created_at);
                doc.date = String(date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            });
            callback();
        });
    };

    function getThumbnail(original) {
        var canvas = document.createElement("canvas");
        var img = new Image();
        img.src = original;
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.width = 100;
        canvas.height = 100;

        return canvas.toDataURL("image/jpeg");
    };
    $scope.initAddIncome = function() {
            $scope.incomeToAdd = { imgURI: "http://cicchettiseattle.com/wp-content/themes/feather13/img/placeholder.png" };
            $scope.incomeToAdd.Date = new Date();


            $scope.takePicture = function() {

                var options = {
                    quality: 20,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    saveToPhotoAlbum: false
                };

                $cordovaCamera.getPicture(options).then(function(imageData) {
                    $scope.incomeToAdd.imgURI = "data:image/jpeg;base64," + imageData;
                    $scope.incomeToAdd.doc = imageData;
                }, function(err) {
                    // An error occured. Show a message to the user
                });
            };

            $scope.uploadIncomeDoc = function() {
                if ($scope.incomeToAdd.doc) {
                    $scope.incomeToAdd.thumb = getThumbnail($scope.incomeToAdd.doc);
                };
                appService.uploadDocument("income", $scope.incomeToAdd);
            }

        }
        // var _news = [{
        //     "id": 8,
        //     "title": "The hysterical laugh determines the control.",
        //     "link": "",
        //     "author": "Peter Vaughn",
        //     "source": "",
        //     "sourceLogo": "img/users/1.jpg",
        //     "publishedDate": new Date(),
        //     "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi",
        //     "image": "img/images/1.jpg",
        //     "likes": [{
        //         "name": "Thomas Tank",
        //         "photo": "img/users/2.jpg"
        //     }, {
        //         "name": "Rupert Bear",
        //         "photo": "img/users/3.jpg"
        //     }, {
        //         "name": "Diana Cahill",
        //         "photo": "img/users/4.jpg"
        //     }, {
        //         "name": "Samuel Ross",
        //         "photo": "img/users/5.jpg"
        //     }, ]



    function getIncomeDocumentFromServer() {
        // var chart = appService.getChartData();
        // $scope.sample = chart.sample;
        // $scope.line_labels = chart.line_labels;
        // $scope.line_data = chart.line_data;
        // $scope.series = chart.series;
        // $scope.doughnut_labels = chart.doughnut_labels;
        // $scope.doughnut_data = chart.doughnut_data;

    }


})
