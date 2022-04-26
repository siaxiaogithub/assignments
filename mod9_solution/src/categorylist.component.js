(function () {
'use strict';

angular.module('MenuApp')
.component('categoryList', {
  templateUrl: 'src/templates/categorylist.template.html',
  bindings: {
    items: '<'
  }
});

})();
