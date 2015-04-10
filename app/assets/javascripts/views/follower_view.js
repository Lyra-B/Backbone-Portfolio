app.views.FollowerView = Backbone.View.extend({
  tagName: 'li',
  className: 'follower',
  template: JST['templates/followers'],
  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },
});