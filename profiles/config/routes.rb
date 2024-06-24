Rails.application.routes.draw do
  resource :profile, only: [:show, :update]
end
