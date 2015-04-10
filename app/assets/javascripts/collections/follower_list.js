app.collections.FollowerList = Backbone.Collection.extend({

  url: function() {
    return "http://localhost:9292/api/v1/users/" + this.user.id + "/follows"
  },

  model: app.models.Follower

});