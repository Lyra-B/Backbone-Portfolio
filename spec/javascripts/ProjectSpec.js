describe("A Project", function() {

  var project;

  beforeEach(function() {
    project = new app.models.Project({
      title: "My amazing test project",
      url: "http://example.org",
      userId: 1
    });

    project.skills.add([
      {name: "Ruby"},{name: "Javascript"}
      ]);
  });

  it("should be able to retrieve the title", function() {
    expect(project.get("title")).toEqual("My amazing test project");
  });

  it("should not have an id because its not persisted", function() {
    expect(project.id).toBeUndefined();
  });

  it("should have a cid", function() {
    expect(project.cid).not.toBe(null);
  });

  describe("Persistance via Ajax", function() {
    beforeEach(function() {
      spyOn($, "ajax");
      // project.skills.add([{name: "Ruby"}, {name: "Javascript"}]);
      project.save();
    });

    it("should have an id", function() {
      expect(project.id).not.toBe(null);
    });

    it("should save the first project via AJAX", function(){
      var args = $.ajax.calls.argsFor(0)[0];
      expect(args.url).toEqual("/projects");
      expect(args.type).toEqual("POST");
      expect(args.data).toEqual(JSON.stringify({
        project: {
          title: "My amazing test project",
          url: "http://example.org",
          user_id: 1,
          skills_attributes: [{name: "Ruby"}, {name: "Javascript"}]
        }
      }));
    });

  });

  describe("validation", function() {
    beforeEach(function() {
      project = new app.models.Project({
        title: "My amazing test project",
        url: ""
      });
    });

    it("should not be valid without a URL", function() {
      expect(project.isValid()).toBeFalsy();
    });
  });

});