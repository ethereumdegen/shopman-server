class ProductPrice < ApplicationRecord

  include CurrencyHelper

  validates :product_id , :uniqueness => { scope: :currency_id }



  belongs_to :product
  belongs_to :currency, class_name: 'Currency'


end
