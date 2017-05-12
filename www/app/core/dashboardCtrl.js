appcontrol.controller('dashboardCtrl', function($rootScope, $state, $scope, $stateParams, appService, $ionicHistory, $ionicPopover, $ionicModal,
    $ionicScrollDelegate, $ionicLoading, $ionicActionSheet, $cordovaCamera, $cordovaSocialSharing,
    $cordovaGeolocation, $timeout, $ionicPopup, $document) {

    $scope.initDash = function() {
        getChartData();
    };



    function getChartData() {
        var chart = appService.getChartData();
        $scope.sample = chart.sample;
        $scope.line_labels = chart.line_labels;
        $scope.line_data = chart.line_data;
        $scope.series = chart.series;
        $scope.doughnut_labels = chart.doughnut_labels;
        $scope.doughnut_data = chart.doughnut_data;

    }


})
