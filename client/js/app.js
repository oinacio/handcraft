// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
/* global angular */
angular
.module('app', [
    'ui.router',
    'lbServices'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
$urlRouterProvider) {
    $stateProvider
        .state('add-handcraft', {
        url: '/add-handcraft',
        templateUrl: 'views/handcraft-form.html',
        controller: 'AddHandcraftCtrl',
        autenticate: true
    })
        .state('all-handcraft', {
        url: '/all-handcraft',
        templateUrl: 'views/home.html',
        controller: 'AllHandcraftCtrl'
    })
    .state('view-details', {
        url: '/view-details/:id',
        templateUrl: 'views/view-details.html',
        controller: 'ViewDetailsCtrl'
    })
     .state('my-handcrafts', {
        url: '/my-handcrafts',
        templateUrl: 'views/my-handcrafts.html',
        controller: 'MyHandcraftsCtrl',
        autenticate: true
    })
    .state('my-favorites', {
        url: '/my-favorites',
        templateUrl: 'views/my-favorites.html',
        controller: 'MyFavoritesCtrl',
        authenticate: true
    })
    .state('delete-handcraft', {
        url: '/delete-handcraft/:id',
        controller: 'DeleteHandcraftCtrl',
        authenticate: true
    })
    .state('delete-favorite', {
        url: '/delete-favorite/:id',
        controller: 'DeleteFavoriteCtrl',
        authenticate: true
    })
    .state('edit-handcraft', {
        url: '/edit-handcraft/:id',
        templateUrl: 'views/handcraft-form.html',
        controller: 'EditHandcraftCtrl',
        authenticate: true
    })
    .state('msn-nothing', {
        url: '/msn-nothing',
        templateUrl: 'views/msn-nothing.html',
    })
    .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
    })
    .state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
    })
    .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up-form.html',
        controller: 'SignUpController'
    })
    .state('sign-up-success', {
        url: '/sign-up/success',
        templateUrl: 'views/sign-up-success.html'
    });

      $urlRouterProvider.otherwise('all-handcraft');
    //.............................................................end
   /* .state('add-comment', {
        url: '/add-comment',
        templateUrl: 'views/comment-form.html',
        controller: 'AddCommentController',
        authenticate: true
    })
    .state('edit-comment', {
        url: '/edit-comment/id',
        templateUrl: 'views/comment-form.html',
        controller: 'EditCommentController',
        authenticate: true
    })
    .state('delete-comment', {
        url: '/delete-comment/:id',
        controller: 'DeleteCommentController',
        authenticate: true
    })
    .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html'
    })
    .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
    })
    .state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
    })
    .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up-form.html',
        controller: 'SignUpController'
    })
    .state('sign-up-success', {
        url: '/sign-up/success',
        templateUrl: 'views/sign-up-success.html'
    });

      $urlRouterProvider.otherwise('all-handcraft');
   */

}])
.run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
        //redirect to login page if not logged in
        if (next.authenticate && !$rootScope.currentUser) {
            event.preventDefault(); //prevent current page from loading
            $state.go('forbidden');
        }
    });
}]);
