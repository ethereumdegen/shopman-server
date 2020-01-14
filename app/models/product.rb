#include Rails.application.routes.url_helpers
class Product < ApplicationRecord

  include CurrencyHelper


  validates :seller_id , :presence => true
  validates :price_currency_id , :presence => true
  validates :est_shipping_days , :presence => true

  has_many :order_rows

  has_one_attached :thumbnail

  belongs_to :product_category
  belongs_to :seller, class_name: 'User'
  belongs_to :price_currency, class_name: 'Currency'


  #attaching a thumbnail from a controller:
  # @product.thumbnail.attach(params[:thumbnail])


  def getThumbnailURL
    return Rails.application.routes.url_helpers.rails_blob_path(self.thumbnail) if self.thumbnail.attachment
  end

  def getPriceData
    return {
      price_currency: self.price_currency.getExportData,
      price_raw_units: self.price_raw_units,
      price_formatted: CurrencyHelper.getPriceFormatted({raw_units: self.price_raw_units, currency: self.price_currency})
    }
  end


  def getExportData
    return {id:self.id,
      product_category_id: self.product_category_id,
      name: self.name,
      thumbnailURL: self.getThumbnailURL,
      url: Rails.application.routes.url_helpers.url_for(self),
      seller: (if self.seller then self.seller.getExportData else User.getNullUser end),
      price_data: self.getPriceData
     }
  end

end
