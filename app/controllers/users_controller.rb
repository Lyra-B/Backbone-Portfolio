class UsersController < ApplicationController
  def create
    user = User.new(allowed_params)
    if user.save
      render :json => user, :status => 201
    else
      render :status => 500
    end
  end

  def index
    render :json => User.all
  end

  def show
    render :json => User.find(params[:id])
  end

  private
  def allowed_params
    params.require(:user).permit(:first_name, :last_name, :biography, :mission, :image_url)
  end
end
