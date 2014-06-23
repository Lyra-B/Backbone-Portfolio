require 'spec_helper'

describe UsersController do

	context "Given some users" do
		before do
			3.times do 
				User.create(:name => "Dan", :image_url => "/image.jpg", 
				:bio => Faker::Company.bs, :mission => Faker::Company.catch_phrase)
			end
		end

		context "using JSON format" do
			describe "GET to /users" do
				before do
					get :index, :format => :json
				end

				it "should give us some JSON with all the users" do
					expect(response.content_type).to eq("application/json")
					expect(response.status).to eq(200)
					expect(JSON(response.body).length).to eq(3)
				end
			end
		end

		context "using HTML format" do
			describe "GET to /users" do
				before do
					get :index
				end

				it "should give us some JSON with all the users" do
					expect(response.content_type).to eq("text/html")
					expect(response.status).to eq(200)					
				end
			end
		end

	end

	describe "POST to /users" do
		before do
			@bs = Faker::Company.bs
			@m = Faker::Company.catch_phrase

			params = {
				user: {
					name: "Dan",
					image_url: "/lovely_picture.jpg",
					bio: @bs, 
					mission: @m
				}
			}

			post :create, params
		end

		it "should set attributes on a user" do
			expect(assigns(:user).name).to eq("Dan")
			expect(assigns(:user).image_url).to eq("/lovely_picture.jpg")
			expect(assigns(:user).bio).to eq(@bs)
			expect(assigns(:user).mission).to eq(@m)
		end

		it "should save a user in the database" do
			expect(User.count).to eq(1)
		end

		it "should give us some JSON with the just added user" do
			expect(response.content_type).to eq("application/json")
			expect(response.status).to eq(200)				
		end

		it "should return valid JSON" do
			expect(Proc.new do
				json = JSON(response.body)
				expect(json["id"]).to_not be_nil
				expect(json["name"]).to eq("Dan")
			end).to_not raise_error
		end
	end
end
