(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  //Placeholder
  $scope.lunchText = "list comma separated dishes you usually have for lunch";
  $scope.foods = "";
  $scope.color = "";
  $scope.note = "Note: I do NOT consider an empty item, i.e., , , as an item towards to the count. Thanks!";


  $scope.checkIfTooMuch = function () {
    $scope.foodArray = $scope.getFoodArray();
    $scope.returnMessage = $scope.getReturnMessage();
    console.log($scope.foodArray);
  }

  $scope.getFoodArray = function() {
    $scope.foodArray = [];
    var splitArray = $scope.foods.split(',');
    for (let i = 0; i < splitArray.length; i++) {
      if (splitArray[i].trim()) {
        $scope.foodArray.push(splitArray[i])
      }
    }
    return $scope.foodArray;
  }

  $scope.getReturnMessage = function() {
    if (!$scope.foods) {
      $scope.changeColor("red");
      return "Please enter data first";
    }
    else if ($scope.foodArray.length <= 3) {
      $scope.changeColor("green");
      return "Enjoy!";
    }
    else {
      $scope.changeColor("green");
      return "Too much!";
    }
  }

  $scope.changeColor = function(color) {
    $scope.color = color;
  }
}

})();
