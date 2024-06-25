# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ProfilesController, type: :controller do
  let(:user) { create(:user) }

  before do
    allow(controller).to receive(:current_user).and_return(user)
  end

  describe 'GET #show' do
    it 'returns the profile of the current user' do
      get :show

      expect(response).to have_http_status(:ok)
      json_response = response.parsed_body
      expect(json_response['email']).to eq(user.email)
      expect(json_response['name']).to eq(user.name)
    end
  end

  describe 'PATCH/PUT #update' do
    context 'with valid attributes' do
      let(:new_attributes) { { name: 'Updated Name', email: 'updated@example.com' } }

      it 'updates the profile of the current user' do
        put :update, params: { user: new_attributes }

        expect(response).to have_http_status(:ok)
        user.reload
        expect(user.name).to eq('Updated Name')
        expect(user.email).to eq('updated@example.com')
      end
    end

    context 'with invalid attributes' do
      let(:invalid_attributes) { { email: '' } }

      it 'returns errors if the profile is not updated' do
        put :update, params: { user: invalid_attributes }

        expect(response).to have_http_status(:unprocessable_entity)
        json_response = response.parsed_body

        expect(json_response['errors']['email']).to include("can't be blank")
      end
    end
  end
end
