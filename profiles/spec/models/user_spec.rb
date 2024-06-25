# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
    it { is_expected.to validate_presence_of(:name) }
  end

  describe '#profile' do
    let(:user) { build(:user, email: 'test@example.com', name: 'Test User', bio: 'Test bio', avatar: 'avatar_url') }

    it 'returns the correct profile attributes' do
      profile = user.profile

      expect(profile[:email]).to eq('test@example.com')
      expect(profile[:name]).to eq('Test User')
      expect(profile[:bio]).to eq('Test bio')
      expect(profile[:avatar]).to eq('avatar_url')
    end
  end
end
