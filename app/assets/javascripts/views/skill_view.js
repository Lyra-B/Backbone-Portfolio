app.views.SkillView = Backbone.View.extend({

	tagName: 'li',
	className: 'skill',

	events: {
		'click .delete': 'removeSkill'
	},

	render: function() {
		this.$el.append('<span class="name">Ruby</span>'.replace('Ruby', this.model.get('name')))
		.append('<span class="delete">Remove</span>');

		return this;
  },

  removeSkill: function() {
  	// this.model.destroy();
  	// this.collection.remove(this.model);
  	
  }

});