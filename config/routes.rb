Rails.application.routes.draw do


  get 'faq/getcrypto'
#  get 'order/new'

#  get 'order/index'

#  get 'user/show'


  devise_for :users

  resources :user_session

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'


  #get 'product/index'
  #get 'product/new'
  resources :user
  resources :product



    get 'order/new'=> 'order#new', ad: 'order_new'
      get 'order/:id'=> 'order#show', as: 'order_show'
    get 'order/invoiceCallback' => 'order#invoiceCallback', as: 'invoice_callback'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post '/order/create' => 'order#create'
  post '/order/getshoppinglistdata' => 'order#getShoppingListData'


  get 'getcrypto'=> 'faq#getcrypto'


  root 'home#index'




    if Rails.env.development?
      require 'sidekiq/web'
      mount Sidekiq::Web => '/sidekiq'
    end


end
