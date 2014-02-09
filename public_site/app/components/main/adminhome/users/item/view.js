define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var Item = Backbone.Layout.extend({
    template: require("ldsh!./template"),
    tagName: "tr",
    serialize: function() {
      return {model: this.model};
    },
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    }
  });

  module.exports = Item;
});