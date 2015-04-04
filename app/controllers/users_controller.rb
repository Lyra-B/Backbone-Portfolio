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
    @user = User.find(params[:id])

    respond_to do |format|
      format.json { render :json => @user }
      format.html
    end
  end

  def update
    user = User.find(params[:id])
    user.update(allowed_params)
    render nothing: true
  end

  private
  def allowed_params
    params.require(:user).permit(:first_name, :last_name, :biography, :mission, :image_url)
  end
end
