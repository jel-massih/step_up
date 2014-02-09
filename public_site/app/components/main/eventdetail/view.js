define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var EventDetail = Backbone.Layout.extend({
    template: require("ldsh!./template"),
    el:"#NewWrapper",
    serialize: function() {
      return {model: this.model};
    },
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    }
  });

  module.exports = EventDetail;
});