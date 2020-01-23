class OrderRow < ApplicationRecord

  validates :product , :presence => true
  validates :order , :presence => true

  belongs_to :order
  belongs_to :product

  #  belongs_to :price_currency, class_name: 'Currency'

    has_one :product_price, as: :priced







end
