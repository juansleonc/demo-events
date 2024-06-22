# spec/controllers/events_controller_spec.rb
require 'rails_helper'

RSpec.describe EventsController, type: :controller do
  let(:user) { create(:user) }
  let(:event) { create(:event, user: user) }

  describe 'GET #index' do
    it 'returns a success response' do
      get :index
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    it 'creates a new Event' do
      expect {
        post :create, params: { event: attributes_for(:event) }
      }.to change(Event, :count).by(1)
    end
  end

  describe 'PUT #update' do
    it 'updates an existing Event' do
      put :update, params: { id: event.id, event: { name: 'New Name' } }
      event.reload
      expect(event.name).to eq('New Name')
    end
  end

  describe 'DELETE #destroy' do
    it 'deletes an existing Event' do
      event = create(:event)
      expect {
        delete :destroy, params: { id: event.id }
      }.to change(Event, :count).by(-1)
    end
  end
end
