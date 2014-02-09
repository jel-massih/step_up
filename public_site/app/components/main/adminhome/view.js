define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var AdminHome = Backbone.Layout.extend({
    template: require("ldsh!./template"),
    el:"#NewWrapper",
    events: {
      "click #eventBtn": "manageEvents",
      "click #messageBtn": "manageMessages",
      "click #userBtn": "manageUsers"
    },
    manageEvents: function() {
      Backbone.history.navigate("admin/events");
      console.log("Manage Events");
    },
    manageMessages: function() {
      Backbone.history.navigate("admin/messages");
      console.log("Manage Messages");
    },
    manageUsers: function() {
      Backbone.history.navigate("admin/users");
      console.log("Manage Users");
    }
  });

  module.exports = AdminHome;
});