define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var Layout = Backbone.Layout.extend({
    el:"#headercontent",
    template: require("ldsh!./template"),
    serialize: function() {
      return {model: this.model};
    },
    events: {
      "click #logoutbtn": "logout",
      "click #adminbtn": "adminHome"
    },
    logout: function() {
      Backbone.history.navigate('logout', {trigger: true});
    },
    afterRender: function() {
      if(app.router.user.get("access_level") == "1") {
        $("#headercontent").append('<button id="adminbtn" style="margin-left:5px" class="btn btn-primary" href="#">Admin</a>');
      }
    },
    adminHome: function() {
      Backbone.history.navigate("admin/home", {trigger: true});
    }
  });

  module.exports = Layout;
});