appcontrol.controller('loginCtrl', function($rootScope, $state, $scope, $stateParams, appService,
    $ionicHistory, $ionicPopover, $ionicModal, $ionicScrollDelegate, $ionicLoading, $ionicActionSheet,
    $cordovaCamera, $cordovaSocialSharing, $cordovaGeolocation, $timeout, $ionicPopup, $document, $cordovaOauth) {

    $scope.initIntro = function() {

        $scope.user = {
                signUpName: "",
                signUpEmail: "",
                signupPassword: "",
                singupRPassword: "",
                password: "",
                loginEmail: ""
            },
            $scope.closeAllLogin = function() {
                $scope.closeRegister();
                $scope.closeForgot();
                $scope.closeLogin();
            };
        $scope.signUp = function() {

                if (!$scope.user.signUpEmail) {
                    appService.showAlert("Opps", "Please enter a valid email address.", "Close", 'button-assertive', null);
                    return;
                };
                if ($scope.user.signupPassword.length < 8) {
                    appService.showAlert("Opps", "Password should be at least 8 characters.", "Close", 'button-assertive', null);
                    return;
                };
                var errorCode = null;
                var errorMessage = null;
                $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner>'
                });

                firebase.auth().createUserWithEmailAndPassword($scope.user.signUpEmail, $scope.user.signupPassword).then(
                    function() {
                        firebase.auth().currentUser.sendEmailVerification().then(function() {
                            $ionicLoading.hide();

                            var alertPopup = $ionicPopup.alert({
                                title: "Successful",
                                template: "Email Verification Sent!",
                                buttons: [{ text: "Close", type: 'button-balanced' }]
                            });
                            $timeout(function() {
                                alertPopup.close();
                            }, 1500000);

                            alertPopup.then(function(res) {

                                alertPopup.close();
                                $scope.closeRegister();
                                $scope.user.loginEmail = $scope.user.signUpEmail;
                                $scope.openLogin();

                            });


                        });



                    }).catch(function(error) {
                    errorCode = error.code;

                    $ionicLoading.hide();
                    if (errorCode === "auth/invalid-email") {
                        appService.showAlert("", "Email is not valid", "Close", 'button-assertive', null);
                    } else
                    if (errorCode === "auth/email-already-in-use") {
                        appService.showAlert("", "Email is already in use, please use a different one", "Close", 'button-assertive', null);
                    } else
                    if (errorCode === "auth/weak-password") {
                        appService.showAlert("", "Please use a stronger password", "Close", 'button-assertive', null);
                    } else {
                        appService.showAlert("", "Registration failed, please retry", "Close", 'button-assertive', null);
                    }
                });
            },


            // Login modal
            $ionicModal.fromTemplateUrl('app/intro/login.html', {
                scope: $scope,
                animation: 'fade-in-scale',
                backdropClickToClose: false
            }).then(function(modal) {
                $scope.modalLogin = modal;
            });
        $scope.openLogin = function() {
            $scope.modalLogin.show();
        };
        $scope.closeLogin = function() {
            $scope.modalLogin.hide();
        };

        // Login logics. 
        $scope.loginPassword = function() {


            if ((!$scope.user.loginEmail) || ($scope.user.loginEmail.length < 4)) {
                appService.showAlert("Opps", "Please enter a valid email address.", "Close", 'button-assertive', null);
                return;
            }
            if ($scope.user.password.length < 4) {
                appService.showAlert("Opps", "Please enter a password.", "Close", 'button-assertive', null);
                return;
            }
            // Sign in with email and pass.
            // [START authwithemail]
            firebase.auth().signInWithEmailAndPassword($scope.user.loginEmail, $scope.user.password).then(function() {

                if (firebase.auth().currentUser.emailVerified || firebase.auth().currentUser.providerData[0].providerId != "password") {
                    $scope.closeAllLogin();
                } else {
                    appService.showAlert("Opps", "This email has not been verified.", "Close", 'button-assertive', null);
                }

            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/wrong-password') {
                    appService.showAlert("Opps", "Please check the username and password and try again.", "Close", 'button-assertive', null);
                } else
                if (errorCode === "auth/invalid-email") {
                    appService.showAlert("", "Email is not valid", "Close", 'button-assertive', null);
                } else if (errorCode === "auth/user-not-found") {

                    appService.showAlert("Opps", "Please check the username and password and try again.", "Close", 'button-assertive', null);
                } else {
                    appService.showAlert("Opps", errorMessage, "Close", 'button-assertive', null);

                }
                console.log(error);

                // [END_EXCLUDE]
            });


            // [END authwithemail]

        };

        $scope.facebookSignIn = function() {
            //facebook
            $scope.closeAllLogin();
            if (ionic.Platform.isWebView()) {
                $cordovaOauth.facebook("1647428162233139", ["email", "public_profile"], { redirect_uri: "http://localhost/callback" })
                    .then(function(result) {
                        var credential = firebase.auth.FacebookAuthProvider.credential(result.access_token);
                        firebase.auth().signInWithCredential(credential);
                    }).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // [START_EXCLUDE]
                        if (errorCode === 'auth/account-exists-with-different-credential') {
                            appService.showAlert("Opps", "You have already signed up with a different auth provider for that email.", "Close", 'button-assertive', null);
                            // If you are using multiple auth providers on your app you should handle linking
                            // the user's accounts here.
                        } else {
                            console.error(error);
                        }
                        // [END_EXCLUDE]
                    })
            } else {
                var provider = new firebase.auth.FacebookAuthProvider();

                //provider.addScope('');

                // [START signin]
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;

                    //call server 


                }).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // [START_EXCLUDE]
                    if (errorCode === 'auth/account-exists-with-different-credential') {
                        appService.showAlert("Opps", "You have already signed up with a different auth provider for that email.", "Close", 'button-assertive', null);

                        // If you are using multiple auth providers on your app you should handle linking
                        // the user's accounts here.


                    } else {
                        console.error(error);
                    }

                });
            }

        };
        // Sign up modal
        $ionicModal.fromTemplateUrl('app/intro/signup.html', {
            scope: $scope,
            animation: 'fade-in-scale',
            backdropClickToClose: false
        }).then(function(modal) {
            $scope.modalRegister = modal;
        });
        $scope.openRegister = function() {
            $scope.modalRegister.show();
        };
        $scope.closeRegister = function() {
            $scope.modalRegister.hide();
        };

        // Forgot Password modal
        $ionicModal.fromTemplateUrl('app/intro/forgot.html', {
            scope: $scope,
            animation: 'fade-in-scale',
            backdropClickToClose: false
        }).then(function(modal) {
            $scope.modalForgot = modal;
        });
        $scope.openForgot = function() {
            $scope.modalForgot.show();
        };
        $scope.closeForgot = function() {
            $scope.modalForgot.hide();
        };


        $scope.uploadUserPhoto = function() {
            $ionicActionSheet.show({
                buttons: [{
                    text: 'Take Picture'
                }, {
                    text: 'Select From Gallery'
                }],
                buttonClicked: function(index) {
                    switch (index) {
                        case 0: // Take Picture
                            document.addEventListener("deviceready", function() {
                                $cordovaCamera.getPicture(appService.getCameraOptions()).then(function(imageData) {
                                    alert(imageData);
                                    $rootScope.user.photo = "data:image/jpeg;base64," + imageData;
                                }, function(err) {
                                    appService.showAlert('Error', err, 'Close', 'button-assertive', null);
                                });
                            }, false);

                            break;
                        case 1: // Select From Gallery
                            document.addEventListener("deviceready", function() {
                                $cordovaCamera.getPicture(appService.getLibraryOptions()).then(function(imageData) {
                                    $rootScope.user.photo = "data:image/jpeg;base64," + imageData;
                                }, function(err) {
                                    appService.showAlert('Error', err, 'Close', 'button-assertive', null);
                                });
                            }, false);
                            break;
                    }
                    return true;
                }
            });
        };

    }
})
