class Order < ApplicationRecord

  has_many :order_rows

  belongs_to :user

end
