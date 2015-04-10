class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private
  def oauth2_client
    OAuth2::Client.new(
      Rails.application.secrets.github["client_id"],
      Rails.application.secrets.github["client_secret"],
      :site => 'https://github.com',
      :authorize_url => '/login/oauth/authorize',
      :token_url => '/login/oauth/access_token'
    )

  end

  def access_token
    oauth2_client.auth_code.get_token(params[:code], :redirect_uri => github_oauth_callback_users_url)
  end
end
