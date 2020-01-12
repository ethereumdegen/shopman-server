Rails.application.routes.draw do
  devise_for :users

  resources :user_session

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'


  #get 'product/index'
  #get 'product/new'

  resources :product
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html



    root 'home#index'

end
