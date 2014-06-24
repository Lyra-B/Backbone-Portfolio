app.views.UserView = Backbone.View.extend({

	el: "#content",
	template: JST['templates/user'],
	events: {
		"dblclick h1.name": "editName",
		"change .edit-name": "updateName"
	},

	initialize: function() {
		this.listenTo(this.model.projects, "reset", this.render);
		this.listenTo(this.model, "change", this.render);
	},

	render: function() {
		// Render the user bio section
		var _this = this;
		$('#user-list').slideUp(400, function() {
			_this.showPage();
		});

		return this;
	},

	showPage: function() {
		this.$el.html(this.template(this.model.attributes)).hide();

		// Create a dummy project if there isn't one already
	  this.createDefaultProject();
	  
	  // Render each project... sort of like a partial...
	  this.model.projects.each(function(project) {
	    var view = new app.views.ProjectView({ model: project });
	    $('#project-list').append(view.render().el);
	  });

		this.$el.slideDown();
	},

	editName: function(e) {
		$(e.currentTarget).hide().next('.edit-name').fadeIn();
	},

	updateName: function(e) {
		this.model.set('name', e.currentTarget.value);
		this.model.save();
	},

	createDefaultProject: function() {
    // Create a blank project for us to fill in.
		if(this.model.projects.length == 0) {
	    this.model.projects.add({
	      title: "New Project",
	      url: "Click to edit",
	      body: "Click to edit"
	    });
	  }
	}

});