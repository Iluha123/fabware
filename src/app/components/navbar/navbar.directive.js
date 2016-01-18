(function() {
  'use strict';

  angular
    .module('fabware')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'AE',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'nav',
      bindToController: true
    };

    return directive;

    function NavbarController() {
      var vm = this;
      vm.openMenu = false;
    }
  }

})();
