app.models.User = Backbone.Model.extend({

	urlRoot: "/users",

	initialize: function() {
		this.projects = new app.collections.ProjectList();
		this.projects.user = this;
		this.bind("sync", this.fetchProjects);
	},

	validate: function() {
		var errors = { messages: [] };

		if(!(this.get('name'))) {
			errors.messages.push("Please fill in your name");
			return errors;
		}
	},

	fetchProjects: function() {
		if(this.id) {
			var _this = this;
			this.projects.fetch({ 
				success: function() {
					_this.projects.reset(_this.projects.where({ user_id: _this.id }));
				}
			});
		}
	}

});