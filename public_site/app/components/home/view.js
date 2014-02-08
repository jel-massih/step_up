define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var LoggedOutView = require("./navbar/loggedout/view");
  var LoggedInView = require("./navbar/loggedin/view");

  var Layout = Backbone.Layout.extend({
    el:"main",
    template: require("ldsh!./template"),
    initialize: function() {
      this.currentNavState = null;
      if(app.router && app.router.user.isValid()) {
        this.currentNavState = "loggedin";
      }
    },
    afterRender: function() {
      var view;
      if(app.router.user.isValid() && this.currentNavState == "loggedin") {
        view = new LoggedInView({model: app.router.user});
        this.currentNavState = "loggedin";
      } else {
        console.log("Show Logged Out");
        view = new LoggedOutView();
        this.currentNavState = "loggedout";
      }
      this.setView("#headercontent", view);
      view.render();
    },
    userUpdate: function() {
      if(app.router.user.isValid()) {
        if(this.currentNavState != "loggedin") {
          this.setView("#headercontent", new LoggedInView({model: app.router.user}));
          this.currentNavState = "loggedin";
        }
      } else {
        if(this.currentNavState != "loggedout") {
          this.setView("#headercontent", new LoggedOutView());
          this.currentNavState = "loggedout";
        }
      }
    }
  });

  module.exports = Layout;
});