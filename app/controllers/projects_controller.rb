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
    # @user = User.find(params[:user_id])
    render :json => Project.where(:user_id => params[:user_id])
  end

  private
  def allowed_params
    params.require(:project).permit(:title, :url, :user_id)
  end

end
