define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var NewMessage = Backbone.Layout.extend({
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
      var ttitle = $("#inputTitle").val();
      var tbody = $("#inputBody").val();

      if(tbody != "" || ttitle != "") {
        if(arr) {
          arr.map( function(reciever) {
            var url ="../api/index.php/messages"
            var mdata = {email: reciever, title: ttitle, body: tbody, "sender_email": app.router.user.get("email"), "sender_name": app.router.user.get("user_name")};
            $.ajax({
              url:url,
              type:'POST',
              dataType:"json",
              data: mdata,
              success:function(data) {
                if(!data.error) {
                  Backbone.history.navigate('/', {trigger:true});
                }
              }
            });
          });
        }
      } else {
        console.log("Fill Out Message");
      }
    }
  });

  module.exports = NewMessage;
});