(function() {
  'use strict';

  angular
    .module('fabware')
    .controller('TopCtrl', TopCtrl);

  TopCtrl.$inject = ['store', 'list', '$uibModal'];
  function TopCtrl(store, list, $uibModal) {
    var vm = this;
    vm.addFavorite = addFavorite;
    vm.activeFavorite = activeFavorite;
    vm.getUrlAuth = getUrlAuth;
    vm.movies = list || [];
    vm.watchTrailer = watchTrailer;
    vm.moviesList = store.get('favorite') || [];
    vm.favoriteId = store.get('favoriteId') || [];

    //store.remove('favoriteId');
    //store.remove('favorite');

    function addFavorite(movie) {
      var index = vm.favoriteId.indexOf(movie.idIMDB);
      if(index === -1) {
        vm.moviesList.push(movie);
        vm.favoriteId.push(movie.idIMDB);
      } else {
        vm.favoriteId.splice(index, 1);
        vm.moviesList.splice(index, 1);
      }
      store.set('favorite', vm.moviesList);
      store.set('favoriteId', vm.favoriteId);

    }

    function activeFavorite(id) {
      return vm.favoriteId.indexOf(id)!== -1;
    }

    function getUrlAuth(id){
      return 'http://www.imdb.com/name/' + id;
    }

    function watchTrailer(id){
      $uibModal.open({
        animation: true,
        templateUrl: 'app/components/modal/modal.html',
        controller: 'ModalCtrl',
        controllerAs: 'mod',
        size: 'md',
        resolve: {
          id: function () {
            return id;
          }
        }
      });
    }
  }
})();
