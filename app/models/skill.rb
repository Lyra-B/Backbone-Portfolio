class Skill < ActiveRecord::Base
  belongs_to :project
  # has_many :project_skills
  # has_many :projects, through: :project_skills
end
