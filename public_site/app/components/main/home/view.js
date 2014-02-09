define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var Events = require("./events/index");

  var Layout = Backbone.Layout.extend({
    el:"#NewWrapper",
    template: require("ldsh!./template"),
    initialize: function() {
      this.eventsCollection = new Events.Collection();
      this.eventsCollection.fetch();
    },
    afterRender: function() {
      //this.setView("#NewWrapper", new Events.Views.List({collection: this.eventsCollection}));
    }
  });

  module.exports = Layout;
});