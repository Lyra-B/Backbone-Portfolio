app.views.FollowerListView = Backbone.View.extend({
  tagName: "div",
  className: "followers",
  template: JST['templates/follower_list'],

  render: function() {
    this.$el.html(this.template());
    //var html = this.template();
    var _this = this;

    this.collection.each(function(follower) {
      var view = new app.views.FollowerView({ model: follower });
      _this.$el.find('.follower-list').append(view.render().el);
    });

    return this;
  }

});