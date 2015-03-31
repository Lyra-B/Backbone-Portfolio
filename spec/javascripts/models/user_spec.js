describe("A User", function(){
  var user;

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
    var invalid = new app.models.User();
    it("should validate firstName", function(){
      expect(invalid.isValid()).toBeFalsy();
      expect(invalid.validationError).toMatch(/firstName can't be blank/);
    });

    it("should validate lastName", function(){
      expect(invalid.isValid()).toBeFalsy();
      expect(invalid.validationError).toMatch(/lastName can't be blank/);
    });
  });


});