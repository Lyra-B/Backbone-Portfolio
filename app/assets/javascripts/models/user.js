app.models.User = Backbone.Model.extend({

	defaults: {
		name: null,
		bio: null,
		mission: null,
		image_url: null
	},

	validate: function() {
		var errors = { messages: [] };

		if(!(this.get('name'))) {
			errors.messages.push("Please fill in your name");
			return errors;
		}
	}

});