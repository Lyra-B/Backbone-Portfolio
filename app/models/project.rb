class Project < ActiveRecord::Base
  belongs_to :user
  # has_many :project_skills
  has_many :skills  #, through: :project_skills

  accepts_nested_attributes_for :skills, :allow_destroy => true

  def as_json(options = nil)
    json_options = { :except => [:created_at, :updated_at], :include => {
      :skills => { :only => [:id, :name] }
    }}.merge(options)
    super(json_options)
  end

  before_save do
    token = OAuth2::AccessToken.new(OAuth2::Client.new(
      Rails.application.secrets.instagram["client_id"],
      Rails.application.secrets.instagram["client_secret"],
      :site => "https://api.instagram.com"), self.user.instagram_access_token)
    results = JSON(token.get("/v1/tags/#{CGI.escape title}/media/recent?access_token=#{self.user.instagram_access_token}"))
    self.image_url = results["data"].first["images"]["standard_resolution"]["url"]
  end
end
