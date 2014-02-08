define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var Layout = Backbone.Layout.extend({
    el:"#headercontent",
    template: require("ldsh!./template"),
    serialize: function() {
      return {model: this.model};
    },
    initialize: function() {
      this.render();
    },
    events: {
      "click #logoutbtn": "logout"
    },
    logout: function() {
      Backbone.history.navigate('logout', {trigger: true});
    }
  });

  module.exports = Layout;
});