define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var LoggedOutView = require("./navbar/loggedout/view");

  var Layout = Backbone.Layout.extend({
    el:"main",
    template: require("ldsh!./template"),
    afterRender: function() {
      var view = new LoggedOutView();
      this.insertView(view);
    }
  });

  module.exports = Layout;
});