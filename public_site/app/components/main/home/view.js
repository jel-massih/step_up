define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var Events = require("./events/index");
  var Messages = require("./messages/index");

  var Layout = Backbone.Layout.extend({
    el:"#NewWrapper",
    template: require("ldsh!./template"),
    initialize: function() {
      if(!app.eventsCollection) {
        app.eventsCollection = new Events.Collection();
      }
      app.eventsCollection.fetch();
      if(!app.messageCollection) {
        app.messageCollection = new Messages.Collection();
      }
      app.messageCollection.fetch();
    },
    afterRender: function() {
      app.messageCollection.fetch();
      app.eventsCollection.fetch();
      this.insertView("#eventsPanel", new Events.Views.List({collection: app.eventsCollection}));
      this.insertView("#messagesPanel", new Messages.Views.List({collection: app.messageCollection}));
    }
  });

  module.exports = Layout;
});