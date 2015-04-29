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

  def authorize_instagram
    redirect_to instagram_oauth.auth_code.authorize_url(
      :redirect_uri => instagram_oauth_callback_users_url
      )
  end

  def instagram_oauth_callback
    oauth_response = Instagram.get_access_token(params[:code], :redirect_uri => instagram_oauth_callback_users_url)
    oauth_response["access_token"]

    @user = User.find(session[:user_id])
    @user.instagram_access_token = oauth_response["access_token"]
    @user.save!

    redirect_to root_path
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

  def authorize_github
    redirect_to oauth2_client.auth_code.authorize_url(:redirect_uri => github_oauth_callback_users_url )
  end

  def github_oauth_callback
    access_token = oauth2_client.auth_code.get_token(params[:code], :redirect_uri => github_oauth_callback_users_url)
    user_info = JSON(access_token.get('https://api.github.com/user').body).symbolize_keys
    @user = User.find_or_create_by!(:github_id => user_info[:id]) do |user|
      user.first_name = user_info[:name].split[0]
      user.last_name = user_info[:name].split[1]
      user.email = user_info[:email]
      user.biography = user_info[:bio]
      user.mission = user_info[:company]
      user.image_url = user_info[:avatar_url]
    end
    @user.access_token = access_token.token
    @user.save
    session[:user_id] = @user.id
    redirect_to root_path
  end

  private
  def allowed_params
    params.require(:user).permit(:first_name, :last_name, :biography, :mission, :image_url)
  end
end
