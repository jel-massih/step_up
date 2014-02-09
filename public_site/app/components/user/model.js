define(function(require, exports, module) {
  "use strict";

  var Backbone = require("backbone");

  var User = Backbone.Model.extend({
    defaults: {
      email: '',
      user_name: '',
      password: '',
      salt: '',
      membership_type: '',
      access_level: "0",
      location: ''
    },
    validate: function(attributes) {
      if(!attributes.email) {
        return 'You must enter valid email';
      }

      if(!attributes.user_name) {
        return 'You must have a name';
      }
    },
    urlRoot: '../api/index.php/users'
  })

  module.exports = User;
});