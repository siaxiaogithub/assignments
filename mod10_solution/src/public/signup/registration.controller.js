(function () {
"use strict";

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['UserService'];
function RegistrationController(UserService) {
  var reg = this;
  reg.allUsers = [];

  reg.submit = function () {
    reg.completed = true;
    UserService.addUser(reg);
    reg.allUsers = UserService.getUsers();
    console.log('all users after submitting: ', reg.allUsers);
    console.log('all users length: ', reg.allUsers.length);
  };

  reg.getCurrentUser = function () {
    reg.allUsers = UserService.getUsers();
    var curUser = reg.allUsers[reg.allUsers.length - 1];
    return curUser;
  };

  reg.hasUser = function() {
    reg.allUsers = UserService.getUsers();
    return reg.allUsers.length !== 0;
  };

  reg.getFavDish = function() {
    reg.allUsers = UserService.getUsers();
    var curUser = reg.allUsers[reg.allUsers.length - 1];
    var promise = UserService.getFavDish(curUser.favshotname);
    promise.then(function(response){
      reg.favDishObject = response;
      console.log("fav object: ", reg.favDishObject);
    })
    .catch(function(err) {
      console.log("something went wrong", err);
    })
    return response;
  };

}

})();
