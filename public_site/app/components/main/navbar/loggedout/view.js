define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var Layout = Backbone.Layout.extend({
    el:"#headercontent",
    template: require("ldsh!./template"),
    initialize: function() {
      this.render();
    },
    events: {
      "click #registerbtn": "register",
      "click #signinbtn": "login"
    },
    login: function() {
      Backbone.history.navigate('login', {trigger: true});
    },
    register: function() {
      Backbone.history.navigate('register', {trigger: true});
    }
  });

  module.exports = Layout;
});