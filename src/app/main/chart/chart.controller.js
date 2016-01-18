(function() {
  'use strict';

  angular
    .module('fabware')
    .controller('ChartCtrl', ChartCtrl);

 ChartCtrl.$inject = ['list'];
 function ChartCtrl(list) {
   	var vm = this;
    vm.movies = list;
  }
})();
