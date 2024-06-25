# frozen_string_literal: true

Rails.application.routes.draw do
  resource :profile, only: %i[show update]
end
