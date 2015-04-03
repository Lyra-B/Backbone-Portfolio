app.views.UserView = Backbone.View.extend({
  tagName: "div",
  id: "user",
  className: "user",
  template: JST['templates/bio'],
  events: {
    'dblclick .first': 'editName',
    'change .edit-name': 'updateName',
    'dblclick .last': 'editLastName',
    'change .edit-lastname': 'updateLastName',
    'dblclick .bio': 'editBio',
    'change .edit-bio': 'updateBio',
    'dblclick .mission': 'editMission',
    'change .edit-mission': 'updateMission',
    'dblclick .bio-image': 'editImage',
    'change .edit-image': 'updateImage'
  },

  initialize: function(){
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model.projects, "reset", this.render);
  },

  render: function() {
    console.log("render user view")
    this.$el.html(this.template({user: this.model}));
    this.listenTo(this.model, "change", this.render);
    var projectListView = new app.views.ProjectListView({
      collection: this.model.projects
    });

    this.$el.append(projectListView.render().el);
    return this;
  },

  editName: function() {
    this.$el.addClass('editing');
    this.$el.find('.edit-name').show().focus();
    this.$el.find('.first').hide();
  },

  editLastName: function() {
    this.$el.addClass('editing');
    this.$el.find('.edit-lastname').show().focus();
    this.$el.find('.last').hide();
  },

  editBio: function() {
    this.$el.addClass('editing');
    this.$el.find('.edit-bio').show().focus().prev('h2').hide();
  },

  editMission: function() {
    this.$el.addClass('editing');
    this.$el.find('.edit-mission').show().focus().prev('h3').hide();
  },

  editImage: function() {
    this.$el.addClass('editing');
    this.$el.find('.edit-image').show().focus().prev('img').hide();
  },

  updateName: function(e) {
    var new_name = $(e.currentTarget).val().trim();
    this.model.set('firstName', new_name);
    this.model.save();
  },

  updateLastName: function(e) {
    var new_lastname = $(e.currentTarget).val().trim();
    this.model.set('lastName', new_lastname);
    this.model.save();
  },

  updateBio: function(e) {
    var new_bio = $(e.currentTarget).val().trim();
    this.model.set('biography', new_bio);
    this.model.save();
  },

  updateMission: function(e) {
    var new_mission = $(e.currentTarget).val().trim();
    this.model.set('mission', new_mission);
    this.model.save();
  },

  updateImage: function(e) {
    var new_image = $(e.currentTarget).val().trim();
    this.model.set('imageUrl', new_image);
    this.model.save();
  }
});

