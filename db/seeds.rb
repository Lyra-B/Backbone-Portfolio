dan = User.new(:name => "Dan", :image_url => '/uploads/me.jpg', 
	:bio => "Web Developer from London, UK", :mission => "To get better at coding")

bucket_list = Project.new(:title => "Bucket List", :image_url => '/uploads/project.jpg')
bucket_list.skills << Skill.new(:name => 'Ruby')
bucket_list.skills << Skill.new(:name => 'Rails')
bucket_list.skills << Skill.new(:name => 'AJAX')
bucket_list.skills << Skill.new(:name => 'RSpec')
bucket_list.skills << Skill.new(:name => 'Cucumber')

dan.projects << bucket_list

dan.save!