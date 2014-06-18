app.models.User = Backbone.Model.extend({

	localStorage: new Backbone.LocalStorage('portfolio-user'),

	validate: function() {
		var errors = { messages: [] };

		if(!(this.get('name'))) {
			errors.messages.push("Please fill in your name");
			return errors;
		}
	}

});