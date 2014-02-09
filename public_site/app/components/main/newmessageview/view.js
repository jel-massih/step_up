define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  //var T = require("modules/GrowingInput");
  var T3 = require("modules/select2");

  var EventDetail = Backbone.Layout.extend({
    template: require("ldsh!./template"),
    el:"#NewWrapper",
    afterRender: function() {
      $("#e9").select2();
    }
  });

  module.exports = EventDetail;
});