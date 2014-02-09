define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  //var T = require("modules/GrowingInput");
  var T3 = require("modules/select2");

  var EventDetail = Backbone.Layout.extend({
    template: require("ldsh!./template"),
    el:"#NewWrapper",
    afterRender: function() {
      console.log(this.collection);
      $("#recieveSelect").select2();
    },
    serialize: function() {
      return {users: this.collection};
    },
  });

  module.exports = EventDetail;
});