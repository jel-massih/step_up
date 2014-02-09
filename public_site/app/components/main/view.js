define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var LoggedOutView = require("./navbar/loggedout/view");
  var LoggedInView = require("./navbar/loggedin/view");

  var Home = require("./home/view");
  var Login = require("./login/view");
  var Register = require("./register/view");
  var EventDetail = require("./eventdetail/view");
  var MessageView = require("./messageview/view");
  var NewMessageView = require("./newmessageview/view");
  var AdminHome = require("./adminhome/view")

  var Layout = Backbone.Layout.extend({
    el:"main",
    template: require("ldsh!./template"),
    currentPage: null,
    initialize: function() {
      this.currentNavState = null;
      if(app.router && app.router.user.isValid()) {
        this.currentNavState = "loggedin";
      }
    },
    events: {
      "click #homeNavBtn": "homeNavClicked"
    },
    homeNavClicked: function() {
      Backbone.history.navigate('/', {trigger: true});
    },
    afterRender: function() {
      if(app.router && app.router.user.isValid() && this.currentNavState == "loggedin") {
        this.insertView("#headercontent", new LoggedInView({model: app.router.user}).render());
        this.currentNavState = "loggedin";
      } else {
        this.insertView("#headercontent", new LoggedOutView().render());
        this.currentNavState = "loggedout";
      }
      this.homePage = new Home();
    },
    userUpdate: function() {
      if(app.router.user.isValid()) {
        if(this.currentNavState != "loggedin") {
          this.insertView("#headercontent", new LoggedInView({model: app.router.user}).render());
          this.currentNavState = "loggedin";
        }
      } else {
        if(this.currentNavState != "loggedout") {
          this.insertView("#headercontent", new LoggedOutView().render());
          this.currentNavState = "loggedout";
        }
      }
    },
    goHome: function() {
      if(this.currentPage != "home") {
        this.homePage.render();
        this.currentPage = "home";
      }
    },
    goLogin: function() {
      if(this.currentPage != "login") {
        this.currentPage = "login";
        new Login().render();
      }
    },
    goRegister: function() {
      if(this.currentPage != "register") {
        this.currentPage = "register";
        new Register().render();
      }
    },
    goEventDetail: function(eid) {
      if(this.currentPage != "eventdetail:" + eid) {
        if(this.currentPage == null) {
          app.router.on('eventsFetched', function() {
            new EventDetail({model: app.eventsCollection.get(eid)}).render();
          })
        } else {
          new EventDetail({model: app.eventsCollection.get(eid)}).render();
        }
        this.currentPage = "eventdetail:" + eid;
      }
    },
    goViewMessage: function(mid) {
      if(this.currentPage != "viewMessage:" + mid) {
        if(this.currentPage == null) {
          app.router.on('messagesFetched', function() {
            new MessageView({model: app.messageCollection.get(mid)}).render();
          })
        } else {
          new MessageView({model: app.messageCollection.get(mid)}).render();
        }
        this.currentPage = "viewMessage:" + mid;
      }
    },
    goNewMessage: function() {
      if(this.currentPage != "newMessage") {
        if(this.currentPage == null) {
          app.router.on('usersFetched', function() {
            new NewMessageView({collection: app.usersCollection}).render();
          })
        } else {
          new NewMessageView({collection: app.usersCollection}).render();
        }
        this.currentPage = "newMessage";
      }
    },
    goAdminHome: function() {
      if(!app.router.user.isValid()) {
        Backbone.history.navigate('/', {trigger: true});
      }
      Backbone.history.navigate('admin');
      if(this.currentPage != "adminHome") {
        new AdminHome().render();
        this.currentPage = "adminhome";
      }
    }
  });

  module.exports = Layout;
});