describe("A User", function() {

	describe("validation", function() {
	  var user;

		beforeEach(function() {
			user = new app.models.User({
				name: "Dan",
				bio: "Badass web dev",
				mission: "To save the world",
				image_url: "/image.jpg"
			});
		});

		it("should be valid if all the fields are filled in", function() {
			expect(user.isValid()).toBeTruthy();
		});

		it("should be invalid if I set name to be empty", function() {
			user.set("name", "");
			expect(user.isValid()).toBeFalsy();		
			expect(user.validationError.messages).toEqual(["Please fill in your name"]);
		});
	});

});