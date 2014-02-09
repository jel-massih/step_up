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
			"click #loginButton": "login",
			"click #registerButton": "register"
		},
		render:function () {
			$(this.el).html(this.template());
			return this;
		},
		register:function(event) {
			event.preventDefault();
			$('.alert-error').hide();

			var email = $("#inputEmail").val();
			var password = $('#inputPassword').val();
			var password_confirm = $('#inputPasswordConfirm').val();

      if(password_confirm != password) {
        $('.alert-error').text("The passwords must match").show();
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

      var obj = {"email":email,"password":password, "salt":salt};
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
		},
		login:function(event) {
			event.preventDefault();
			Backbone.history.navigate('login', {trigger:true});
		}
	});

	return RegisterView;
});