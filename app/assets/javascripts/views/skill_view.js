app.views.SkillView = Backbone.View.extend({
  tagName: 'li',
  className: 'skill',
  template: JST['templates/skill'],
  events: {
    'dblclick .name': 'editSkillName',
    'change .edit-skillname': 'updateSkillName',
    'click .delete': 'removeSkill'
  },

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    console.log("render skill view");
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  editSkillName: function() {
    this.$el.addClass('editing');
    this.$el.find('.edit-skillname').show().focus().prev('span').hide().prev('span').hide();
  },

  updateSkillName: function(e) {
    var newSkillname = $(e.currentTarget).val().trim();
    this.model.set('name', newSkillname);
    this.attributes.project.save();
    // this.collection.trigger("add");
    e.stopPropagation();
  },

  removeSkill: function(e) {
    this.model.destroy();
  },

  remove: function(e) {
    this.$el.fadeOut(3000).html("");
  }

});