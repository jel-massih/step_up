define(function(require, exports, module) {
  "use strict";

  var Backbone = require("backbone");

  var User = Backbone.Model.extend({
    defaults: {
      email: '',
      password: '',
      salt: '',
      access_level: 0,
      location: ''
    },
    validate: function(attributes) {
      if(!attributes.email) {
        return 'You must enter valid email';
      }

      if(!attributes.password) {
        return 'You must enter a Password';
      }

      if(!attributes.salt) {
        return 'Something Went Horribly Wrong! Please Try Again. (Salt Error)';
      }
    },
    urlRoot: '../API/index.php/users'
  })

  module.exports = User;
});