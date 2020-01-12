class UserController < ApplicationController
  def show
    @user = User.find_by(id: params[:id])


    @featuredProducts = Product.where(seller: @user).map{|item| item.getExportData}



  end
end
