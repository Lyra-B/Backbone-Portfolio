$(document).ready(function() {
	console.log(Backbone.history.start());
	var router = new app.Router();
	router.navigate("users", {trigger: true});
});