define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var Item = require("../item/view");
  var Event = require("../model");

  var Layout = Backbone.Layout.extend({
    template: require("ldsh!./template"),
    tagName: "div",
    className: "list-group",
    serialize: function() {
      return {events: this.collection};
    },
    beforeRender: function() {

      this.collection.each(function(my_event) {
        this.insertView("#listInsertPoint", new Item({
          model:my_event
        }));
      }, this);
    },
    initialize: function() {
      this.listenTo(this.collection, "reset sync request", this.render);
    }
  });

  module.exports = Layout;
});