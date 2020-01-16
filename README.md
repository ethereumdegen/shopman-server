

## Shopman Server

1) Refactor , fix product_price model so its used and not price_currency / price_raw_units

2) allow user to swap between 0xbtc and dai in JS, only show products of the appropriate currency type.  Take this currency type into account when adding a product to the basket.  dont allow checkout w multiple coins but throw an error .




### Set up

# installation
- install ruby 2.5.1 (rvm install 2.5.1)
- install node 8.16.0 (nvm install 8.16.0)
- install yarn (https://yarnpkg.com/lang/en/docs/install/#debian-stable)
- Clone this repo
- 'gem install bundler:1.16.2'
- 'bundle'

#### postgres
> sudo -i -u postgres;
> psql
> create role payspec with createdb login password 'password';
> CREATE DATABASE payspec_development OWNER payspec;



# config
1) npm run credentials
> add 'sendgrid_password:'  your sendgrid API key

2) start redis server in another screen 'redis server'
3) start sidekiq with 'npm run sidekiq'   (necessary to process email)


##### install javascript dependencies
yarn
rake assets:precompile
rake webpacker:compile

be sure to edit .env!

#### Running the site
npm run server


## Generate an admin account with: (do not list product as admin!)
rake db:build_admin[email@gmail.com]
