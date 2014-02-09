define(function(require, exports, module) {
  "use strict";

  var app = require('app');
  var Message = require('./model');

  var Collection = Backbone.Collection.extend({
    url: function() {
      return "../api/index.php/messages";
    },
    model: Message
  });

  module.exports = Collection;
});