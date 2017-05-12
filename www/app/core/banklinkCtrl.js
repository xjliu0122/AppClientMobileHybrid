appcontrol.controller('bankCtrl', function($rootScope, $state, $scope, $stateParams, appService, $ionicHistory, $ionicPopover, $ionicModal,
    $ionicScrollDelegate, $ionicLoading, $ionicActionSheet, $cordovaCamera, $cordovaSocialSharing,
    $cordovaGeolocation, $timeout, $ionicPopup, $document) {


    $scope.initBank = function() {


        $scope.linkHandler = Plaid.create({
            env: 'tartan',
            clientName: 'AgileCo',            
            product: ['auth'],
            key: '3d45931dd00ae65265551bfd25d0b3',

            //key: '3d45931dd00ae65265551bfd25d0b3',
            //product: 'connect',
            
            onLoad: function() {
                // The Link module finished loading.
            },
            onSuccess: function(public_token, metadata) {
                // Send the public_token to your app server here.
                // The metadata object contains info about the institution the
                // user selected and the account ID, if selectAccount is enabled.
            },
            onExit: function(err, metadata) {
                // The user exited the Link flow.
                if (err != null) {
                    // The user encountered a Plaid API error prior to exiting.
                }
                // metadata contains information about the institution
                // that the user selected and the most recent API request IDs.
                // Storing this information can be helpful for support.
            }
        });

        $scope.onClick = function(){
           // $scope.linkHandler.open();

           appService.addLinkedAccount("826b9d9682634da308b4b81ea8fa17ee1ac42019f0e359a3710852174ade30b459599483b9d303834088030c26d8a62fbe3e10d7def51ae28171d258814d2de1");
        };
    };

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
