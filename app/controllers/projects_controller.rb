class ProjectsController < ApplicationController

  def create
    project = Project.new(allowed_params)

    if project.save
      render :json => project, :status => 201
    else
      render :status => 500
    end
  end

  def index
    render :json => Project.all
  end

  private
  def allowed_params
    params.require(:project).permit(:title, :url, :user_id)
  end

end
