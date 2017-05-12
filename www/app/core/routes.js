angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('tabs', {
        url: '/tabs',
        templateUrl: 'app/core/sidemenu.html',
        abstract: true
      })

      //Dashboard
      .state('tabs.dashboard', {
        url: '/dashboard',
        views: {
          'menuContent': {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'dashboardCtrl'
          }
        }
      })


      .state('tabs.income', {
        url: '/income',
        views: {
          'menuContent': {
            templateUrl: 'app/income/income.html',
            controller: 'incomeCtrl'
          }
        }
      })
      //
      .state('tabs.expense', {
        url: '/expense',
        views: {
          'menuContent': {
            templateUrl: 'app/expense/expense.html',
            controller: 'expenseCtrl'
          }
        }
      })
      .state('tabs.bank', {
        url: '/bank',
        views: {
          'menuContent': {
            templateUrl: 'app/banklink/banklink.html',
            controller: 'bankCtrl'
          }
        }
      })
     .state('tabs.incomeAdd', {
        url: '/addIncome',   
         views: {
            'menuContent': {
              templateUrl: 'app/income/addIncome.html',
              controller: 'incomeCtrl'
            }
          }
      })
      .state('tabs.reminders', {
        url: '/reminders',
        views: {
          'menuContent': {
            templateUrl: 'app/dashboard/reminders.html',
            controller: 'appCtrl'
          }
        }
      })

      .state('create-edit-reminder', {
        url: '/create-edit-reminder',
        params: { reminder: null, type: null },
        templateUrl: 'app/dashboard/create-edit-reminder.html',
        controller: 'appCtrl'
      })

 

      .state('authentication', {
        url: '/authentication',
        templateUrl: 'app/intro/authentication.html',
        controller: 'loginCtrl',
      })
      .state('intro', {
        url: '/intro',
        templateUrl: 'app/intro/intro.html',
      })

    $urlRouterProvider.otherwise('/authentication')



  })

  .config(function ($ionicConfigProvider, calendarConfig, ChartJsProvider) {

    // $ionicConfigProvider.tabs.style('standard').position('top');
    // $ionicConfigProvider.navBar.alignTitle('center');

    ChartJsProvider.setOptions({ colours: ['#26a69a', '#29b6f6', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });

    calendarConfig.titleFormats.week = 'MMMM';
    calendarConfig.dateFormatter = 'moment';
    calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';
    calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM';
    calendarConfig.i18nStrings.weekNumber = 'Week {week}';
    calendarConfig.dateFormats.weekDay = 'ddd';
    calendarConfig.dateFormats.day = 'D';
    calendarConfig.displayAllMonthEvents = true;
    calendarConfig.displayEventEndTimes = true;
  })

//Uncomment to add styling to sliding box page buttons
  // .config(function ($provide) {
  //           $provide.decorator('ionPagerDirective', function ($delegate) {
  //               var directive = $delegate[0];
  //               var template = directive.template;
  //               directive.template = '<div class="slider-pager"><span class="slider-pager-page" ng-repeat="slide in numSlides() track by $index" ng-class="{active: $index == currentSlide}" ng-click="pagerClick($index)"><i class="icon ion-record" ng-show="$index !== currentSlide"></i><img class="slider-pager-img" src="img/dot_active.png" ng-show="$index == currentSlide"/></span></div>';


  //               return $delegate;
  //           });
  //       })