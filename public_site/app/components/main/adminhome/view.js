define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var ManageEvents = require("./events/list/view");
  var ManageMessages = require("./messages/list/view");
  var ManageUsers = require("./users/list/view");

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
      new ManageEvents({collection:app.eventsCollection}).render();
    },
    manageMessages: function() {
      Backbone.history.navigate("admin/messages");
      console.log("Manage Messages");
    },
    manageUsers: function() {
      Backbone.history.navigate("admin/users");
      new ManageUsers({collection:app.usersCollection}).render();
    },
    afterRender: function() {
      this.manageEvents();
    }
  });

  module.exports = AdminHome;
});