class ProjectsController < ApplicationController
	def index
		render :json => Project.all.as_json(Project.default_json_options)
	end

	def create
		@project = Project.create!(allowed_params)
		render :json => @project
	end

	private 
	def allowed_params
		params.require(:project).permit(:title, :url, :body, :image_url)
	end
end
