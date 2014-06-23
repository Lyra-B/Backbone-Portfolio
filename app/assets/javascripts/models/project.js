app.models.Project = Backbone.Model.extend({

  url: "/projects",

  initialize: function() {
  	this.skills = new app.collections.SkillList();
  },
  
  validate: function() {
    if(this.attributes.url === "" || this.attributes.url === undefined) {
      return "URL can't be blank";
    };

    if(this.attributes.title === "" || this.attributes.title === undefined) {
      return "Title can't be blank";
    };
  },

  parse: function(response) {
  	var _this = this;

  	_(response.skills).each(function(skill) {
  		_this.skills.add(skill);
  	});

  	return response;
  }

});