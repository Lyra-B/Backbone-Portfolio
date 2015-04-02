app.Router = Backbone.Router.extend({

  routes: {
    "": "userIndex",
    "users": "userIndex",
    "users/newUser": "userNew",
    "users/:id": "userShow"
  },

  userIndex: function() {
    var users = new app.collections.UserList();

    users.fetch({
      success: function(api_users) {
        var userList = new app.views.UserListView({ collection: api_users });
        $('#content').html(userList.render().el);
      },
      error: function() {
        console.log("Sorry!");
      }
    });
  },

  userShow: function(id) {
    var user = new app.models.User({
      id: id
    });

    user.fetch({
      success: function(api_user) {
        var userView = new app.views.UserView({ model: api_user });
        $('#content').html(userView.render().el);
      },
      error: function() {
        console.log("Sorry!")
      }
    });
  },

  userNew: function() {
    var user =  new app.models.User();
    var userView = new app.views.UserView({ model: user });
    $('#content').html(userView.render().el);
  }

});