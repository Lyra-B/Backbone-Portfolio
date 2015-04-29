require 'rails_helper'

RSpec.describe Project, type: :model do
  describe "Fetching images from Instagram" do
    before do
      stub_request(:get, "https://api.instagram.com/v1/tags/Pretty+Flowers/media/recent").
         with(:headers => {'Accept'=>'*/*', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'Authorization'=>'Bearer 12345', 'User-Agent'=>'Faraday v0.9.1'}).
         to_return(:status => 200, :body => File.open('spec/fixtures/cat.json').read, :headers => {})

      @user = User.create!(:instagram_access_token => "12345")
      @project = @user.projects.create!(:title => "Pretty Flowers")
    end

    it "should automatically find an image from Instagram" do
      expect(@project.reload.image_url).to_not be nil
    end
  end
end
