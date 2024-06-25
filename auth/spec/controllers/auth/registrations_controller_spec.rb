require 'rails_helper'

RSpec.describe Auth::RegistrationsController, type: :controller do
  describe 'POST #create' do
    let(:valid_attributes) { attributes_for(:user) }

    let(:invalid_attributes) do
      {
        user: {
          email: 'invalid_email',
          password: 'password',
          password_confirmation: 'wrong_password',
          role: 'user'
        }
      }
    end

    context 'with valid attributes' do
      it 'creates a new user and returns a token' do
        expect {
          post :create, params: { user: valid_attributes }
        }.to change(User, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)).to have_key('token')
      end
    end

    context 'with invalid attributes' do
      it 'does not create a new user and returns errors' do
        expect {
          post :create, params: invalid_attributes
        }.to_not change(User, :count)

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)).to have_key('errors')
      end
    end
  end
end
