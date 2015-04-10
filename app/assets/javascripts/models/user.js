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
    this.followers = new app.collections.FollowerList();
    this.followers.user = this;
    this.projects = new app.collections.ProjectList();
    this.projects.user = this;
    this.bind("sync", this.fetchProjects);
    // this.bind("sync", this.fetchFollowers);
  },


  fetchProjects: function() {
    var _this = this
    if(this.id){
      this.projects.fetch({
        success: function(projects){
          console.log("Get to projects");
          _this.projects.reset(_this.projects.models);
        }
      });
    }
  },

  // fetchFollowers: function() {
  //   var _this = this
  //   this.followers.fetch({
  //     success: function(followers){
  //       console.log("Get to followers");
  //       _this.followers.reset(_this.followers.models);
  //     }
  //   });
  // },

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

