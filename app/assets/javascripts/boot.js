$(document).ready(function() {
	console.log(Backbone.history.start({ pushState: true }));
	var router = new app.Router();
	router.navigate("users", {trigger: true});
});