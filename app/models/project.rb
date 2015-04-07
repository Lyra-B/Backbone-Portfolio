class Project < ActiveRecord::Base
  belongs_to :user
  # has_many :project_skills
  has_many :skills  #, through: :project_skills

  accepts_nested_attributes_for :skills
end
