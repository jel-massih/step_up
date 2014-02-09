define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var LoggedOutView = require("./navbar/loggedout/view");
  var LoggedInView = require("./navbar/loggedin/view");

  var Home = require("./home/view")

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
    afterRender: function() {
      var view;
      if(app.router.user.isValid() && this.currentNavState == "loggedin") {
        view = new LoggedInView({model: app.router.user});
        this.currentNavState = "loggedin";
      } else {
        view = new LoggedOutView();
        this.currentNavState = "loggedout";
      }
      this.setView("#headercontent", view);
      //this.setView("#NewWrapper", new Events.Views.List({collection: this.eventsCollection}));
      view.render();
    },
    userUpdate: function() {
      var view;
      if(app.router.user.isValid()) {
        if(this.currentNavState != "loggedin") {
          view = new LoggedInView({model: app.router.user});
          this.setView("#headercontent", view);
          this.currentNavState = "loggedin";
          view.render();
        }
      } else {
        if(this.currentNavState != "loggedout") {
          view = new LoggedOutView();
          this.setView("#headercontent", view);
          this.currentNavState = "loggedout";
        }
      }
    },
    goHome: function() {
      if(this.currentPage != "home") {
        new Home().render();
      }
    }
  });

  module.exports = Layout;
});