define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var Item = Backbone.Layout.extend({
    template: require("ldsh!./template"),
    tagName: "div",
    className: "list-group-item",
    serialize: function() {
      return {model: this.model};
    },
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    },
    events: {
      "click #editEvent": "editEvent",
      "click #sendEventMessage": "sendEventMessage"
    },
    editEvent: function() {
      Backbone.history.navigate("events/" + this.model.get("id") + "/edit", {trigger: true});
    },
    sendEventMessage: function() {
      
    }
  });

  module.exports = Item;
});