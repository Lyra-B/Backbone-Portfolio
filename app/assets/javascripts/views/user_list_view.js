app.views.UserListView = Backbone.View.extend({

  tagName: "ol",
  id: "user-list",
  template: _.template($('#user-list-template').html()),
  events: {
    'click .user' : 'showUser',
    'click .newUserButton' : 'newUser'
  },

  render: function() {
    var locals = { users: this.collection };
    this.$el.html(this.template(locals));
    return this;
  },

  showUser: function(e) {
    var router = new app.Router();
    var id = e.currentTarget.dataset.id;
    router.navigate("users/"+id, { trigger: true });
  },

  newUser: function(e) {
    var router = new app.Router();
    router.navigate("users/newUser", { trigger: true, replace: true});
  }



});