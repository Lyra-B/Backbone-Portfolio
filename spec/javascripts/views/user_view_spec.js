describe("user view", function(){
  var view;

  beforeEach(function() {

    var user = new app.models.User({
      firstName:"Glykeria",
      lastName:"Peppa",
      biography:"Junior Web Developer",
      mission: "To become a professional developer",
      imageUrl: "/public/uploads/me.jpg"
    });

    view = new app.views.UserView({ model: user });
  });

  describe("render function", function(){
    beforeEach(function() {
      view.render();
    })

    it("should create a div with a class user", function(){
      expect(view.el.nodeName).toEqual("DIV");
      expect(view.el.id).toEqual("user");
      expect(view.el.getAttribute("class")).toEqual("user");
    });

    it("should render the user template", function() {
      expect(view.$el.find(".bio-text").length).toBeGreaterThan(0);
    });

    it("should should return the view", function(){
      expect(view.render()).toEqual(view)
    });
  });


});