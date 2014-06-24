Rails.application.routes.draw do
	root to: 'users#index'
  resources :users, :only => [:index, :create, :show]
  resources :projects, :only => [:index, :create, :update]
end