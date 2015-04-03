app.collections.ProjectList = Backbone.Collection.extend({


  model: app.models.Project,

  url: function() {
    return "/projects?user_id=" + this.user.id;
  },

  initialize: function() {
    this.bind("add", this.setUserId);
  },

  setUserId: function(project) {
    if(this.user && this.user.id && !project.id)
      project.set("user_id", this.user.id);
  }
});