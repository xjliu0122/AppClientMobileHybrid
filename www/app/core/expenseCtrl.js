appcontrol.controller('expenseCtrl', function($rootScope, $state, $scope, $stateParams, appService, $ionicHistory, $ionicPopover, $ionicModal,
    $ionicScrollDelegate, $ionicLoading, $ionicActionSheet, $cordovaCamera, $cordovaSocialSharing,
    $cordovaGeolocation, $timeout, $ionicPopup, $document) {

    $scope.initExpense = function() {
        //getIncomeDocumentFromServer();
        $scope.searchText = "";
        $scope.searchFilter = "";
        $scope.popoverImageSrc = "";

        $scope.getSearch = function(search) {
            $scope.searchFilter = search;
        }


        $scope.searchPopover = function($event) {
                $ionicPopover.fromTemplateUrl('./app/common_template/searchTemplate.html', { scope: $scope })
                    .then(function(popover) {
                        popover.show($event);
                        var stopListening = $scope.$on('popover.hidden', function() {
                            stopListening();
                            popover.remove();
                        });
                    });
            }
            

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
            }
  
        $scope.showImagePopover = function(index) {
            // use index and load from server!!!!
            $scope.popoverImageSrc = "img/images/1.jpg";
            $scope.imagePopover();
        }
        $scope.closeModal = function() {

            $scope.imagePopoverModal.hide();

        }

    };
    var _news = [{
        "id": 8,
        "title": "The hysterical laugh determines the control.",
        "link": "",
        "author": "Peter Vaughn",
        "source": "",
        "sourceLogo": "img/users/1.jpg",
        "publishedDate": new Date(),
        "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi",
        "image": "img/images/1.jpg",
        "likes": [{
            "name": "Thomas Tank",
            "photo": "img/users/2.jpg"
        }, {
            "name": "Rupert Bear",
            "photo": "img/users/3.jpg"
        }, {
            "name": "Diana Cahill",
            "photo": "img/users/4.jpg"
        }, {
            "name": "Samuel Ross",
            "photo": "img/users/5.jpg"
        }, ]
    }, {
        "id": 2,
        "title": "The decisive group obtains the steel.",
        "link": "",
        "author": "Rupert Bear",
        "source": "Daily Times",
        "sourceLogo": "img/users/2.jpg",
        "publishedDate": new Date(),
        "summary": "Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.",
        "image": "img/images/2.jpg",
        "comments": [{
            "name": "Rupert Bear",
            "photo": "img/users/2.jpg",
            "text": "The sugar relateds the gold.",
            "publishedDate": new Date(),
        }, {
            "name": "Diana Cahill",
            "photo": "img/users/5.jpg",
            "text": "The sweltering system experiments the shade.",
            "publishedDate": new Date(),
        }, {
            "name": "Samuel Ross",
            "photo": "img/users/3.jpg",
            "text": "The cute connection records the learning.",
            "publishedDate": new Date(),
        }, ]
    }, {
        "id": 3,
        "title": "The abandoned number commences the invention.",
        "link": "",
        "author": "Thomas Tank",
        "source": "Evening Standard",
        "sourceLogo": "img/users/2.jpg",
        "publishedDate": new Date(),
        "summary": "Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        "image": "img/images/3.jpg",
        "likes": [{
            "name": "Rupert Bear",
            "photo": "img/users/3.jpg"
        }, {
            "name": "Diana Cahill",
            "photo": "img/users/4.jpg"
        }, {
            "name": "Samuel Ross",
            "photo": "img/users/5.jpg"
        }, ],
    }, {
        "id": 4,
        "title": "The pull articulates the limit.",
        "link": "",
        "author": "Steven Spruse",
        "source": "Business News",
        "sourceLogo": "img/users/4.jpg",
        "publishedDate": new Date(),
        "summary": "Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices.",
        "image": "img/images/4.jpg",
        "comments": [{
            "name": "Thomas Tank",
            "photo": "img/users/2.jpg",
            "text": "The true guide demonstrates the protest.",
            "publishedDate": new Date(),
        }, {
            "name": "Rupert Bear",
            "photo": "img/users/3.jpg",
            "text": "The act filters the idea.",
            "publishedDate": new Date(),
        }, {
            "name": "Samuel Ross",
            "photo": "img/users/4.jpg",
            "text": "The loud industry contracts the fight.",
            "publishedDate": new Date(),
        }, ]
    }, {
        "id": 5,
        "title": "The heat builts the exchange.",
        "link": "",
        "author": "Diana Cahill",
        "source": "Forbes",
        "sourceLogo": "img/users/4.jpg",
        "publishedDate": new Date(),
        "summary": "Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam",
        "image": "img/images/5.jpg",
        "likes": [{
            "name": "Thomas Tank",
            "photo": "img/users/2.jpg"
        }, {
            "name": "Rupert Bear",
            "photo": "img/users/1.jpg"
        }, {
            "name": "Samuel Ross",
            "photo": "img/users/3.jpg"
        }, ],
        "comments": [{
            "name": "Thomas Tank",
            "photo": "img/users/3.jpg",
            "text": "The jolly destruction gauges the canvas.",
            "publishedDate": new Date()
        }, {
            "name": "Rupert Bear",
            "photo": "img/users/2.jpg",
            "text": "The doubt enters the mere size.",
            "publishedDate": new Date()
        }, {
            "name": "Samuel Ross",
            "photo": "img/users/5.jpg",
            "text": "The loud industry contracts the fight.",
            "publishedDate": new Date()
        }, ]
    }, {
        "id": 6,
        "title": "The memory attends the vengeful company.",
        "link": "",
        "author": "Samuel Ross",
        "source": "Daily Planet",
        "sourceLogo": "img/users/4.jpg",
        "publishedDate": new Date(),
        "summary": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue.",
        "image": "img/images/6.jpg"
    }, {
        "id": 7,
        "title": "The top strategizes the proud part.",
        "link": "",
        "author": "Hazel Bradley",
        "source": "Daily Bugle",
        "sourceLogo": "img/users/5.jpg",
        "publishedDate": new Date(),
        "summary": "Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi.",
        "image": "img/images/7.jpg",
        "likes": [{
            "name": "Thomas Tank",
            "photo": "img/users/3.jpg",
        }, {
            "name": "Rupert Bear",
            "photo": "img/users/2.jpg"
        }, {
            "name": "Samuel Ross",
            "photo": "img/users/1.jpg"
        }, ],
        "comments": [{
            "name": "Thomas Tank",
            "photo": "img/users/2.jpg",
            "text": "The gaping fold submits the stage.",
            "publishedDate": new Date()
        }, {
            "name": "Rupert Bear",
            "photo": "img/users/1.jpg",
            "text": "The fat curve adjusts the butter.",
            "publishedDate": new Date()
        }, {
            "name": "Samuel Ross",
            "photo": "img/users/3.jpg",
            "text": "The attraction augments the spiffy memory.",
            "publishedDate": new Date()
        }, ]
    }];
    $scope.news = {
        type: 'classic',
        items: _news
    }

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
