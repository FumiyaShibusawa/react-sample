Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "sessions#index"
  namespace :react_samples, path: '/' do
    resources :tic_tac_toe, only: [:index]
    resources :send_form, only: [:index]
  end
end
