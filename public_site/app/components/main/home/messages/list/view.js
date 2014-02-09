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
        _.each(this.collection.last(this.collection.length).reverse(), function(message) {
          this.insertView("#messageListInsertPoint", new Item({
            model:message
          }));
        }, this);
      }
    },
    afterRender: function() {
      if(this.collection && this.collection.length) {
        $('#mpane').html("");
      } else {
        console.log(app.router.user.isValid());
        if(app.router.user.isValid()) {
          $('#mpane').html("You Have no new Messages!");
        } else {
          $("#newMessageBtn").remove();
          $('#mpane').html("Please Sign in to view messages.");
        }
      }
    },
    initialize: function() {
      if(this.collection) {
        this.listenTo(this.collection, "reset sync request", this.render);
      }
    },
    events: {
      "click #newMessageBtn": "newMessage"
    },
    newMessage: function() {
      Backbone.history.navigate("message/new", {trigger:true});
    }
  });

  module.exports = Layout;
});