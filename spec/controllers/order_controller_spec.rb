

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

        @seller = FactoryBot.create(:user )
        @product_category = FactoryBot.create(:product_category )

        @token = Currency.create(name:"0xBTC", decimals:8,eth_contract_address:"0xb6ed7644c69416d67b522e20bc294a9a9b405b31" )
        @token.save!

        @item = Product.create(name:"Sticker", seller: @seller , product_category: @product_category, est_shipping_days: 7 )
        @item.product_prices.build(currency: @token, price_raw_units: 100000000 )
        @item.save!

          p Currency.all.first



          cart =  ( {cart: {"0"=>{product_id:@item.id, quantity:2, currency_id: @token.id}}, shipping:{"name"=>"a", "streetAddress"=>"b", "stateCode"=>"cd", "countryCode"=>"US", "zipCode"=>"d"}})


        post "create", params: (cart)


        expect(response).to be_truthy
      #  follow_redirect!

        #expect(2 ).to eq( 1 )
      end

    end
  end






end
