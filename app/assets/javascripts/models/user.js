app.models.User = Backbone.Model.extend({

  localStorage: new Backbone.LocalStorage('user'),

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
