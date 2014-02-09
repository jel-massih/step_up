define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var UpdateUser = require("../../useredit/view");

  var Item = Backbone.Layout.extend({
    template: require("ldsh!./template"),
    tagName: "tr",
    serialize: function() {
      return {model: this.model};
    },
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    },
    events: {
      "click #editBtn": "editUser"
    },
    editUser: function(e) {
      e.preventDefault();
      new UpdateUser({user: this.model}).render();
    }
  });

  module.exports = Item;
});