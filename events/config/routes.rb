# frozen_string_literal: true

Rails.application.routes.draw do
  resources :events, only: %i[create update destroy index show]
end
