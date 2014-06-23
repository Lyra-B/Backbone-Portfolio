$(document).ready(function() {
	// Little hack to stop running the app in test mode
	if(!window.jasmine) {
		console.log(Backbone.history.start({ pushState: true }));
		var router = new app.Router();
		router.navigate("users", {trigger: true});
	}
});