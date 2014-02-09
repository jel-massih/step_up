define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var Backbone = require("backbone");
  var User = require("../../user/model");

  var RegisterView = Backbone.Layout.extend({
    el:"#NewWrapper",
  	template: require("ldsh!./template"),
		initialize: function() {
		},
		events: {
			"click #registerButton": "register"
		},
		render:function () {
			$(this.el).html(this.template());
			return this;
		},
		register:function(event) {
			event.preventDefault();
			$('.alert-error').hide();

      var name = $("#nameInput").val();
			var email = $("#emailInput").val();
			var password = $('#passwordinput').val();
      var membership_type = $("#membershipType").val();
      var location = $("#selectcity").val();

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

      if(password.length < 8) {
        $('.alert-error').text("Your password must be at least 8 Characters").show();
        return;
      }

      var salt = CryptoJS.lib.WordArray.random(128/8);
      var key = CryptoJS.PBKDF2(password, salt, {keysize:128/32, iterations:10});
      password = key.toString(CryptoJS.enc.Hex);
      salt = salt.toString(CryptoJS.enc.Hex);

      var obj = {"user_name": name, "email":email, "password":password, "salt":salt, "membership_type":membership_type, "location":location};
      var user = new User(obj);
      if(!user.isValid()) {
        $('.alert-error').text(user.validationError).show();
      } else {
        user.save({},{
          error: function(model, xhr, options) {
            console.log(xhr);
            $('.alert-error').text("Ooops Something went wrong! Try again later.").show();
          },
          success: function(model, response, options) {
            if(response.error) {
              $('.alert-error').text(response.error.text).show();
            } else {
              Backbone.history.navigate('login', {trigger:true});
            }
          }
        });
      }
		}
	});

	return RegisterView;
});