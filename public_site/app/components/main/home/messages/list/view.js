define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var Item = require("../item/view");

  var Layout = Backbone.Layout.extend({
    template: require("ldsh!./template"),
    tagName: "div",
    className: "list-group",
    serialize: function() {
      return {messages: this.collection};
    },
    beforeRender: function() {
     this.collection.each(function(message) {
        this.insertView("#messageListInsertPoint", new Item({
          model:message
        }));
      }, this);
    },
    initialize: function() {
      this.listenTo(this.collection, "reset sync request", this.render);
    }
  });

  module.exports = Layout;
});