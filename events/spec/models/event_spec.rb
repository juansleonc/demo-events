require 'rails_helper'

RSpec.describe Event, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:date) }
  it { should validate_presence_of(:location) }
  it { should validate_presence_of(:capacity) }
end
