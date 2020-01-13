module OrderHelper

  def self.cartItemsHaveDifferentCurrencies?(cart)

    @currency = nil

    cart.each do |row|
      p 'item is '
      item = row[1]
      item_id = item[:product_id].to_i

      @product = Product.find_by_id(item_id)

        if @currency == nil || @product.price_currency == @currency then
          @currency = @product.price_currency
        else
          return true
        end


      return false
    end

  end


end
