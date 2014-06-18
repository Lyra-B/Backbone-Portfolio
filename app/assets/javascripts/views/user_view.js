app.views.UserView = Backbone.View.extend({

	el: "#user",
	template: _.template($('#user-template').html()),
	events: {
		"dblclick h1.name": "editName",
		"change .edit-name": "updateName"
	},

	render: function() {
		// Create a dummy project if there isn't one already
	  if(this.model.projects.length == 0) {
	    // Create a blank project for us to fill in.
	    this.model.projects.add({
	      title: "New Project",
	      url: "Click to edit",
	      body: "Click to edit"
	    });
	  }

	  this.model.projects.each(function(project) {
	    var view = new app.views.ProjectView({ model: project });
	    $('#project-list').append(view.render().el);
	  });

		this.$el.html(this.template(this.model.attributes));
		this.listenTo(this.model, "change", this.render);
		return this;
	},

	editName: function(e) {
		$(e.currentTarget).hide().next('.edit-name').fadeIn();
	},

	updateName: function(e) {
		this.model.set('name', e.currentTarget.value);
		this.model.save();
	}

});