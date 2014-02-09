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
      "click #editBtn": "editUser",
      "click #deleteBtn": "deleteUser"
    },
    editUser: function(e) {
      e.preventDefault();
      new UpdateUser({user: this.model}).render();
    },
    deleteUser: function(e) {
      e.preventDefault();
      this.model.destroy({success: function() {
        Backbone.history.navigate('admin', {trigger: true});
      }});
    }
  });

  module.exports = Item;
});