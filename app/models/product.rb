#include Rails.application.routes.url_helpers
class Product < ApplicationRecord

  include CurrencyHelper
  include ActionView::Helpers::TextHelper

  validates :seller_id , :presence => true
#  validates :price_currency_id , :presence => true
  validates :est_shipping_days , :presence => true



  has_many :order_rows
  has_many :stock_changes



  has_one_attached :thumbnail

  belongs_to :product_category
  belongs_to :seller, class_name: 'User'

#  belongs_to :price_currency, class_name: 'Currency'


  has_many :product_prices, as: :priced, :inverse_of => :priced


  #attaching a thumbnail from a controller:
  # @product.thumbnail.attach(params[:thumbnail])


  def getThumbnailURL
    return Rails.application.routes.url_helpers.rails_blob_path(self.thumbnail) if self.thumbnail.attachment
  end

  def getPriceData
    return product_prices.map { |item| item.getExportData }
  end


  def getExportData
    return {id:self.id,
      product_category_id: self.product_category_id,
      name: self.name,
      description: self.description,
      quantityInStock: self.quantityInStock,
      inStock: (self.quantityInStock > 0),
      simple_format_description:  simple_format(self.description),
      est_shipping_days: self.est_shipping_days,
      thumbnailURL: self.getThumbnailURL,
      url: Rails.application.routes.url_helpers.url_for(self),
      seller: (if self.seller then self.seller.getExportData else User.getNullUser end),
      price_data: self.getPriceData
     }
  end


  def quantityInStock

    quantity = self.getTotalQuantityIn - self.getTotalQuantityCommitted
 
    return quantity
  end

  def getTotalQuantityIn
    result = 0

      stock_changes.each do |row|
        result += row.delta
      end

    return result
  end

  def getTotalQuantityCommitted
    result = 0

      order_rows.each do |row|
        if(row.order.hasOrderStatus?(Order::order_statuses[:paid]))
          result += row.quantity
        end
      end

    return result
  end

  def getTotalQuantityOut
    result = 0

      order_rows.each do |row|
        if(row.order.hasOrderStatus?(Order::order_statuses[:shipped]))
          result += row.quantity
        end
      end

    return result
  end

end
