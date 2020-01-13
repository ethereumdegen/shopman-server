

require 'rails_helper'

 RSpec.describe OrderController, type: :controller do


   describe "POST #create" do
     context "with valid attributes" do

       p 'test spec '
      # company = FactoryBot.create(:company)

      let(:current_user) {FactoryBot.create(:user )}

      before(:each) { sign_in current_user }
      after(:each)  { sign_out current_user}

      it "creates a deal" do

        expect(2 ).to eq( 1 )
      end

    end
  end






end
