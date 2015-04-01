app.views.UserView = Backbone.View.extend({
  tagName: "div",
  id: "bio",
  template: _.template($('#bio').html()),
  events: {
    'dblclick .name': 'editName',
    'change .edit-name': 'updateName',
    'dblclick .bio': 'editBio',
    'change .edit-bio': 'updateBio',
    'dblclick .mission': 'editMission',
    'change .edit-mission': 'updateMission'
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.listenTo(this.model, "change", this.render);
    return this;
  },

  editName: function() {
    this.$el.addClass('editing');
    this.$el.find('.edit-name').show().focus().prev('h1').hide();
  },

  editBio: function() {
    this.$el.addClass('editing');
    this.$el.find('.edit-bio').show().focus().prev('h2').hide();
  },

  editMission: function() {
    this.$el.addClass('editing');
    this.$el.find('.edit-mission').show().focus().prev('h3').hide();
  },

  updateName: function(e) {
    var new_name = $(e.currentTarget).val().trim();
    this.model.set('firstName', new_name);
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
  }
});