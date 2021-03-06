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
        url: "project.jpeg",
        skills_attributes: []
      });

      someOneElse = new app.models.User({
        firstName: "blah",
        lastName: "blah",
        biography: "blah",
        mission: "blah",
        imageUrl: "blah"
      });
      someOneElse.save();
      someOneElse.projects.create({
        title: "My second Project",
        url: "project2.jpeg",
        skills_attributes: []
      });
    });

    it("should save the first user via AJAX", function(){
      var firstUserSaveArgs = $.ajax.calls.argsFor(0)[0];
      expect(firstUserSaveArgs.url).toEqual("/users");
      expect(firstUserSaveArgs.type).toEqual("POST");
      expect(firstUserSaveArgs.data).toEqual(JSON.stringify({
        user: {first_name:"Glykeria",
          last_name:"Peppa",
          biography:"Junior Web Developer",
          mission: "To become a professional developer",
          image_url: "/public/uploads/me.jpg"
        }
      }));
    });

    it("should save the first project via AJAX", function(){
      var firstProjectSaveArgs = $.ajax.calls.argsFor(1)[0];
      expect(firstProjectSaveArgs.url).toEqual("/projects");
      expect(firstProjectSaveArgs.type).toEqual("POST");
      expect(firstProjectSaveArgs.data).toEqual(JSON.stringify({
          project: {
          title:"My Amazing Project",
          url: "project.jpeg",
          user_id: user.id,
          skills_attributes: []
        }
      }));
    });

    it("should save the second user via AJAX", function(){
      var secondUserSaveArgs = $.ajax.calls.argsFor(2)[0];
      expect(secondUserSaveArgs.url).toEqual("/users");
      expect(secondUserSaveArgs.type).toEqual("POST");
      expect(secondUserSaveArgs.data).toEqual(JSON.stringify({
        user: {
          first_name: "blah",
          last_name: "blah",
          biography: "blah",
          mission: "blah",
          image_url: "blah"
        }}));
    });

    it("should save the second project via AJAX", function(){
      var secondProjectSaveArgs = $.ajax.calls.argsFor(3)[0];
      expect(secondProjectSaveArgs.url).toEqual("/projects");
      expect(secondProjectSaveArgs.type).toEqual("POST");
      expect(secondProjectSaveArgs.data).toEqual(JSON.stringify({
          project: {
          title:"My second Project",
          url: "project2.jpeg",
          user_id: someOneElse.id,
          skills_attributes: []
        }
      }));
    });
  });
});