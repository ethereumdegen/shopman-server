class Currency < ApplicationRecord



  validates :name , :presence => true, :uniqueness => true
  validates :decimals , :presence => true
   validates :eth_contract_address , :presence => true

  has_one_attached :thumbnail

  def getThumbnailURL
    return Rails.application.routes.url_helpers.rails_blob_path(self.thumbnail) if self.thumbnail.attachment
  end


  def getEtherscanURL
    return 'https://etherscan.io/address/'+self.eth_contract_address
  end

  def getExportData
    return {id:self.id,
      name: self.name,
      thumbnailURL: self.getThumbnailURL
     }
  end


end
