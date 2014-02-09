define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var Item = Backbone.Layout.extend({
    template: require("ldsh!./template"),
    tagName: "a",
    className: "list-group-item",
    serialize: function() {
      return {model: this.model};
    },
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    },
    events: {
      click: "viewMessage"
    },
    viewMessage: function() {
      console.log("View message");
      //Backbone.history.navigate("events/" + this.model.get("id"), {trigger: true});
    }
  });

  module.exports = Item;
});