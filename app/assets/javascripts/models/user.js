app.models.User = Backbone.Model.extend({

  url: '/users',

  defaults: {
    firstName: "Click to edit",
    lastName: "Click to edit",
    biography: "Click to edit",
    mission: "Click to edit",
    imageUrl: "uploads/images.png"
  },

  initialize: function() {
    this.projects = new app.collections.ProjectList();
    this.projects.user = this;
    this.bind("sync", this.fetchProjects);
  },

  fetchProjects: function() {
    if(this.id){
      this.projects.fetch();
      this.projects.reset(this.projects.where({user_id: this.id}));
      this.projects.add({
        title: "New Project",
        url: "Click to edit",
        body: "Click to edit"
      });
    }
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
