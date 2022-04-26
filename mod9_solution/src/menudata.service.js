(function() {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http', 'RESTApi'];
function MenuSearchService($http, RESTApi) {
  var service = this;

  service.getAllCategories = function(searchTerm) {
    // return $http({
    //   method: "GET",
    //   url: RESTApi,
    // }).then(function(results) {
    //   var foundItems = service.findHelper(results, searchTerm);
    //   return foundItems;
    // })
  }

  service.getItemsForCategory() = function(categoryShortName) {

  }

}

}){};
