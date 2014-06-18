app.views.UserView = Backbone.View.extend({

	el: "#user",
	template: _.template($('#user-template').html()),
	events: {
		"dblclick h1.name": "editName",
		"change .edit-name": "updateName"
	},

	render: function() {
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