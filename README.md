

## Shopman Server


1) Proceed to pay should make a new order

2) The new order will get an 'offchain invoice uuid' from the PaySpec server and immediately redirect the customer to the invoice page with that info

3) need to really clean up the PaySpec bot code, lighten it up and add a config file for 'eth address'  (like how pool does it ) 

have an artist make cool etherpunks swag , funny references to vitalik , llamas, etc .







### Set up

#### postgres
> sudo -i -u postgres;
> psql
> create role payspec with createdb login password 'password';
> CREATE DATABASE payspec_development OWNER payspec;


##### webpack
npm run webpack

#### Running the site
npm run server


## Generate an admin account with:
rake db:build_admin[email@gmail.com]
