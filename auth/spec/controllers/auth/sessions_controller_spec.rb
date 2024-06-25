# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Auth::SessionsController, type: :controller do
  describe 'POST #create' do
    let(:user) { create(:user, password: 'password') }

    context 'with valid credentials' do
      it 'returns a token' do
        post :create, params: { email: user.email, password: 'password' }

        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to have_key('token')
      end
    end

    context 'with invalid credentials' do
      it 'returns an error' do
        post :create, params: { email: user.email, password: 'wrongpassword' }

        expect(response).to have_http_status(:unauthorized)
        expect(JSON.parse(response.body)).to have_key('errors')
        expect(JSON.parse(response.body)['errors']).to eq('Invalid email or password')
      end
    end

    context 'with non-existent user' do
      it 'returns an error' do
        post :create, params: { email: 'nonexistent@example.com', password: 'password' }

        expect(response).to have_http_status(:unauthorized)
        expect(JSON.parse(response.body)).to have_key('errors')
        expect(JSON.parse(response.body)['errors']).to eq('Invalid email or password')
      end
    end
  end
end
