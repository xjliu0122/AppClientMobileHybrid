(function() {

    'use strict'

    angular.module('app.services', [])

    .service('appService', ['$state', '$ionicPopup', '$ionicActionSheet', '$ionicHistory', '$ionicLoading', '$timeout', '$http',
        function($state, $ionicPopup, $ionicActionSheet, $ionicHistory, $ionicLoading, $timeout, $http) {
            //global data                

            var currentUser = {};
            var Loading = function(params) {
                    if (params === 'show') {
                        $ionicLoading.show({
                            template: '<ion-spinner></ion-spinner>'
                        });
                    } else {
                        $ionicLoading.hide();
                    }
                }
                //service logic
            return {
                getFirebaseConfig: function() {
                    return {
                        apiKey: "AIzaSyBxuKImRdb7-VRScgwZYjpfEmc9sgBSlqg",
                        authDomain: "agileacc-1488095635682.firebaseapp.com",
                        databaseURL: "https://agileacc-1488095635682.firebaseio.com/",
                        storageBucket: "agileacc-1488095635682.appspot.com"
                            // messagingSenderId: "<SENDER_ID>",
                    };
                },
                getGlobalConfig: function() {
                    return {
                        userSrvURL: "http://192.168.1.221:3000/api/",
                        serviceURL: "http://192.168.1.221:3000/api/"
                    };
                },
                getHttpHeader: function() {
                    var header = {};
                    header["Content-Type"] = "application/json";
                    header["x-access-token"] = currentUser.accessToken;
                    header["x-uid"] = currentUser.uid;
                    return header;
                },
                setUserInfo: function(user) {
                    if (user) {
                        currentUser.displayName = (user.displayName) ? user.displayName : null;
                        currentUser.email = user.email;
                        currentUser.emailVerified = user.emailVerified;
                        currentUser.photoURL = (user.photoURL) ? user.photoURL : null;
                        currentUser.uid = user.uid;
                        currentUser.providerData = (user.providerData) ? user.providerData : null;
                        if (currentUser.providerData) {
                            currentUser.photoURL = currentUser.providerData[0].photoURL;
                            currentUser.displayName = currentUser.providerData[0].displayName;
                        };
                    } else {
                        currentUser = {};
                    }
                },
                setUserAccessToken: function(token) {
                    currentUser.accessToken = token;
                },
                getUserInfo: function(user) {
                    return currentUser;
                },
                getUserFromServer(callback) {
                    var url = this.getGlobalConfig().userSrvURL + 'user';
                    var uid = currentUser.uid;
                    var headers = this.getHttpHeader();
                    $http({
                        method: "GET",
                        url: url,
                        headers: headers
                    }).success(function(res) {
                        var data = res.data;
                        callback(false);

                    }).error(function(res) {
                        if (res) {
                            callback(true);
                        }
                    })
                },
                createUserInServer: function() {
                    var url = this.getGlobalConfig().userSrvURL + 'user';
                    var userData = JSON.stringify(currentUser);
                    var headers = this.getHttpHeader();
                    $http({
                        method: "POST",
                        url: url,
                        headers: headers,
                        data: userData
                    }).then(function(result) {
                        // status
                        // statusText

                    });

                },
                uploadDocument: function(type, doc) {
                    Loading('show');
                    var url = this.getGlobalConfig().serviceURL + 'document';
                    var headers = this.getHttpHeader();
                    $http({
                        method: "PUT",
                        url: url,
                        headers: headers,
                        data: {
                            type: type,
                            data: doc.doc,
                            thumbnail: doc.thumb,
                            comment: doc.comment,
                            location: doc.location === null ? doc.location.formatted_address: null,
                        }
                    }).then(function(result) {
                        Loading('hide');
                        $ionicHistory.goBack();
                    });

                },
                getDocument: function(showSpin, type, skip, func) {
                    if (showSpin) Loading('show');
                    var url = this.getGlobalConfig().serviceURL + 'document';
                    var headers = this.getHttpHeader();
                    $http({
                        method: "GET",
                        url: url,
                        headers: headers,
                        params: {
                            type: type,
                            skip: skip
                        }
                    }).then(function(result) {
                        func(result.data.result);
                        if (showSpin) Loading('hide');

                    });

                },
                addLinkedAccount: function(token) {
                    Loading('show');
                    var url = this.getGlobalConfig().serviceURL + 'LinkedAccount';
                    var headers = this.getHttpHeader();
                    $http({
                        method: "POST",
                        url: url,
                        headers: headers,
                        data: {
                            publicToken: token
                        }
                    }).then(function(result) {
                        Loading('hide');
                    }).catch(function(err) {
                        Loading('hide');
                    });

                },
                KeepKeyboardOpen: function(params) {
                    var txtInput = angular.element(document.body.querySelector(params));
                    txtInput.one('blur', function() {
                        txtInput[0].focus();
                    });
                },
                showAlert: function(title, text, buttonText, buttonType, page) {
                    var alertPopup = $ionicPopup.alert({

                        template: text,
                        buttons: [{ text: buttonText, type: buttonType }]
                    });
                    $timeout(function() {
                        alertPopup.close();
                    }, 1500000);

                    alertPopup.then(function(res) {
                        page != null ? $state.go(page) : '';
                        alertPopup.close();
                    });
                },
                getGreetingTime: function(m) {
                    var g = null;

                    if (!m || !m.isValid()) {
                        return;
                    } //if we can't find a valid or filled moment, we return.

                    var split_afternoon = 12 //24hr time to split the afternoon
                    var split_evening = 17 //24hr time to split the evening
                    var currentHour = parseFloat(m.format("HH"));

                    if (currentHour >= split_afternoon && currentHour <= split_evening) {
                        g = "Good Afternoon";
                    } else if (currentHour >= split_evening) {
                        g = "Good Evening";
                    } else {
                        g = "Good Morning";
                    }
                    return g;
                },
                getCameraOptions: function() {
                    return {
                        quality: 80,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        encodingType: Camera.EncodingType.JPEG,
                        saveToPhotoAlbum: true,
                        correctOrientation: true,
                    };
                },
                getLibraryOptions: function() {
                    return {
                        quality: 80,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                        encodingType: Camera.EncodingType.JPEG,
                        saveToPhotoAlbum: false,
                        correctOrientation: true,
                    };
                },
                getChartData: function() {
                    return {
                        sample: true,
                        line_labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                        line_data: [
                            [65, 59, 80, 81, 56, 55, 40],
                            [28, 48, 40, 19, 86, 27, 90]
                        ],
                        series: ['Series A', 'Series B'],

                        doughnut_labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
                        doughnut_data: [300, 500, 100]
                    }
                }
            }
        }
    ]);
})();
