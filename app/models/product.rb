#include Rails.application.routes.url_helpers
class Product < ApplicationRecord


  has_one_attached :thumbnail

  belongs_to :product_category


  #attaching a thumbnail from a controller:
  # @product.thumbnail.attach(params[:thumbnail])


  def getThumbnailURL
  #  return url_for(self.thumbnail )
    return Rails.application.routes.url_helpers.rails_blob_path(self.thumbnail) if self.thumbnail.attachment
  end


  def getExportData
    return {id:self.id,
      product_category_id: self.product_category_id,
      name: self.name,
      thumbnailURL: self.getThumbnailURL,
       url: Rails.application.routes.url_helpers.url_for(self) }
  end

end
