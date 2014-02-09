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
      if(this.collection) {
        this.collection.each(function(message) {
          this.insertView("#messageListInsertPoint", new Item({
            model:message
          }));
        }, this);
      }
    },
    afterRender: function() {
      if(this.collection && this.collection.length) {
        $('#messagePanel').html("");
      } else {
        console.log(app.router.user.isValid());
        if(app.router.user.isValid()) {
          $('#messagePanel').html("You Have no new Messages!");
        } else {
          $('#messagePanel').html("Please Sign in to view messages.");
        }
      }
    },
    initialize: function() {
      if(this.collection) {
        this.listenTo(this.collection, "reset sync request", this.render);
      }
    }
  });

  module.exports = Layout;
});