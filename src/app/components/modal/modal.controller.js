(function() {
  'use strict';

  angular
    .module('fabware')
    .controller('ModalCtrl', ModalCtrl);

  ModalCtrl.$inject = ['firstService', 'id', '$uibModalInstance', '$sce'];
  function ModalCtrl(firstService, id, $uibModalInstance, $sce) {
    var vm = this;
    vm.error = false;
    vm.close = close;
    firstService.getTrailer(id).then(function(data) {
      if(data.error) {
        vm.error = data.error.message;
      } else {
        vm.iframe = $sce.trustAsHtml(data.data.trailer[0].embed);
      }

    }).catch(function(data) {
      vm.error = data;
    });

    function close(){
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
