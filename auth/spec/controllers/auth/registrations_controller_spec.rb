require 'rails_helper'

RSpec.describe Auth::SessionsController, type: :controller do
  describe 'POST #create' do
    let(:user) { create(:user, password: 'password') }

    context 'with valid credentials' do
      it 'returns a token' do
        post :create, params: { email: user.email, password: 'password' }

        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response).to have_key('token')
        expect(json_response['token']).to be_present
      end
    end

    context 'with invalid credentials' do
      it 'returns an error' do
        post :create, params: { email: user.email, password: 'wrongpassword' }

        expect(response).to have_http_status(:unauthorized)
        json_response = JSON.parse(response.body)
        expect(json_response).to have_key('errors')
        expect(json_response['errors']).to eq('Invalid email or password')
      end
    end

    context 'with non-existent user' do
      it 'returns an error' do
        post :create, params: { email: 'nonexistent@example.com', password: 'password' }

        expect(response).to have_http_status(:unauthorized)
        json_response = JSON.parse(response.body)
        expect(json_response).to have_key('errors')
        expect(json_response['errors']).to eq('Invalid email or password')
      end
    end
  end
end
