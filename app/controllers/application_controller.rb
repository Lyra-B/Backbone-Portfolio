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

  def instagram_oauth
    OAuth2::Client.new(
      Rails.application.secrets.instagram["client_id"],
      Rails.application.secrets.instagram["client_secret"],
      :site => 'https://api.instagram.com'
    )
  end
end
