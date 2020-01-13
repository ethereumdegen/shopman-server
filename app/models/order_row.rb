class OrderRow < ApplicationRecord


  belongs_to :order
  belongs_to :product

  belongs_to :price_currency, class_name: 'Currency'


end
