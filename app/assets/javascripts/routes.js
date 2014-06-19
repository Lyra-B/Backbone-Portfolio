app.Router = Backbone.Router.extend({

	routes: {
		"": "userIndex",
		"users": "userIndex",
		"users/:id": "userShow"
	},

	userIndex: function() {
		var users = new app.collections.UserList();
	  users.fetch();
	  if(users.length == 0) users.add({});

	  var userIndexView = new app.views.UserListView({ collection : users });
	  userIndexView.render();
	},

	userShow: function(id) {
		var user = new app.models.User({id: id});
	  user.fetch();

	  var userView = new app.views.UserView({ model: user });
	  userView.render();
	}
});