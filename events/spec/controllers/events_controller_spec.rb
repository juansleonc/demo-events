require 'rails_helper'

RSpec.describe EventsController, type: :controller do
  let(:user_id) { 'user_di123' }
  let(:token) { "Bearer #{JWT.encode({ user_id: user_id }, Rails.application.secrets.secret_key_base)}" }

  before do
    allow(request.env).to receive(:[]).and_call_original
    allow(request.env).to receive(:[]).with('HTTP_AUTHORIZATION').and_return(token)
    allow(request.env).to receive(:[]).with('current_user_id').and_return(user_id)
  end

  describe 'GET #index' do
    let!(:event1) { create(:event, user_id: user_id) }
    let!(:event2) { create(:event, user_id: user_id) }

    it 'returns a list of events' do
      get :index

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(2)
    end
  end

  describe 'GET #show' do
    let(:event) { create(:event, user_id: user_id) }

    it 'returns the event' do
      get :show, params: { id: event.id }

      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response['id']).to eq(event.id.to_s)
    end
  end

  describe 'POST #create' do
    let(:valid_attributes) { attributes_for(:event) }

    it 'creates a new event' do
      expect {
        post :create, params: { event: valid_attributes }
      }.to change(Event, :count).by(1)

      expect(response).to have_http_status(:created)
      json_response = JSON.parse(response.body)
      expect(json_response['name']).to eq(valid_attributes[:name])
    end
  end

  describe 'PATCH/PUT #update' do
    let(:event) { create(:event, user_id: user_id) }
    let(:new_attributes) { { name: 'Updated Event' } }

    it 'updates the event' do
      patch :update, params: { id: event.id, event: new_attributes }

      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response['name']).to eq('Updated Event')
    end
  end

  describe 'DELETE #destroy' do
    let!(:event) { create(:event, user_id: user_id) }

    it 'deletes the event' do
      expect {
        delete :destroy, params: { id: event.id }
      }.to change(Event, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end
