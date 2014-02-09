define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var Backbone = require("backbone");

  var UserEditView = Backbone.Layout.extend({
    el:"#adminPanel",
    template: require("ldsh!./template"),
    events: {
      "click #updateButton": "update"
    },
    serialize: function() {
      return {model: this.user};
    },
    update:function(event) {
      event.preventDefault();
      $('.alert-error').hide();

      var name = $("#nameInput").val();
      var email = $("#emailInput").val();
      var password = $('#passwordinput').val();
      var membership_type = $("#membershipType").val();
      var location = $("#selectcity").val();
      var access_level = $("#accessLevelSelect").val();

      if(!name) {
        $('.alert-error').text("Your must have a name").show();
        return;
      }

      if(!email) {
        $('.alert-error').text("Your must have an email").show();
        return;
      }

      if(membership_type == "0") {
        $('.alert-error').text("Your must select a membership type").show();
        return;
      }

      if(location == "0") {
        $('.alert-error').text("Your must select a location").show();
        return;
      }

      var obj = {"user_name": name, "email":email, "membership_type":membership_type, "location":location, "access_level": access_level};
      if(!this.user) {
        Backbone.history.navigate('admin', {trigger:true});
      }
      this.user.set(obj);
      if(!this.user.isValid()) {
        $('.alert-error').text(this.user.validationError).show();
      } else {
        this.user.save({},{
          error: function(model, xhr, options) {
            console.log(xhr);
            $('.alert-error').text("Ooops Something went wrong! Try again later.").show();
          },
          success: function(model, response, options) {
            if(response.error) {
              $('.alert-error').text(response.error.text).show();
            } else {
              Backbone.history.navigate('admin', {trigger:true});
            }
          }
        });
      }
    }
  });

  return UserEditView;
});