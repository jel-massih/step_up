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
    events: {
      "click #sendBtn":"sendMessage"
    },
    sendMessage: function(e) {
      e.preventDefault();
      var arr = $("#recieveSelect").val();
      if(arr) {
        arr.map( function(reciever) {
          var url =""
          $.ajax({
            url:url,
            type:'POST',
            dataType:"json",
            success:function(data) {
            }
          });
        });
      }
    }
  });

  module.exports = EventDetail;
});