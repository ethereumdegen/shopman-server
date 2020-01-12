module CurrencyHelper

  def self.getPriceFormatted( args )
    decimals = args[:currency].decimals
    raw_units_float = args[:raw_units] * 1.0
    result = ( raw_units_float / (10.0 ** decimals) ).round(2)

    return result.to_s
  end

end
