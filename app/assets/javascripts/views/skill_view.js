app.views.SkillView = Backbone.View.extend({

	tagName: 'li',
	className: 'skill',
	template: '<span class="name">Ruby</span><span class="delete">Remove</span>',

	events: {
		'click .delete': 'removeSkill'
	},

	render: function() {
		var name = this.model.get('name');	
		this.$el.append(this.template.replace('Ruby', name ? name : 'Edit Me'));

		return this;
  },

  removeSkill: function() {  	
  	this.model.set("_destroy", true);
  	this.collection.trigger("remove");
  }

});