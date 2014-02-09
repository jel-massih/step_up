define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  //var T = require("modules/GrowingInput");
  var ManageEvents = require("../events/list/view");
  var T3 = require("modules/select2");

  var NewMessage = Backbone.Layout.extend({
    template: require("ldsh!./template"),
    el:"#adminPanel",
    afterRender: function() {
      $("#inputTitle").val(this.eventName + " Announcement");
    },
    events: {
      "click #sendBtn":"sendMessage"
    },
    sendMessage: function(e) {
      e.preventDefault(); 
      var ttitle = $("#inputTitle").val();
      var tbody = $("#inputBody").val();

      if(tbody != "" || ttitle != "") {
        var url ="../api/index.php/messages/broadcast"
        if(!this.location) {
          this.location = '';
        }
        var mdata = {title: ttitle, body: tbody, "sender_email": app.router.user.get("email"), "sender_name": app.router.user.get("user_name"), "location":this.location};
        var that = this;
        $.ajax({
          url:url,
          type:'POST',
          dataType:"json",
          data: mdata,
          success:function(data) {
            if(!data.error) {
              Backbone.history.navigate('admin', {trigger:true});
            }
          }
        });
      }
    }
  });

  module.exports = NewMessage;
});