app.models.User = Backbone.Model.extend({

	localStorage: new Backbone.LocalStorage('portfolio-user'),

	defaults: {
		name: null,
		bio: null,
		mission: null,
		image_url: null
	},

	initialize: function() {
		this.projects = new app.collections.ProjectList();
	},

	validate: function() {
		var errors = { messages: [] };

		if(!(this.get('name'))) {
			errors.messages.push("Please fill in your name");
			return errors;
		}
	}

});