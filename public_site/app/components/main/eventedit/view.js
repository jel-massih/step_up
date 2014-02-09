define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var Event = require("../home/events/model")

  var EventDetail = Backbone.Layout.extend({
    template: require("ldsh!./template"),
    el:"#NewWrapper",
    serialize: function() {
      return {model: this.model};
    },
    initialize: function() {
      console.log(this.model);
      if(!this.model) {
        this.model = new Event({});
      }
      this.listenTo(this.model, "change", this.render);
    },
    events: {
      "click #editEvent": "UpdateEvent"
    },
    UpdateEvent: function(e) {
      e.preventDefault();
      var name = $('#nameInput').val();
      var desc = $('#descriptionInput').val();
      var date = $('#dateInput').val();
      var time = $('#timeInput').val();
      var loc = $('#eventcity').val();

      var obj = {"event_name":name,"event_desc":desc,"event_loc":loc,"event_start_date":date,"event_start_time":time};

      if(!this.model) {
        var PassModel = new Password(obj);
        this.model = PassModel;
      } else {
        this.model.set(obj);
      }

      if(!this.model.isValid()) {
        $('.alert-error').text(this.model.validationError).show();
      } else {
        this.model.save({}, {
          error: function(model, xhr, options) {
            $('.alert-error').text("Ooops Something went wrong! Try again later.").show();
          },
          success: function(model, response, options) {
            if(response.error) {
              $('.alert-error').text(response.error.text).show();
            } else {
              console.log(app);
              app.eventsCollection  .fetch();
              Backbone.history.navigate("/", {trigger:true});
            }
          }
        });
      }
    }
  });

  module.exports = EventDetail;
});