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
    },
    urlRoot: '../API/index.php/users'
  })

  module.exports = User;
});