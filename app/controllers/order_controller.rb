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
    p parameters

    @cart = parameters[:cart]
    @ship_info = parameters[:shipping]

    #{"cart"=>{"0"=>{"product_id"=>"1", "quantity"=>"2"}}, "shipping"=>{"name"=>"a", "streetAddress"=>"b", "stateCode"=>"cd", "countryCode"=>"US", "zipCode"=>"d"}}

    if @cart.length == 0
      respond_to do |format|
        format.js { render json: {success:false, message: 'Cart is empty' }.to_json }
        format.html
      end
      return
    end


    p 'cart is'
    p @cart

    if OrderHelper.cartItemsHaveDifferentCurrencies?(@cart)
      respond_to do |format|
        format.js { render json: {success:false, message: 'Cart items use different currencies' }.to_json }
        format.html
      end
      return
    end


    @currency = Currency.all.first
    @subtotalRaw = 0

#the payspec server will automatically fill in the recipient address and the refNumber(increments)
    payspecData = {
      tokenAmount: 0,  #calc this from subtotal
      tokenAddress: @currency.eth_contract_address,
      description: ('Etherpunks.com Order')
    }


    PayspecBotHelper.setInvoicePaidCallbackURL() #init

    @invoiceUUID = PayspecBotHelper.generateOffchainInvoice( payspecData )

    p 'got invoice uuid '
    p @invoiceUUID

    if(@invoiceUUID == nil)
      respond_to do |format|
        format.js { render json: {success:false, message: 'Server Error: Could not generate Payspec Invoice' }.to_json }
        format.html
      end
      return
    end



    @order = Order.new(invoice_uuid: @invoiceUUID)

    @cart.each do |row|
      p 'item is '
      index = row[0]
      item = row[1]
      item_id = item[:product_id].to_i

      @quantity = item[:quantity].to_i
      @product = Product.find_by_id(item_id)
      @subtotalRaw = @subtotalRaw + (@product.price_raw_units * @quantity)

      @order.order_rows.build(product_id: @product.id, quantity: @quantity, price_currency_id: @product.price_currency_id, price_raw_units: @product.price_raw_units )

    end


      #add subtotal
    @order.price_currency_id=  @currency.id
    @order.price_raw_units = @subtotalRaw



    #add shipping info
    p 'ship info'
    p @ship_info
    @order.shipping_infos.build(ship_to_name: @ship_info[:name],streetAddress: @ship_info[:streetAddress] ,stateCode: @ship_info[:stateCode] ,zipCode: @ship_info[:zipCode],countryCode: @ship_info[:countryCode])


    @order.setOrderStatus(Order::order_statuses[:started])

    @order.save!

    p 'new order: '
    p @order

    respond_to do |format|
      format.js { render json: {success:true, redirect_url: order_show_url(@order) }.to_json }
      format.html
    end

  #  redirect_to order_show_url(@order)
  end


  def show
    @order = Order.find_by(id: params[:id])
  end

  def invoiceCallback
    @order = Order.find_by(invoice_uuid: params[:order_uuid])
    redirect_to order_url(@order)
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
         index = row[0]
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
