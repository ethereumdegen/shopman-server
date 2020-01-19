module OrderHelper

  include PayspecBotHelper


  def self.updateOrderPaidStatusFromBot(order)
    @order = order



    @updatedOffchainInvoiceData = PayspecBotHelper.getInvoiceData(@order.invoice_uuid)
    @updatedOffchainInvoice = @updatedOffchainInvoiceData['invoice']


    if @updatedOffchainInvoiceData['success'] == true
          #update order status with this invoice data
          if @updatedOffchainInvoice['paid']

            if !@order.hasOrderStatus?(Order::order_statuses[:paid])
              @order.setOrderStatus(Order::order_statuses[:paid])
              p ' set order status to paid '
            end
          end
    end

    if(@order.tracking_number)
      if !@order.hasOrderStatus?(Order::order_statuses[:shipped])
        @order.setOrderStatus(Order::order_statuses[:shipped])
        p ' set order status to shipped '
      end
    end



  end



  def self.cartItemsHaveDifferentCurrencies?(cart)

    @previouscurrency = nil

    cart.each do |row|
      p 'row is '
       p row
       index = row[0]
       item = row[1]

      prod_id = item[:product_id].to_i
      currency_id = item[:currency_id].to_i

       @product = Product.find_by_id(prod_id)
       @currency = Currency.find_by_id(currency_id)


        if @previouscurrency == nil || @previouscurrency == @currency then
          @previouscurrency = @currency
        else
          return true
        end 

    end


    return false
  end





end
