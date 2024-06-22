Rails.application.routes.draw do
  resources :events, only: [:create, :update, :destroy, :index, :show]
end
