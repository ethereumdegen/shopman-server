class ProductController < ApplicationController
  def index
  end

  def new
  end

  def show

    @product = Product.find_by(id: params[:id])



    #similar products
    @featuredProducts = Product.where(product_category: @product.product_category).map{|item| item.getExportData}
    @featuredProducts = @featuredProducts.delete(@product)


  end
end
