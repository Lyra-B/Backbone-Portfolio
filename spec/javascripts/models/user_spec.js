describe("A User", function(){
  var user;
  var someOneElse;

  beforeEach(function(){
    user = new app.models.User({
      firstName:"Glykeria",
      lastName:"Peppa",
      biography:"Junior Web Developer",
      mission: "To become a professional developer",
      imageUrl: "/public/uploads/me.jpg"
    });
  });

  it("should know the first name", function(){
    expect(user.get("firstName")).toEqual("Glykeria");
  });
  it("should know the last name", function(){
    expect(user.get("lastName")).toEqual("Peppa");
  });
  it("should know the biography", function(){
    expect(user.get("biography")).toEqual("Junior Web Developer");
  });
  it("should know the mission", function(){
    expect(user.get("mission")).toEqual("To become a professional developer");
  });
  it("should know the image url", function(){
    expect(user.get("imageUrl")).toEqual("/public/uploads/me.jpg");
  });
  it("should return the fullName", function(){
    expect(user.fullName()).toEqual("Glykeria Peppa");
  });

  describe("validations", function(){
    var invalid = new app.models.User({firstName:"", lastName: ""});
    it("should validate firstName", function(){
      expect(invalid.isValid()).toBeFalsy();
      expect(invalid.validationError).toMatch(/firstName can't be blank/);
    });

    it("should validate lastName", function(){
      expect(invalid.isValid()).toBeFalsy();
      expect(invalid.validationError).toMatch(/lastName can't be blank/);
    });
  });

  describe("projects", function(){
    beforeEach(function(){
      spyOn($, "ajax");

      user.save();
      user.projects.create({
        title: "My Amazing Project",
        url: "project.jpeg"
      });

      someOneElse = new app.models.User({
        firstName: "blah",
        lastName: "blah"
      });
      someOneElse.save;
      someOneElse.projects.create({
        title: "My second Project",
        url: "project2.jpeg"
      });
    });

    it("should save the first user via AJAX", function(){
      var firstUserSaveArgs = $.ajax.calls[0].args[0];
      expect(firstUserSaveArgs.url).toEqual("/users");
      expect(firstUserSaveArgs.type).toEqual("POST");
      expect(firstUserSaveArgs.data).toEqual(JSON.stringify(user.attributes));
    });

    it("should save the first project via AJAX", function(){
      var firstProjectSaveArgs = $.ajax.calls[1].args[0];
      expect(firstUserSaveArgs.url).toEqual("/projects");
      expect(firstUserSaveArgs.type).toEqual("POST");
      expect(firstUserSaveArgs.data).toEqual(JSON.stringify(user.projects.first));
    });

    it("should save the second user via AJAX", function(){
      var secondUserSaveArgs = $.ajax.calls[2].args[0];
      expect(secondUserSaveArgs.url).toEqual("/users");
      expect(secondUserSaveArgs.type).toEqual("POST");
      expect(secondUserSaveArgs.data).toEqual(JSON.stringify(someOneElse.attributes));
    });

    it("should save the second project via AJAX", function(){
      var secondProjectSaveArgs = $.ajax.calls[3].args[0];
      expect(secondUserSaveArgs.url).toEqual(?);
      expect(secondUserSaveArgs.type).toEqual(?);
      expect(secondUserSaveArgs.data).toEqual(JSON.stringify(someOneElse.projects.first));
    });
  });
});