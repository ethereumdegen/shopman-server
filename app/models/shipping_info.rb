class ShippingInfo < ApplicationRecord

   belongs_to :shippable, polymorphic: true


end
