define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var EventDetail = Backbone.Layout.extend({
    template: require("ldsh!./template"),
    el:"#NewWrapper"
  });

  module.exports = EventDetail;
});