define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var Events = require("./events/index");
  var Messages = require("./messages/index");

  var Layout = Backbone.Layout.extend({
    el:"#NewWrapper",
    template: require("ldsh!./template"),
    initialize: function() {
      this.eventsCollection = new Events.Collection();
      this.eventsCollection.fetch();
      this.messageCollection = new Messages.Collection();
      this.messageCollection.fetch();
    },
    afterRender: function() {
      this.setView("#eventsPanel", new Events.Views.List({collection: this.eventsCollection}));
      this.setView("#messagesPanel", new Messages.Views.List({collection: this.messageCollection}));
    }
  });

  module.exports = Layout;
});