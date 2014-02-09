define(function(require, exports, module) {
  "use strict";

  var Backbone = require("backbone");

  var Event = Backbone.Model.extend({
    defaults: {
      event_name: '',
      event_desc: '',
      event_loc: '',
      event_start_date: '',
      event_start_time: ''
    },
    validate: function(attributes) {
      if(!attributes.event_name) {
        return 'Event must have a name';
      }
    },
    urlRoot: '../api/index.php/events'
  });

  module.exports = Event;
});