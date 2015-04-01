app.models.User = Backbone.Model.extend({

  localStorage: new Backbone.LocalStorage('user'),

  defaults: {
    firstName: "Click to edit",
    lastName: "Click to edit",
    biography: "Click to edit",
    mission: "Click to edit",
    imageUrl: "uploads/3518a31.jpg"
  },

  fullName: function() {
    return [this.get("firstName"), this.get("lastName")].join(" ");
  },

  validate: function(attributes) {
      var errors = [];
    if(attributes.firstName === "" || attributes.firstName === undefined){
      errors.push("firstName can't be blank");
    }
    if(attributes.lastName === "" || attributes.lastName === undefined){
      errors.push("lastName can't be blank");
    }
    return errors.length ? errors : undefined;
  }
});
