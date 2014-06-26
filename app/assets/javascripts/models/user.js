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
					// First, try grabbing them from Rails
					var projects = _this.projects.where({ user_id: _this.id });

					// If we don't have any, load them in from GitHub
					if(projects.length === 0) {
						_this.projects.url = "https://api.github.com/user/repos?access_token=" + _this.get('access_token');
						_this.projects.fetch({
							success: function() {
								projects = _this.projects.map(function(p) {
									return {
										title: p.attributes.name,
										project_url: p.attributes.html_url,
										body: p.attributes.description,
										user_id: _this.get('id')
									}
								});
								
								_this.projects.reset(projects);
								_this.projects.url = "/projects";
							}
						});
					}
					else {
						_this.projects.reset(projects);
					}
					
				}
			});
		}
	}

});