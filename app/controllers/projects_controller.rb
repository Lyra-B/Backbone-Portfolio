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
    @project = Project.find(params[:id])
    @project.update(allowed_params)
    # binding.pry
    render nothing: true
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
  end

  def github_oauth_callback
    binding.pry
    project_info = JSON(access_token.get('https://api.github.com/users/repos').body).symbolize_keys
  end

  private
  def allowed_params
    params.require(:project).permit(:title, :body, :image_url, :url, :user_id, :skills_attributes => [:id, :name])
  end

end
