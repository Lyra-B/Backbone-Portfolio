app.views.UserView = Backbone.View.extend({

	el: "#user",
	template: _.template($('#user-template').html()),

	render: function() {
		this.el = this.template(this.model.attributes);	
		return this;
	}

});