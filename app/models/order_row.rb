class OrderRow < ApplicationRecord


  # validates :product_price , :presence => true, :uniqueness => true

  belongs_to :order
  belongs_to :product

  #  belongs_to :price_currency, class_name: 'Currency'

    has_one :product_price, as: :priced







end
