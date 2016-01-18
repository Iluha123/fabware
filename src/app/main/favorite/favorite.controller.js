(function() {
  'use strict';

  angular
    .module('fabware')
    .controller('FavorCtrl', FavorCtrl);


  FavorCtrl.$inject = ['store', '$uibModal'];
  function FavorCtrl(store, $uibModal) {
    var vm = this;
    vm.removeFav = removeFav;
    vm.getUrlAuth = getUrlAuth;
    vm.watchTrailer = watchTrailer;

    vm.moviesList = store.get('favorite') || [];
    vm.favoriteId = store.get('favoriteId') || [];

    function removeFav(id) {
      var index = vm.favoriteId.indexOf(id);
      vm.favoriteId.splice(index, 1);
      vm.moviesList.splice(index, 1);
      store.set('favorite', vm.moviesList);
      store.set('favoriteId', vm.favoriteId);
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
