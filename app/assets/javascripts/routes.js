app.Router = Backbone.Router.extend({

  routes: {
    "": "userIndex",
    "users": "userIndex",
    "users/newUser": "userNew",
    "users/:id": "userShow"
  },

  userIndex: function() {
    var users = new app.collections.UserList();
    users.fetch();

    var userList = new app.views.UserListView({ collection: users });
    $('#content').html(userList.render().el);
  },

  userShow: function(id) {
    var user = new app.models.User({
      id: id
    });

    user.fetch();

    var userView = new app.views.UserView({ model: user });
    $('#content').html(userView.render().el);
  },

  userNew: function() {
    var user =  new app.models.User();
    var userView = new app.views.UserView({ model: user });
    $('#content').html(userView.render().el);
  }

});