(function() {
  'use strict';

  angular
    .module('fabware')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/top');
    //
    // Now set up the states
    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'app/main/home.html',
        abstract: true,
        resolve: {
          list: getList
        }
      })
      .state('home.top', {
        url: '/top',
        templateUrl: 'app/main/top/top.html',
        controller: 'TopCtrl',
        controllerAs: 'top'
      })
      .state('home.favorite', {
        url: '/favorite',
        templateUrl: 'app/main/favorite/favorite.html',
        controller: 'FavorCtrl',
        controllerAs: 'fav'
      })
      .state('home.chart', {
        url: '/chart',
        templateUrl: 'app/main/chart/chart.html',
        controller: 'ChartCtrl',
        controllerAs: 'chart'
      });

    getList.$inject = ['firstService'];
    function getList(firstService) {
      return firstService.get().then(function (data) {
        return data.data.movies;
      }).catch(function () {
        firstService.getAny().then(function (data) {
          return data;
        }).catch(function (){
          console.log('ERROR');
        });
      });

    }
  }

})();
