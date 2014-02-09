define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");

  var Main = require("components/main/view");
  var app = require("app");

  var UserModel = require("components/user/model");

  var Events = require("components/main/home/events/index");
  var Messages = require("components/main/home/messages/index");

  // Defining the application router.
  module.exports = Backbone.Router.extend({
    initialize: function() {
      this.MainView = new Main();
      this.MainView.render();
      this.user = new UserModel({});
      var that = this;
      this.user.on("change", function() {
        that.MainView.userUpdate();
      });
      $.ajax({
        url:"../api/index.php/user",
        type:'GET',
        dataType:"json",
        success:function(data) {
          if(!data.error) {
            that.user.set(data);
          }
        }
      });

      if(!app.eventsCollection) {
        app.eventsCollection = new Events.Collection();
      }
      app.eventsCollection.fetch({success: function() {
        that.trigger("eventsFetched");
      }});
      if(!app.messageCollection) {
        app.messageCollection = new Messages.Collection();
      }
      app.messageCollection.fetch();
    },
    routes: {
      "": "index",
      "login":"login",
      "register":"register",
      "logout":"logout",
      "events/:id": "viewEventInfo"
    },

    index: function() {
      this.MainView.goHome();
    },
    login: function() {
      this.MainView.goLogin();
    },
    register: function() {
      this.MainView.goRegister();
    },
    logout: function() {
      var url = '../api/index.php/logout';
      var that = this;
      $.ajax({
        url:url,
        type:'POST',
        dataType:"json",
        success:function(data) {
          if(data.error) {
            console.log("Error Logging Out");
          } else {
            that.user.clear();
            if(app.messageCollection.length) {
              app.messageCollection.reset();
            }
            $('#messagesPanel').html("Please Sign in to view messages.");
          }
          Backbone.history.navigate('/', {trigger:true});
        },
        error:function() {
          Backbone.history.navigate('/', {trigger:true});
        }
      });
    },
    viewEventInfo: function(eid) {
      this.MainView.goEventDetail(eid);
    }
  });
});