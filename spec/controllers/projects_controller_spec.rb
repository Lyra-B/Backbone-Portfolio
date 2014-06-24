require 'spec_helper'

describe ProjectsController do
	context "Given some projects" do
		before do
			%w(Ruby Backbone RSpec).each do |skill|
				p = Project.create!(:title => Faker::Lorem.sentence, :image_url => "/image.jpg", 
				:body => Faker::Lorem.words(50).join(" "))
				p.skills << Skill.new(:name => skill)
			end
		end

		describe "GET to /projects" do
			before do
				get :index
			end

			it "should give us some JSON with all the projects" do
				expect(response.content_type).to eq("application/json")
				expect(response.status).to eq(200)
				expect(JSON(response.body).length).to eq(3)
			end

			it "should also fetch the associated Skills" do
				projects = JSON(response.body)
				skills = projects.first["skills"]		
				expect(skills.length).to eq(1)
				expect(skills.first["name"]).to eq("Ruby")
			end
		end

	end

	describe "POST to /projects" do
		before do
			@title = Faker::Lorem.sentence
			@body = Faker::Lorem.words(50).join(" ")

			params = {
				project: {
					:title => @title, 
					:image_url => "/image.jpg", 
					:body => @body
				}
			}

			post :create, params
		end

		it "should set attributes on a user" do
			expect(assigns(:project).title).to eq(@title)
			expect(assigns(:project).image_url).to eq("/image.jpg")
			expect(assigns(:project).body).to eq(@body)
		end

		it "should save a user in the database" do
			expect(Project.count).to eq(1)
		end

		it "should give us some JSON with the just added user" do
			expect(response.content_type).to eq("application/json")
			expect(response.status).to eq(200)				
		end

		it "should return valid JSON" do
			expect(Proc.new do
				json = JSON(response.body)
				expect(json["id"]).to_not be_nil
				expect(json["title"]).to eq(@title)
				expect(json["skills"]).to be
			end).to_not raise_error
		end
	end

	describe "PUT to /projects/:id" do
		before do
			@skill = Skill.new(:name => "Nested Attributes")
			@php = Skill.new(:name => "PHP")
			@project = Project.create!(:title => "My Amazing Project")
			@project.skills << @skill
			@project.skills << @php

			params = {
				id: @project.id,
				project: {
					title: "Updated Project",
					skills_attributes: [
						{ name: 'Ruby' },
						{ name: 'RSpec'},
						{ name: 'Cucumber'},
						{ id: @skill.id, name: 'Nested Attributes Rock'},
						{ id: @php.id, :_destroy => '1' }
					]
				}	
			}

			put :update, params

			@project.reload
		end

		it "should update the project" do
			expect(@project.title).to eq("Updated Project")
		end

		it "should also create associated skills" do
			expect(@project.skills.length).to eq(4)
			expect(@project.skills.first.name).to eq("Ruby")
			expect(@project.skills.second.name).to eq("RSpec")
			expect(@project.skills.third.name).to eq("Cucumber")
		end

		it "should also update associated skills" do
			expect(@skill.reload.name).to eq("Nested Attributes Rock")
		end

		it "should also delete associated skills" do
			expect(Skill.find_by_id(@php.id)).to be_nil
		end
	end
end

