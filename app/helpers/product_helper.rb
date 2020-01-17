module ProductHelper


  def self.getPriceOfCurrency(product,currency)
    return product.product_prices.where(currency: currency).first
  end

end
