Instagram.configure do |config|
  config.client_id = Rails.application.secrets.instagram["client_id"]
  config.client_secret = Rails.application.secrets.instagram["client_secret"]
  # For secured endpoints only
  #config.client_ips = '<Comma separated list of IPs>'
end