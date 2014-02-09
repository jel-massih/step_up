define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  
  var Events = require("./events/index");
  var Messages = require("./messages/index");

  var Layout = Backbone.Layout.extend({
    el:"#NewWrapper",
    template: require("ldsh!./template"),
    afterRender: function() {
      var that = this;
      app.eventsCollection.fetch({
        success: function() {
          that.insertView("#eventsPanel", new Events.Views.List({collection: app.eventsCollection}));
        }
      });

      
      app.messageCollection.fetch({
        success: function() {
          that.insertView("#messagesPanel", new Messages.Views.List({collection: app.messageCollection}));
        },
        error:function() {
          that.insertView("#messagesPanel", new Messages.Views.List()).render();
        }
      });
    }
  });

  module.exports = Layout;
});