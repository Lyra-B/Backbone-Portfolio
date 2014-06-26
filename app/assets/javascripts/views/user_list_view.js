app.views.UserListView = Backbone.View.extend({
	el: "#content",
	template: JST['templates/user_list'],

	events: {
		"click .profile-link": "showProfile",
		"click .follow-link": "followUser"
	},

	render: function() {
		this.$el.html(this.template({ users: this.collection }));
		return this;
	},

	showProfile: function(e) {
		var link = $(e.currentTarget);
		var user_id = link.data('user-id');
		var router = new app.Router();
		router.navigate("users/" + user_id, { trigger: true });
		e.preventDefault();
	},

	followUser: function(e) {
		e.preventDefault();

		var link = $(e.currentTarget);
		var user_id = link.data('user-id');

		// TODO - Get this from somewhere...
		var my_id = 13;

		var followed = new app.models.Follow({ 
			followed_id: user_id, 
			follower_id: my_id 
		});

		followed.save({}, {
			success: function(user) {
				$('a.follow-link[data-user-id=13]').html("Following");
			}
		});

	}
	
});