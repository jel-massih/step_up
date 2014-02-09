define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");

  var Login = require("components/user/login/view");
  var Register = require("components/user/register/view");
  var Main = require("components/main/view");
  var app = require("app");

  var UserModel = require("components/user/model");

  // Defining the application router.
  module.exports = Backbone.Router.extend({
    initialize: function() {
      this.MainView = new Main();
      this.user = new UserModel({});
      var that = this;
      this.user.on("change", function() {
        that.MainView.userUpdate();
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
      this.MainView.render();
      this.MainView.goHome();
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
          Backbone.history.navigate('/', {trigger:true});
        },
        error:function() {
          Backbone.history.navigate('/', {trigger:true});
        }
      });
    }
  });
});