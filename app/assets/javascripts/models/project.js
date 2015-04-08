app.models.Project = Backbone.Model.extend({

  urlRoot: '/projects',

  initialize: function(){
    if(!this.skills) this.skills = new app.collections.SkillList();
    this.listenTo(this.skills, "add", this.save)
    // this.skills.project = this
    // this.bind("sync", this.fetchSkills);
  },

  validate: function() {
    if(this.attributes.title === "" || this.attributes.title === undefined) {
      return "Title can't be blank";
    };
    if(this.attributes.url === "" || this.attributes.url === undefined) {
      return "Url can't be blank";
    };
  },


  toJSON: function() {
    var params = {
      project: {
        title: this.get('title'),
        body: this.get('body'),
        url: this.get('url'),
        image_url: this.get('imageUrl'),
        user_id: this.get('userId'),
        skills_attributes: this.skills.toJSON()      }
    };
    return params;
  },


  parse: function(response){
    if(!this.skills) this.skills = new app.collections.SkillList(response.skills);
    this.skills.reset(response.skills, {silent:true});
    return{
      id: response.id,
      userId: response.user_id,
      title: response.title,
      body: response.body,
      url: response.url,
      imageUrl: response.image_url
      // skills_attributes: response.skills
    };
    // response.imageUrl = response.image_url;
    // delete(response.image_url);
    // if(!this.skills) this.skills = new app.collections.SkillList(response.skills);
    // this.skills.reset(response.skills, silent: true);
    // response.skills = new app.collections.SkillList(response.skills);
    // return response;
  }

});