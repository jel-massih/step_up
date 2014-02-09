define(function(require, exports, module) {
  "use strict";

  var app = require('app');
  var Event = require('./model');

  var Collection = Backbone.Collection.extend({
    url: function() {
      return "../api/index.php/events";
    },
    model: Event
  });

  module.exports = Collection;
});