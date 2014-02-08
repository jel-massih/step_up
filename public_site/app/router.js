define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");

  var Login = require("components/user/login/view");
  var Register = require("components/user/register/view");
  var Home = require("components/home/view");
  var app = require("app");

  var UserModel = require("components/user/model");

  // Defining the application router.
  module.exports = Backbone.Router.extend({
    initialize: function() {
      this.HomeView = new Home();
      this.user = new UserModel({});
      var that = this;
      this.user.on("change", function() {
        that.HomeView.userUpdate();
      });
      $.ajax({
        url:"../api/index.php/user",
        type:'GET',
        dataType:"json",
        success:function(data) {
          if(!data.error) {
            that.user.set(data);
          }
        }
      });
    },
    routes: {
      "": "index",
      "login":"login",
      "register":"register",
      "logout":"logout"
    },

    index: function() {
      new Home().render();
    },
    login: function() {
      new Login().render();
    },
    register: function() {
      new Register().render();
    },
    logout: function() {
      var url = '../api/index.php/logout';
      var that = this;
      $.ajax({
        url:url,
        type:'POST',
        dataType:"json",
        success:function(data) {
          if(data.error) {
            console.log("Error Logging Out");
          } else {
            that.user = new UserModel({});
          }
        }
      });
      Backbone.history.navigate('/', {trigger:true});
    }
  });
});