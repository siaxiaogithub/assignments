(function () {
'use strict';

angular.module('Data', [])
.constant('ItemsRESTApi', 'https://davids-restaurant.herokuapp.com/menu_items.json')
.constant('CategoriesRESTApi', 'https://davids-restaurant.herokuapp.com/categories.json');

})();
