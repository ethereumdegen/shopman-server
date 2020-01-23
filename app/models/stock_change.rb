class StockChange < ApplicationRecord

   validates :product , :presence => true


  belongs_to :product





end
