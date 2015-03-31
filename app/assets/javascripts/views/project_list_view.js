app.views.ProjectListView = Backbone.View.extend({
  tagName: "div",
  id: "projects",
  template: _.template($('#project-list-template').html()),

  render: function() {
    this.$el.html(this.template());
    //var html = this.template();
    var _this = this;

    this.collection.each(function(project) {
      var view = new app.views.ProjectView({ model: project });
      _this.$el.find('#project-list').append(view.render().el);
    });

    return this;
  }


});
