app.views.UserView = Backbone.View.extend({

	el: "#content",
	template: _.template($('#user-template').html()),
	events: {
		"dblclick h1.name": "editName",
		"change .edit-name": "updateName"
	},

	render: function() {
		// Render the user bio section
		var _this = this;
		$('#user-list').slideUp(400, function() {
			_this.$el.html(_this.template(_this.model.attributes)).hide();

			// Create a dummy project if there isn't one already
		  if(_this.model.projects.length == 0) {
		    // Create a blank project for us to fill in.
		    _this.model.projects.add({
		      title: "New Project",
		      url: "Click to edit",
		      body: "Click to edit"
		    });
		  }
		  
		  // Render each project... sort of like a partial...
		  _this.model.projects.each(function(project) {
		    var view = new app.views.ProjectView({ model: project });
		    $('#project-list').append(view.render().el);
		  });

		  // Redraw the page if the user model changes
			_this.listenTo(_this.model, "change", _this.render);

			_this.$el.slideDown();
			
			return _this;
		});
		
	},

	editName: function(e) {
		$(e.currentTarget).hide().next('.edit-name').fadeIn();
	},

	updateName: function(e) {
		this.model.set('name', e.currentTarget.value);
		this.model.save();
	}

});