require 'json'


class OrderController < ApplicationController

include OrderHelper
include CurrencyHelper
include PayspecBotHelper

  def new

    ##override the currency for now, built out full multi coin support later
    @currency = Currency.all.first
  end

  def create

    parameters = orderCreationParams.to_h

    p 'params '
    p parameters.to_s

    #{"cart"=>{"0"=>{"product_id"=>"1", "quantity"=>"2"}}, "shipping"=>{"name"=>"a", "streetAddress"=>"b", "stateCode"=>"cd", "countryCode"=>"US", "zipCode"=>"d"}}

    @order = Order.new

    @order.save



    @currency = Currency.all.first

#the payspec server will automatically fill in the recipient address and the refNumber(increments)
    payspecData = {
      tokenAmount: 0,  #calc this from subtotal
      tokenAddress: @currency.eth_contract_address,
      description: ('Etherpunks.com Order #'+@order.id.to_s)
    }
    @invoiceUUID = PayspecBotHelper.generateOffchainInvoice( payspecData )

    if(@invoiceUUID == nil)
      respond_to do |format|
        format.js { render json: {success:false, message: 'Server Error: Could not generate Payspec Invoice' }.to_json }
        format.html
      end
      return
    end




   #need to get the invoice UUID from the bot here

   #need to redirect the customer to the URL for the invoice (bot)





    redirect_to @order
  end


  def show
  end

  def index
  end


    def getShoppingListData
      p 'get shopping list data '

      parameters = shoppingCartParams.to_h

      p parameters
      cart = parameters[:cart].to_a

      @currency = nil

      @list = []
      @subtotalRaw = 0;
      @subtotalFormatted = 0;

      if cart.length == 0
        respond_to do |format|
          format.js { render json: {success:true, shoppingList:  @list, currency: Currency.all.first.getExportData, subtotalRaw: @subtotalRaw, subtotalFormatted: @subtotalFormatted , currency: @currency}.to_json }
          format.html
        end
        return
      end


      if OrderHelper.cartItemsHaveDifferentCurrencies?(cart)
        respond_to do |format|
          format.js { render json: {success:false, message: 'Cart items use different currencies' }.to_json }
          format.html
        end
        return
      end




    #  p cart.to_s

       cart.each do |row|
         p 'item is '
         item = row[1]
         item_id = item[:product_id].to_i

         @quantity = item[:quantity].to_i
         @product = Product.find_by_id(item_id)
         @currency = @product.price_currency
         @subtotalRaw = @subtotalRaw + (@product.price_raw_units * @quantity)
         @list << {product_id: @product.id, product: @product.getExportData, quantity: @quantity }
       end

       p @list

       @subtotalFormatted = CurrencyHelper.getPriceFormatted({currency: @currency, raw_units: @subtotalRaw})

      respond_to do |format|
        format.js { render json: {success:true, shoppingList:  @list, currency: @currency.getExportData, subtotalRaw: @subtotalRaw, subtotalFormatted: @subtotalFormatted , currency: @currency}.to_json }
        format.html
      end


    end









private
    def shoppingCartParams
      params.permit(cart: [:product_id,:quantity])
    end


    def orderCreationParams
      params.permit(cart: [:product_id,:quantity],  shipping: [:name, :streetAddress, :stateCode, :zipCode, :countryCode ] )
    end


end
