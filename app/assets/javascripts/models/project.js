app.models.Project = Backbone.Model.extend({

  url: 'http://localhost:3000/projects',

  validate: function() {
    if(this.attributes.url === "" || this.attributes.url === undefined) {
      return "URL can't be blank";
    };

    if(this.attributes.title === "" || this.attributes.title === undefined) {
      return "Title can't be blank";
    };
  }

});