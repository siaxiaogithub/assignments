(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('totalPrice', TotalPriceFilter);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyList.markedBought = function(itemIndex) {
    ShoppingListCheckOffService.markedBought(itemIndex);
  }

  toBuyList.isEmpty = function() {
    return toBuyList.items.length === 0;
  }

  toBuyList.emptyMessage = "Everything is Bought!";
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', 'TotalPriceFilter'];
function AlreadyBoughtController(ShoppingListCheckOffService, TotalPriceFilter) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();

  boughtList.isEmpty = function() {
    return boughtList.items.length === 0;
  }

  boughtList.emptyMessage = "Nothing bought yet.";
}

function TotalPriceFilter() {
  return function(itemPrice, quantity) {
    return itemPrice * quantity;
  }
}


function ShoppingListCheckOffService() {

  var service = this;

  // List of shopping items
  var toBuyItems = [
    {name: 'coconuts', quantity: 3, pricePerItem: 2.00},
    {name: 'potatos', quantity: 8, pricePerItem: 6.35},
    {name: 'cookies', quantity: 7, pricePerItem: 2.14},
    {name: 'eggs', quantity: 2, pricePerItem: 3.99},
    {name: 'milks', quantity: 3, pricePerItem: 5.79},
    {name: 'oranges', quantity: 2, pricePerItem: 6.68},
  ];

  var boughtItems = [];

  service.markedBought = function(itemIndex) {
    //step0: get the current bought item information
    var curItem = service.getToBuyItem(itemIndex);

    //step1: remove items from the list toBuyItems
    service.removeItem(toBuyItems, itemIndex);

    //step2: add items to the list BoughtItems
    service.addItem(boughtItems, curItem);
  };

  service.addItem = function (listName, item) {
    listName.push(item);
  };

  service.removeItem = function (listName, itemIndex) {
    listName.splice(itemIndex, 1);
  };

  service.getToBuyItem = function(itemIndex) {
    return toBuyItems[itemIndex];
  }

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function() {
    return boughtItems;
  };

}

})();
