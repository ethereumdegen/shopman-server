class ProductPrice < ApplicationRecord

  include CurrencyHelper

  validates :currency_id , :uniqueness => { scope: [:priced_id, :priced_type]}


   belongs_to :priced, polymorphic: true, :inverse_of => :product_prices
#  belongs_to :product
  belongs_to :currency, class_name: 'Currency'


  def getExportData
    return {
      id:self.id,
      currency: self.currency.getExportData,
      price_raw_units: self.price_raw_units,

      price_formatted: CurrencyHelper.getPriceFormatted({raw_units: self.price_raw_units, currency: self.currency})
    }
  end

end
