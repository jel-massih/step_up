define(function(require, exports, module) {
  "use strict";

  var Backbone = require("backbone");
  var app = require("app");
  var LoginView = Backbone.Layout.extend({
    el:"main",
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
		login:function(event) {
			event.preventDefault();
			$('.alert-error').hide();

      var email = $("#inputEmail").val();
      var password = $('#inputPassword').val()

			var url = '../API/index.php/login/' + email;

			$.ajax({
				url:url,
				type:'GET',
				dataType:"json",
				success:function(data) {
					if(data.salt) {
            data.salt = CryptoJS.enc.Hex.parse(data.salt);
            var key = CryptoJS.PBKDF2(password, data.salt, {keySize: 128/32, iterations: 10});
            password = key.toString(CryptoJS.enc.Hex);
            $.ajax({
              url:url,
              type:'POST',
              dataType:'json',
              data: {"password": password},
              success:function(data) {
                if(!data.error) {
                  app.router.loggedIn = true;
                  Backbone.history.navigate('', {trigger:true});
                }else {
                  $('.alert-error').text(data.error.text).show();
                }
              }
            })
					} else if(data.error) {
            $('.alert-error').text(data.error.text).show();
					}
				}
			});
		},
		register:function(event) {
			event.preventDefault();
      Backbone.history.navigate('register', {trigger:true});
		}
	});

	return LoginView;
});