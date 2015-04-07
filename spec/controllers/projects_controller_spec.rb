require 'rails_helper'

RSpec.describe ProjectsController, type: :controller do
  describe "Given some projects" do
    before do
      Project.create!(:title => "Bucketlist", :url => "bucketlist.jpeg")
    end

    describe "GET to index" do
      before do
        get :index
      end

      it "should return JSON of the projects" do
        expect(response.status).to eq(200)
        expect(response.content_type).to eq('application/json')

        json = JSON(response.body)
        expect(json.length).to eq(1)

        expect(json.first["title"]).to eq("Bucketlist")
        expect(json.first["url"]).to eq("bucketlist.jpeg")
      end
    end
  end

  describe("POST to create") do
    before do
      @user = User.create!(:first_name => "Glykeria", :last_name => "Peppa")
      params = {
        project: {
          title:"Blah",
          url: "Blah",
          user_id: @user.id,
          skills_attributes: [{:name => "Ruby"}, {:name => "Javascript"}]
        }
      }

      post :create, params
    end

    it("should save the project") do
      expect(Project.count).to eq(1)
      expect(@user.projects.count).to eq(1)
    end

    it("should save the skills") do
      expect(assigns[:project].skills.count).to eq(2)
      expect(assigns[:project].skills.first.name).to eq("Ruby")
      expect(assigns[:project].skills.second.name).to eq("Javascript")
    end

    it("should return a valid JSON") do
      expect(response.status).to eq(201)
      expect(response.content_type).to eq("application/json")
    end

    it("should set the user id") do
      expect(assigns[:project].user_id).to eq(@user.id)
    end
  end
end
