define(function(require, exports, module) {
  "use strict";

  var Backbone = require("backbone");

  var Message = Backbone.Model.extend({
    defaults: {
      message_title: '',
      message_body: '',
      sender_id: '',
      sender_email: '',
      sender_name: '',
    },
    urlRoot: '../api/index.php/message'
  });

  module.exports = Message;
});