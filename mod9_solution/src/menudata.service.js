(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http', 'CategoriesRESTApi', 'ItemsRESTApi']
function MenuDataService($http, CategoriesRESTApi, ItemsRESTApi) {
  var service = this;

  // List of categories
  var items = [];

  service.getAllCategories = function() {
  return $http({
    method: "GET",
    url: CategoriesRESTApi
  }).then(function(results) {
    items = service.findHelper(results);
    return items;
  })
}

service.getItemsForCategory = function(categoryShortName) {
  return $http({
    method: "GET",
    url: ItemsRESTApi,
    params: {category: categoryShortName}
  }).then(function(results) {
    items = service.findHelper(results, true);
    return items;
  })
}

service.findHelper = function(context, menu_items = false) {
  var categories = context.data;
  if (menu_items) {
    categories = categories.menu_items;
  }
  var foundItems = [];
  for (var i = 0; i < categories.length; i++) {
    foundItems.push(categories[i]);
  }
  return foundItems;
}
}

})();
