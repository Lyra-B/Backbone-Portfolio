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

end
