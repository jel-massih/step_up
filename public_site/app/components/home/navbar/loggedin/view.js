define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var Layout = Backbone.Layout.extend({
    el:"#headercontent",
    template: require("ldsh!./template"),
    initialize: function() {
      console.log(this.model);
      this.render();
    }
  });

  module.exports = Layout;
});