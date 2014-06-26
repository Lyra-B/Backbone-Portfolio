app.models.Follow = Backbone.Model.extend({

	url: function() {
		return 'http://localhost:9292/api/1.1.0/users/' + this.get('followed_id') + '/follows';
	}

});