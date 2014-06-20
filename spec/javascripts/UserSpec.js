describe("A User", function() {
  var user;

	beforeEach(function() {
		user = new app.models.User({
			name: "Dan",
			bio: "Badass web dev",
			mission: "To save the world",
			image_url: "/image.jpg"
		});

		spyOn($, "ajax");
	});

	describe("projects", function() {
		beforeEach(function() {
			var someoneElse = new app.models.User({ name: "Bob" });
			someoneElse.save();
			someoneElse.projects.create({ title : "Test",
				url: '/' });

			var project = new app.models.Project({
				title: "My Amazing Project",
				url: '/'
			});
			user.save();
			user.projects.create(project);
		});

		it("should persist the users via AJAX", function() {
			var lastAjaxCallArgs = $.ajax.calls[0].args[0];
			expect(lastAjaxCallArgs.url).toEqual("/users");
			expect(lastAjaxCallArgs.type).toEqual("POST");
			expect(lastAjaxCallArgs.data).toEqual(JSON.stringify({name: "Bob"}));

			var lastAjaxCallArgs = $.ajax.calls[1].args[0];
			expect(lastAjaxCallArgs.url).toEqual("/projects");
			expect(lastAjaxCallArgs.type).toEqual("POST");
			expect(lastAjaxCallArgs.data).toEqual(JSON.stringify({title: "Test", url: '/'}));

			var lastAjaxCallArgs = $.ajax.calls[2].args[0];
			expect(lastAjaxCallArgs.url).toEqual("/users");
			expect(lastAjaxCallArgs.type).toEqual("POST");
			expect(lastAjaxCallArgs.data).toEqual(JSON.stringify({
				name: "Dan",
				bio: "Badass web dev",
				mission: "To save the world",
				image_url: "/image.jpg"
			}));

			var lastAjaxCallArgs = $.ajax.calls[3].args[0];
			expect(lastAjaxCallArgs.url).toEqual("/projects");
			expect(lastAjaxCallArgs.type).toEqual("POST");
			expect(lastAjaxCallArgs.data).toEqual(JSON.stringify({title: "My Amazing Project", url: '/'}));
		});

		// it("should store the projects as well", function() {
		// 	// Force the user to be reloaded from the backing store
		// 	saved_user = new app.models.User({ id: user.id });
			
		// 	saved_user.fetch();
		// 	expect(saved_user.projects.length).toEqual(1);
		// });
	});

	describe("validation", function() {
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