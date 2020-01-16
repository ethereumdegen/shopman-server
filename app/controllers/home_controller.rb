include PayspecBotHelper

class HomeController < ApplicationController



def index


  #Product.all.to_json

  @featuredProducts = Product.where(enabled:true).map{|item| item.getExportData}

end





end
