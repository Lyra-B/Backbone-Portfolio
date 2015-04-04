$(document).ready(function() {
  Backbone.history.start({ pushState:true });
  var router = new app.Router();

  var path = window.location.hash.slice(1);

  //Visit the homepage
  router.navigate( path , { trigger: true });
  Backbone.history.loadUrl();
});