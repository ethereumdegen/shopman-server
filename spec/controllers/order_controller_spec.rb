

require 'rails_helper'

 RSpec.describe OrderController, type: :controller do


   describe "POST #create" do
     context "with valid attributes" do

       p 'test spec '


       #currency = FactoryBot.create(:currency)
       #product = FactoryBot.create(:product)

      let(:current_user) {FactoryBot.create(:user )}

      before(:each) { sign_in current_user }
      after(:each)  { sign_out current_user}

      it "creates a deal" do

        @token = Currency.create(name:"0xBTC", decimals:8,eth_contract_address:"0xb6ed7644c69416d67b522e20bc294a9a9b405b31" )
        @token.save!

          p Currency.all.first

        post "create", params: {cart: {product_id:1, quantity:2}, shipping:{"name"=>"a", "streetAddress"=>"b", "stateCode"=>"cd", "countryCode"=>"US", "zipCode"=>"d"}}



        expect(response).to equal(" hi ")
        follow_redirect!

        #expect(2 ).to eq( 1 )
      end

    end
  end






end
