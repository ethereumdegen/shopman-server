Rails.application.routes.draw do


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


    get 'order/show/:id'=> 'order#show'
    get 'order/new'
    get 'order/invoiceCallback' => 'order#invoiceCallback', as: 'invoice_callback'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post '/order/create' => 'order#create'
  post '/order/getshoppinglistdata' => 'order#getShoppingListData'

  root 'home#index'

end
