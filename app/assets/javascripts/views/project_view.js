app.views.ProjectView = Backbone.View.extend({

  tagName: 'div',
  className: 'project',
  template: _.template($('#project-template').html()),
  events: {
    'dblclick .project-name': 'editProjectName',
    'change .edit-title': 'updateTitle',
    'dblclick .url': 'editUrl',
    'change .edit-url': 'updateUrl',
    'dblclick .body': 'editBody',
    'change .edit-body': 'updateBody',
    'click .remove-project': 'removeProject'
  },

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "destroy", this.remove);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes)); //attributes?
    return this;
  },

  editProjectName: function() {
    this.$el.addClass('editing');
    this.$el.find('.edit-title').show().focus().prev('h3').hide();
  },

  editUrl: function() {
    this.$el.addClass('editing');
    this.$el.find('.edit-url').show().focus();
    this.$el.find('.url').hide();

  },

  editBody: function() {
    this.$el.addClass('editing');
    this.$el.find('.edit-body').show().focus().prev('.body').hide();
  },

  updateTitle: function(e) {
    var new_title = $(e.currentTarget).val().trim();
    this.model.set('title', new_title);
    this.model.save();
    this.model.user.fetchProjects();
  },

  updateUrl: function(e) {
    var new_url = $(e.currentTarget).val().trim();
    this.model.set('url', new_url);
    this.model.save();
  },

  updateBody: function(e) {
    var new_body = $(e.currentTarget).val().trim();
    this.model.set('body', new_body);
    this.model.save();
  },

  removeProject: function(e) {
    this.model.destroy();
  },

  remove: function(e) {
    this.$el.fadeOut(3000).html("");
  }
});