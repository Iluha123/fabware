(function() {
  'use strict';

  angular
    .module('fabware')
    .service('firstService', firstService);

  firstService.$inject = ['$http', 'fabwareConfig'];
  function firstService($http, fabwareConfig) {
    function getElements() {
      return $http({
        url: fabwareConfig.API_URL + '/imdb/top',
        method: 'JSONP',
        params: {
          start: 1,
          end: 20,
          token: fabwareConfig.TOKEN,
          format: 'json',
          data: 1,
          callback: 'JSON_CALLBACK'
        }
      }).
        then(function(response) {
          return (response.data);
        }, function(response) {
          return (response);
        });
    }
    function getElementsJSON() {
      return $http.get('/app/film/movies.json').
        then(function(response) {
          return (response.data);
        }, function(response) {
          return (response);
        });
    }
    function getTrailer(id) {
      return $http({
        url: fabwareConfig.API_URL + '/trailerAddict/taapi',
        method: 'JSONP',
        params: {
          token: fabwareConfig.TOKEN,
          idIMDB: id,
          format: 'json',
          data: 1,
          callback: 'JSON_CALLBACK'
        }
      }).
        then(function(response) {
          return (response.data);
        }, function(response) {
          return (response);
        });
      }

     return {
        get: getElements,
        getJson: getElementsJSON,
        getTrailer: getTrailer
      };
    }
})();
