app.views.ProjectView = Backbone.View.extend({

  tagName: 'div',
  className: 'project',
  template: JST['templates/project'],
  events: {
    'dblclick .project-name': 'editProjectName',
    'change .edit-title': 'updateTitle'
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.listenTo(this.model, "change", this.render);
    return this;
  },

  editProjectName: function() {
    this.$el.addClass('editing');
    this.$el.find('.edit-title').show().focus().prev('h3').hide();
  },

  updateTitle: function(e) {
    var new_title = $(e.currentTarget).val().trim();
    this.model.set('title', new_title);
    this.model.save();
  }
});