
           initData();
           // initIntro();
          //  initNews();
            initProfile();
            initDashboard();
          //  initShop();
          //  initChat();
         //   initCalendar();
            initAnimate();


            function initAnimate() {
                function testAnim(x) {
                    $('#animationSandbox').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $(this).removeClass();
                    });
                };

                $(document).ready(function () {
                    $('.js--triggerAnimation').click(function (e) {
                        e.preventDefault();
                        var anim = $('.js--animations').val();
                        testAnim(anim);
                    });

                    $('.js--animations').change(function () {
                        var anim = $(this).val();
                        testAnim(anim);
                    });
                });
            }
            // models
            function initData() {
        
                if (!$rootScope.user){
                    $rootScope.user = {
                        id: "",
                        name: "",  
                        email: "",
                        photo: "",
                        city: "",
                    }
                }
            
                $scope.contacts = appService.getContacts();
                $scope.searchPopover = $ionicPopover.fromTemplate(searchTemplate, {
                    scope: $scope
                });
                $scope.rating = 4;
                $scope.getSearch = function (search) {
                    $scope.searchFilter = search;
                }

                $cordovaGeolocation.getCurrentPosition({ timeout: 10000, enableHighAccuracy: true }).then(
                    function (position) {
                        $rootScope.currentLocation = [position.coords.latitude, position.coords.longitude];
                    });

                $scope.mapCreated = function (map) {
                    $scope.map = map;
                };
                $scope.closeAll = function () {
                    // $scope.closeRegister();
                    // $scope.closeForgot();
                    // $scope.closeLogin();
                };
                $scope.goTo = function (page) {
                    $scope.closeAll();//Close all Modals
                    $state.go(page);
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
                }



                $scope.goBack = function (ui_sref) {
                    var currentView = $ionicHistory.currentView();
                    var backView = $ionicHistory.backView();

                    if (backView) {
                        //there is a back view, go to it
                        if (currentView.stateName == backView.stateName) {
                            //if not works try to go doubleBack
                            var doubleBackView = $ionicHistory.getViewById(backView.backViewId);
                            $state.go(doubleBackView.stateName, doubleBackView.stateParams);
                        } else {
                            backView.go();
                        }
                    } else {
                        $state.go(ui_sref);
                    }
                }

                $scope.signOut = function () {
                    $ionicLoading.show({
                        template: 'Signing out...'
                    });
                    $timeout(function () {
                        $ionicLoading.hide();
                        $scope.goTo('intro');
                    }, 2000);

                }

                if ($state.is('tabs.cards')) {
                    $scope.post = appService.getRandomObject($scope.news.items);
                }

            }



            // profile
            function initProfile() {
                $scope.profile = { type: 1 };
            }

            // dashboard
            function initDashboard() {
                chartData();

                $scope.viewDate = new Date();
                $scope.notifyTimes = ['at set time', '15 mins before', '30 mins before', '45 mins before', 'an hour before'];
                $scope.notifications = appService.getNotifications();
                getDateEvents(moment($scope.viewDate._d).startOf('day')._d);

                $scope.decrementDate = function (item) {
                    if (angular.isUndefined($scope.viewDate._d)) $scope.viewDate = moment($scope.viewDate).startOf('day').subtract(1, 'days');
                    else $scope.viewDate = moment($scope.viewDate._d).startOf('day').subtract(1, 'days');
                    getDateEvents($scope.viewDate._d)
                };

                $scope.incrementDate = function (item) {
                    if (angular.isUndefined($scope.viewDate._d)) $scope.viewDate = moment($scope.viewDate).startOf('day').add(1, 'days');
                    else $scope.viewDate = moment($scope.viewDate._d).startOf('day').add(1, 'day');
                    getDateEvents($scope.viewDate._d)
                };
                function getDateEvents(date) {
                    var range = moment().range(date, moment(date).endOf('day'));
                    $scope.seletedDateEvents = [];
                    angular.forEach($scope.notifications, function (value, key) {
                        if (moment(value.startsAt).within(range)) {
                            $scope.seletedDateEvents.push(value);
                        }
                    });
                }

                if ($state.is('create-edit-reminder')) {
                    $stateParams.reminder !== null ? $scope.reminder = angular.copy($stateParams.reminder) : $scope.reminder = { type: 'Add Task', startsAt: new Date(), endsAt: new Date(), allDay: true, remindTime: [] };
                    $stateParams.type !== null ? $scope.reminder.type = angular.copy($stateParams.type) : null;
                }

                $scope.reminderPopover = $ionicPopover.fromTemplate(reminderTemplate, {
                    scope: $scope
                });

                $ionicModal.fromTemplateUrl('app/dashboard/remind-at-modal.html', {
                    scope: $scope,
                    animation: 'fade-in-scale'
                }).then(function (modal) {

                    $scope.modalRemindAt = modal;
                });
                $scope.openRemindAt = function () {
                    $scope.modalRemindAt.show();
                };
                $scope.closeRemindAt = function () {
                    $scope.modalRemindAt.hide();
                };

                $scope.notifyCheck = function (index, item) {
                    if (angular.isUndefined($scope.reminder.remindTime[index])) {
                        $scope.reminder.remindTime[index] = item;
                    } else {
                        $scope.reminder.remindTime[index] = false;
                    }
                }

                $scope.saveReminder = function () {
                    if ($scope.reminderForm.$valid) {
                        if ($stateParams.reminder === null) {
                            $scope.notifications.push($scope.reminder);
                            $scope.goTo("tabs.reminders");
                        } else {
                            $scope.notifications.splice($scope.notifications.indexOf(_.find($scope.notifications, function (obj) { return obj == $stateParams.reminder })), 1, $scope.reminder);
                        }
                    } else {
                        appService.showAlert('Form Invalid', '<p class="text-center">A title and start date is required</p>', 'Ok', 'button-assertive', null);
                    }
                     
                }



            }