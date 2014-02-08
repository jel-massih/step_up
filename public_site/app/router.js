define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");

  var Login = require("components/user/login/view");
  var Register = require("components/user/register/view");

  var app = require("app");

  // Defining the application router.
  module.exports = Backbone.Router.extend({
    initialize: function() {
    },
    routes: {
      "": "index",
      "login":"login",
      "register":"register",
      "logout":"logout"
    },

    index: function() {
      $('#main').html('');
      console.log("Index");
    },
    login: function() {
      new Login().render();
    },
    register: function() {
      new Register().render();
    },
    logout: function() {
      var url = '../api/index.php/logout';
      $.ajax({
        url:url,
        type:'POST',
        dataType:"json",
        success:function(data) {
          if(data.error) {
            console.log("Error Logging Out");
          } else {
            Backbone.history.navigate('login', {trigger:true});
          }
        }
      });
    }
  });
});