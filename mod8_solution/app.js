(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('RESTApi', 'https://davids-restaurant.herokuapp.com/menu_items.json');

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;
    menu.searchTerm = '';

    menu.narrowDown = function() {
      var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
      promise.then(function(response){
        menu.results = response;
        console.log("menu results: ", menu.results);
        return menu.results;
      })
      .catch(function(err) {
        console.log("something went wrong", err);
      })
    }

  }

  MenuSearchService.$inject = ['$http', 'RESTApi'];
  function MenuSearchService($http, RESTApi) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: "GET",
        url: RESTApi,
      }).then(function(results) {
        var foundItems = service.findHelper(results, searchTerm);
        return foundItems;
      })
    }

    service.findHelper = function(context, searchTerm) {
      var items = context.data.menu_items;
      var foundItems = [];

      for (var i = 0; i < items.length; i++) {
        if (items[i].description.includes(searchTerm)) {
          foundItems.push(items[i]);
        }
      }

      return foundItems;
    }

  }

})();
