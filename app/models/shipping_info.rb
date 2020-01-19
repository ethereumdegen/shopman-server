class ShippingInfo < ApplicationRecord


    validates :streetAddress , :presence => true
    validates :stateCode , :presence => true
    validates :zipCode , :presence => true
    validates :countryCode , :presence => true

    
    belongs_to :shippable, polymorphic: true

end
