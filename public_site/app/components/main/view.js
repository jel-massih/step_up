define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var LoggedOutView = require("./navbar/loggedout/view");
  var LoggedInView = require("./navbar/loggedin/view");

  var Home = require("./home/view");
  var Login = require("./login/view");
  var Register = require("./register/view");

  var Layout = Backbone.Layout.extend({
    el:"main",
    template: require("ldsh!./template"),
    currentPage: null,
    initialize: function() {
      this.currentNavState = null;
      if(app.router && app.router.user.isValid()) {
        this.currentNavState = "loggedin";
      }
    },
    events: {
      "click #homeNavBtn": "homeNavClicked"
    },
    homeNavClicked: function() {
      Backbone.history.navigate('/', {trigger: true});
    },
    afterRender: function() {
      if(app.router && app.router.user.isValid() && this.currentNavState == "loggedin") {
        this.insertView("#headercontent", new LoggedInView({model: app.router.user}).render());
        this.currentNavState = "loggedin";
      } else {
        this.insertView("#headercontent", new LoggedOutView().render());
        this.currentNavState = "loggedout";
      }
      this.homePage = new Home();
    },
    userUpdate: function() {
      if(app.router.user.isValid()) {
        if(this.currentNavState != "loggedin") {
          this.insertView("#headercontent", new LoggedInView({model: app.router.user}).render());
          this.currentNavState = "loggedin";
        }
      } else {
        if(this.currentNavState != "loggedout") {
          this.insertView("#headercontent", new LoggedOutView().render());
          this.currentNavState = "loggedout";
        }
      }
    },
    goHome: function() {
      if(this.currentPage != "home") {
        this.homePage.render();
        this.currentPage = "home";
      }
    },
    goLogin: function() {
      if(this.currentPage != "login") {
        this.currentPage = "login";
        new Login().render();
      }
    },
    goRegister: function() {
      if(this.currentPage != "register") {
        this.currentPage = "register";
        new Register().render();
      }
    },
    reset: function() {
      this.homePage.reset();
    }
  });

  module.exports = Layout;
});