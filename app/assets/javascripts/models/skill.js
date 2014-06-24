app.models.Skill = Backbone.Model.extend({

	urlRoot: function() {
		return '/projects/' + this.project.id + '/skills'
	}

});