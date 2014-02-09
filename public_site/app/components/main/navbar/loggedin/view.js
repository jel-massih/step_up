define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var Layout = Backbone.Layout.extend({
    el:"#headercontent",
    template: require("ldsh!./template"),
    serialize: function() {
      return {model: this.model};
    },
    events: {
      "click #logoutbtn": "logout"
    },
    logout: function() {
      Backbone.history.navigate('logout', {trigger: true});
    },
    initialize: function() {
      console.log("init");
    }
  });

  module.exports = Layout;
});