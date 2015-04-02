// describe("user view", function(){
//   var view;

//   beforeEach(function() {

//     view = new app.views.UserView({ model: user });
//   });

//   describe("render function", function(){
//     beforeEach(function() {
//       view.render();
//     })
//   });

//   it("should create a div with a class user", function(){
//     expect(view.el.nodeName).toEqual("DIV");
//     expect(view.el.id).toEqual("bio-template");
//     expect(view.el.getAttribute("class")).toEqual("user");
//   });

//   it("should render the user template", function() {
//     expect(view.$el.find(".bio-text").length).toBeGreaterThan(0);
//   });

//   it("should should return the view", function(){
//     expect(view.render()).toEqual(view)
//   });


// });