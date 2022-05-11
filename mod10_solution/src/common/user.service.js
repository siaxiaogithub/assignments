(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);

UserService.$inject = ['$http', 'ApiPath'];
function UserService($http, ApiPath) {
  var service = this;

  service.users = [];

  service.addUser = function(user) {
    service.users.push(user.user);
    return user;
  };

  service.getUsers = function() {
    return service.users;
  }

  service.getFavDish = function (short_name) {
    var proxy = "//cors-anywhere.herokuapp.com";
    return $http.get("https://siaxiao-mod10.herokuapp.com/menu_items/A3.json").then(function (response) {
      return response.data;
    });
  };

}



})();
