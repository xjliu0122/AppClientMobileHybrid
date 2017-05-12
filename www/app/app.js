angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
})
.run(function($ionicPlatform, appService) {
    firebase.initializeApp(appService.getFirebaseConfig());    
    $ionicPlatform.ready(function() {

        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            // $cordovaKeyboard.hideAccessoryBar(true);
             cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.hide();
        }
    });
});