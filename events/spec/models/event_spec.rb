# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Event, type: :model do
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:description) }
  it { is_expected.to validate_presence_of(:date) }
  it { is_expected.to validate_presence_of(:location) }
  it { is_expected.to validate_presence_of(:capacity) }
end
