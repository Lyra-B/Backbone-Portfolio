app.models.Skill = Backbone.Model.extend({

  toJSON: function() {
    var params = {
      skill: {
        name: this.get('name'),
        project_id: this.get('projectId')      }
    };
    return params;
  },

  parse: function(response){
    return{
      id: response.id,
      projectId: response.project_id,
      name: response.name,
    };
  }

});
