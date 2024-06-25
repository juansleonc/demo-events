# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :auth, defaults: { format: :json } do
    resources :registrations, only: [:create]
    resources :sessions, only: [:create]
  end
end
