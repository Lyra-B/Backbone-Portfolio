require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe "Given some users" do
    before do
      User.create!(:first_name => "Glykeria", :last_name => "Peppa")
    end

    describe "GET to index" do
      before do
        get :index
      end

      it "should return JSON of the users" do
        expect(response.status).to eq(200)
        expect(response.content_type).to eq('application/json')
        json = JSON(response.body)
        expect(json.length).to eq(1)

        expect(json.first["first_name"]).to eq("Glykeria")
        expect(json.first["last_name"]).to eq("Peppa")
      end
    end
  end

  describe "POST to create" do
    before do
      params = {
        user: {
          first_name:"Glykeria",
          last_name:"Peppa",
          biography:"Junior Web Developer",
          mission: "To become a professional developer",
          image_url: "/public/uploads/me.jpg"
        }
      }
      post :create, params
    end

    it "should create a user" do
      expect(User.count).to eq(1)
    end

    it "should return valid JSON" do
      expect(response.status).to eq(201)
      expect(response.content_type).to eq("application/json")
    end
  end
end
