app.models.User = Backbone.Model.extend({

  urlRoot: '/users',

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
  },

  toJSON: function() {
    var params = {
      user: {
        first_name: this.get('firstName'),
        last_name: this.get('lastName'),
        biography: this.get('biography'),
        mission: this.get('mission'),
        image_url: this.get('imageUrl')
      }
    };

    return params;
  },

  parse: function(response){
    return{
      id: response.id,
      firstName: response.first_name,
      lastName: response.last_name,
      biography: response.biography,
      mission: response.mission,
      imageUrl: response.image_url
    };
  }
});
