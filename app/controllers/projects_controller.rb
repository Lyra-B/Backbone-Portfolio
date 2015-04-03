class ProjectsController < ApplicationController

  def create
    @project = Project.new(allowed_params)

    if @project.save
      render :json => @project, :status => 201
    else
      render :status => 500
    end
  end

  def index
    render :json => Project.where(:user_id => params[:user_id])
  end

  def update
    @user = User.find(params[:id])
    @project = Project.update(allowed_params)
    render nothing: true
  end

  private
  def allowed_params
    params.require(:project).permit(:title, :body, :image_url, :url, :user_id)
  end

end
