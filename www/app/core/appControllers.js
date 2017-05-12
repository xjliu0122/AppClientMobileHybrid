'use strict'

var appcontrol = angular.module('app.controllers', [
    'mwl.calendar',
    'angularMoment',
    'ion-affix',
    'ngCordova',
    'monospaced.elastic',
    'ngLodash',
    'ion-datetime-picker',
    'ion-google-place',
    'chart.js',
    'ngCordovaOauth'

]);
appcontrol.controller('appCtrl', function($rootScope, $state, $scope, $stateParams, appService, $ionicHistory, $ionicPopover, $ionicModal,
    $ionicScrollDelegate, $ionicLoading, $ionicActionSheet, $cordovaCamera, $cordovaSocialSharing, $cordovaGeolocation, $timeout) {
    $scope.initializeApp = function() {
        // Init firebase lib
        // init Animation;
        (function initAnimate() {
            function testAnim(x) {
                $('#animationSandbox').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).removeClass();
                });
            };

            $(document).ready(function() {
                $('.js--triggerAnimation').click(function(e) {
                    e.preventDefault();
                    var anim = $('.js--animations').val();
                    testAnim(anim);
                });

                $('.js--animations').change(function() {
                    var anim = $(this).val();
                    testAnim(anim);
                });
            });
        })();

        //get local storage.

        firebase.auth().onAuthStateChanged(function(user) {
                if (user && ((user.emailVerified) || firebase.auth().currentUser.providerData[0].providerId != "password")) {
                    // User is signed in.  // this is for testing web based UI. 

                    appService.setUserInfo(user);
                    $scope.user = appService.getUserInfo();
                    firebase.auth().currentUser.getToken().then(function(idToken) {
                        appService.setUserAccessToken(idToken);
                        appService.getUserFromServer(function(create) {
                            if (create) {
                                appService.createUserInServer();
                            } else {

                                $state.go("tabs.dashboard");

                            }
                        });
                    })

                } else {
                    // User is signed out.
                    $state.go("authentication");
                    //write signout logic. 
                }

            }),
            $scope.signOut = function() {

                $scope.showSpinner();
                $timeout(function() {
                    $ionicLoading.hide();
                    firebase.auth().signOut();
                    appService.setUserInfo(null);
                    $scope.user = {};
                }, 1000);
            },
            $scope.showSpinner = function() {
                $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner>'
                });
            },
            $scope.goTo = function(page) {
                //$scope.closeAll();//Close all Modals
                $state.go(page);
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
            }

    }


})



moment.locale('en', {
    calendar: {
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow, ] dddd Do MMM',
        lastWeek: '[Last] dddd Do MMM',
        nextWeek: 'dddd Do MMM',
        sameElse: 'L'
    }
})

var searchTemplate =
    '<ion-popover-view class="search">' +
    '<ion-content scroll="false">' +
    '<div class="list item-input-inset">' +
    '<label class="item-input-wrapper">' +
    '<i class="icon ion-ios-search placeholder-icon"></i>' +
    '<input type="search" placeholder="Search" ng-model="schoolSearch" ng-model-options="{ debounce: 550 }" ng-change="getSearch(schoolSearch)"></label>' +
    ' <i class="icon ion-close" ng-show="schoolSearch" ng-click="getSearch(\'\');popover.hide($event);schoolSearch=\'\'"></i>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';
var contactTemplate =
    '<ion-popover-view class="right large">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-avatar item-text-wrap" ng-click="contactPopover.hide($event);"ng-repeat="contact in contacts" ui-sref="tabs.chat({chat: contact})">' +
    '<img ng-src="{{contact.photo}}">' +
    '<h2 class="dark font-thin">{{contact.name}}</h2>' +
    '<p class="dark font-thin">{{contact.subject}}</p>' +
    '</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';

var newsTemplate =
    '<ion-popover-view class="medium right">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-icon-left item-text-wrap" ng-click="newsPopover.hide($event);">' +
    '<i class="icon ion-ios-paper-outline"></i>Share Item' +
    '</div>' +
    '<div class="item item-icon-left item-text-wrap" ng-click="newsPopover.hide($event);">' +
    '<i class="icon ion-ios-camera-outline"></i>Share Photo' +
    '</div>' +
    '<div class="item item-icon-left item-text-wrap" ng-click="newsPopover.hide($event);">' +
    '<i class="icon ion-ios-bell-outline"></i>Share Event' +
    '</div>' +
    '<div class="item item-icon-left item-text-wrap" ng-click="newsPopover.hide($event);">' +
    '<i class="icon ion-ios-musical-notes"></i>Share Voicenote' +
    '</div>' +
    '<div class="item item-icon-left item-text-wrap" ng-click="newsPopover.hide($event);">' +
    '<i class="icon ion-ios-location-outline"></i>Share Location' +
    '</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';

var reminderTemplate =
    '<ion-popover-view class="small center">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-text-wrap padding item-icon-left" ng-click="reminderPopover.hide($event);" ui-sref="create-edit-reminder({reminder: null, type: \'Add Call\'})"><i class="icon ion-ios-telephone-outline"></i>Add Call</div>' +
    '<div class="item item-text-wrap padding item-icon-left" ng-click="reminderPopover.hide($event);" ui-sref="create-edit-reminder({reminder: null, type: \'Add Email\'})"><i class="icon ion-ios-at"></i>Add Email</div>' +
    '<div class="item item-text-wrap padding item-icon-left" ng-click="reminderPopover.hide($event);" ui-sref="create-edit-reminder({reminder: null, type: \'Add Task\'})"><i class="icon ion-ios-checkmark-outline"></i>Add Task</div>' +
    '<div class="item item-text-wrap padding item-icon-left" ng-click="reminderPopover.hide($event);" ui-sref="create-edit-reminder({reminder: null, type: \'Add Event\'})"><i class="icon ion-ios-calendar-outline"></i>Add Event</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';

var customerTemplate =
    '<ion-modal-view class="ion-modal">' +
    '<ion-header-bar>' +
    '<h1 class="title">{{product.name}}</h1>' +
    '<button class="button button-icon icon ion-android-close" ng-click="closeModalCustomer();"></button>' +
    '</ion-header-bar>' +
    '<ion-content class="padding shop">' +
    '<label class="item item-input item-select">' +
    '<div class="input-label">Size:</div>' +
    '<select ng-options="size for size in sizes" ng-model="product.size"><option value="">Select Size</option> </select>' +
    '</label>' +
    '<label class="item item-input">' +
    '<span class="input-label">Amount:</span>' +
    '<input type="number" ng-model="product.amount">' +
    '</label>' +
    '<button class="button waves-effect waves-teal button-balanced button-outline button-block" ng-click="addToCartComplete(product);">Save</button>' +
    '</ion-content>' +
    '</ion-modal-view>';
