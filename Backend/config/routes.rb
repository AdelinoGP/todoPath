Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  post "login" => "session#create", as: :login
  delete "logout" => "session#destroy", as: :logout
  resources :user, only: [:create, :destroy]
  resources :project, only: [:index, :show, :create, :update, :destroy] do
    get ':project_id/todos', to: 'todo#project_todos', on: :collection, as: :project_todos
  end
  resources :todo, only: [:index, :show, :create, :update, :destroy] do
    put :complete, on: :member
  end

end