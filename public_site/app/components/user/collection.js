define(function(require, exports, module) {
  "use strict";

  var app = require('app');
  var User = require('./model');

  var Collection = Backbone.Collection.extend({
    url: function() {
      return "../api/index.php/users";
    },
    model: User
  });

  module.exports = Collection;
});