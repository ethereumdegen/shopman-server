

## Shopman Server




2) add image uploads

https://medium.com/@anaharris/how-to-add-image-upload-functionality-to-your-rails-app-9f7fc3f3d042


have an artist make cool etherpunks swag , funny references to vitalik , llamas, etc .


## Devise TODO

===============================================================================

Some setup you must do manually if you haven't yet:

  1. Ensure you have defined default url options in your environments files. Here
     is an example of default_url_options appropriate for a development environment
     in config/environments/development.rb:

       config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }

     In production, :host should be set to the actual host of your application.

  2. Ensure you have defined root_url to *something* in your config/routes.rb.
     For example:

       root to: "home#index"

  3. Ensure you have flash messages in app/views/layouts/application.html.erb.
     For example:

       <p class="notice"><%= notice %></p>
       <p class="alert"><%= alert %></p>

  4. You can copy Devise views (for customization) to your app by running:

       rails g devise:views

===============================================================================







### Set up

#### postgres
> sudo -i -u postgres;
> psql
> create role payspec with createdb login password 'password';
> CREATE DATABASE payspec_development OWNER payspec;


##### webpack
RAILS_ENV=development  ./bin/rails webpacker:compile


#### Running the site
rails s
