(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('RESTApi', 'https://davids-restaurant.herokuapp.com/menu_items.json')
  .directive('foundItems', FoundItemsDirective)
  .directive('listItemDescription', ListItemDescriptionDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        myTitle: '@title',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  function ListItemDescriptionDirective() {
    var ddo = {
      template: '{{ item.name }} : {{ item.description }}'
    };

    return ddo;

  }

  function FoundItemsDirectiveController() {
    var list = this;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var list = this;
    list.searchTerm = '';
    list.foundItems = [];

    list.narrowDown = function() {
      var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
      promise.then(function(response){
        list.foundItems = response;
        console.log("list results: ", list.foundItems);
      })
      .catch(function(err) {
        console.log("something went wrong", err);
      })
    }

    list.removeItem = function (itemIndex) {
      console.log("'this' is: ", this);
      list.foundItems.splice(itemIndex, 1);
    };
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
