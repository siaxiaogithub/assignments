(function() {

'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/shoppinglist/shoppinglist.template.html',
  controller: ShoppingListComponentController,
  bindings: {
    items: '<',
    myTitle: '@title',
    onRemove: '&'
  }
});

})();
