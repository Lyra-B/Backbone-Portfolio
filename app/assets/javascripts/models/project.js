app.models.Project = Backbone.Model.extend({

  urlRoot: '/projects',

  validate: function() {
    if(this.attributes.url === "" || this.attributes.url === undefined) {
      return "URL can't be blank";
    };

    if(this.attributes.title === "" || this.attributes.title === undefined) {
      return "Title can't be blank";
    };
  },

  toJSON: function() {
    var params = {
      project: {
        title: this.get('title'),
        url: this.get('url')
      }
    };
    return params;
  }

});