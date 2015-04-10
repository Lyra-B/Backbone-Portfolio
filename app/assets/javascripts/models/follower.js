app.models.Follower = app.models.User.extend({

  url: function() {
    return "http://localhost:9292/api/v1/users/" + this.get('followed_id') + "/follows?follower_id=" + this.id;
  },

  sync: function(method, model, options) {
    // overriding method, to do POST instead of PUT.
    return Backbone.sync('create', model, options);
  }
});