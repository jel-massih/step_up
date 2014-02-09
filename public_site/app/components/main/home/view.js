define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  

  var Layout = Backbone.Layout.extend({
    el:"#NewWrapper",
    template: require("ldsh!./template"),
    afterRender: function() {
      app.messageCollection.fetch();
      app.eventsCollection.fetch();
      this.insertView("#eventsPanel", new Events.Views.List({collection: app.eventsCollection}));
      this.insertView("#messagesPanel", new Messages.Views.List({collection: app.messageCollection}));
    }
  });

  module.exports = Layout;
});