describe("user list view", function() {
  var view;
  var users;

  beforeEach(function() {
    users = new app.collections.UserList([{}, {}, {}]);

    view = new app.views.UserListView({
      collection: users
    });
  });

  describe("render function", function() {
    beforeEach(function() {
      view.render();
    });

    it("should create a div with a class user", function() {
      expect(view.el.nodeName).toEqual("OL");
      expect(view.el.id).toEqual("user-list");
    });

    it("should render the user template", function() {
      expect(view.$el.find("li.user").length).toBe(3);
    });

    it("should return the view", function() {
      expect(view.render()).toEqual(view);
    });
  });
});