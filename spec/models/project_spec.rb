require 'spec_helper'

describe Project do
   it { should have_many(:skills) }
end
