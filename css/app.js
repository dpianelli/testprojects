(function () {

        angular.module('app', ['firebase', 'angular-md5', 'ui.router', 'ui.bootstrap', 'angular-loading-bar']);

        app.config(['$logProvider', '$stateProvider', '$urlRouterProvider', function ($logProvider, $stateProvider, $urlRouterProvider) {

                    $logProvider.debugEnabled(true);
                    $urlRouterProvider.otherwise('/');

                    $stateProvider
                        .state('home', {
                            url: '/',
                            templateUrl: 'home/home.html',
                            controller: 'HomeController',
                            controllerAs: 'home',
                            resolve: {
                                requireNoAuth: function ($state, Auth) {
                                    return Auth.$requireSignIn().then(function (auth) {
                                        $state.go('dashboard');
                                    }, function (error) {
                                        return;
                                    });
                                }

                            }
                        })
                        .state('login', {
                            url: '/login',
                            controller: 'AuthController',
                            controllerAs: 'authCtrl',
                            templateUrl: 'auth/login.html',
                            resolve: {
                                requireNoAuth: function ($state, Auth) {
                                    return Auth.$requireSignIn().then(function (auth) {
                                        $state.go('home');
                                    }, function (error) {
                                        return;
                                    });
                                }
                            }
                        })
                        .state('register', {
                            url: '/register',
                            controller: 'AuthController',
                            controllerAs: 'authCtrl',
                            templateUrl: 'auth/register.html',
                            resolve: {
                                requireNoAuth: function ($state, Auth) {
                                    return Auth.$requireSignIn().then(function (auth) {
                                        $state.go('home');
                                    }, function (error) {
                                        return;
                                    });
                                }
                            }
                        })
                        .state('profile', {
                            url: '/profile',
                            templateUrl: 'users/profile.html',
                            controller: 'ProfileController',
                            controllerAs: 'profileCtrl',
                            resolve: {
                                auth: function ($state, Users, Auth) {
                                    return Auth.$requireSignIn().catch(function () {
                                        $state.go('home');
                                    });
                                },
                                profile: function (Users, Auth) {
                                    return Auth.$requireSignIn().then(function (auth) {
                                        return Users.getProfile(auth.uid).$loaded();
                                    });
                                }
                            }
                        })
                        .state('dashboard', {
                            url: '/dashboard',
                            templateUrl: 'users/dashboard.html',
                            controller: 'DashboardController',
                            controllerAs: 'dashboardCtrl',
                            resolve: {
                                auth: function ($state, Users, Auth) {
                                    return Auth.$requireSignIn().catch(function () {
                                        $state.go('home');
                                    });
                                },
                                profile: function (Users, Auth) {
                                    return Auth.$requireSignIn().then(function (auth) {
                                        return Users.getProfile(auth.uid).$loaded();
                                    });
                                }
                            }

                        });

               });

      /// Configure the firebase connection
      var config = {
        apiKey: "AIzaSyDsowuc3MaXIKUq-goj4FeGYs2cnw29-vE",
        authDomain: "github-7a3d9.firebaseapp.com",
        databaseURL: "https://github-7a3d9.firebaseio.com",
        storageBucket: "github-7a3d9.appspot.com",
        messagingSenderId: "275343482182"
      };
      firebase.initializeApp(config);
    }])
    .constant('FirebaseUrl', 'https://github-7a3d9.firebaseio.com/');

  app.run(['$rootScope', '$log', function($rootScope, $log) {

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

      $log.debug('successfully changed states');

      $log.debug('event', event);
      $log.debug('toState', toState);
      $log.debug('toParams', toParams);
      $log.debug('fromState', fromState);
      $log.debug('fromParams', fromParams);
    });

    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {

      $log.error('The requested state was not found: ', unfoundState);

    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {

      $log.error('An error occurred while changing states: ', error);

      $log.debug('event', event);
      $log.debug('toState', toState);
      $log.debug('toParams', toParams);
      $log.debug('fromState', fromState);
      $log.debug('fromParams', fromParams);
    });

  }]);

  app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.includeBar = true;
  }]);

}());