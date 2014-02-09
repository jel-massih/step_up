define(function(require, exports, module) {
  "use strict";

  var Backbone = require("backbone");

  var Message = Backbone.Model.extend({
    defaults: {
      message_title: '',
      message_body: '',
      sender_id: ''
    },
    urlRoot: '../api/index.php/message'
  });

  module.exports = Message;
});