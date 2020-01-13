include PayspecBotHelper

class HomeController < ApplicationController



def index
  

  #Product.all.to_json

  @featuredProducts = Product.all.map{|item| item.getExportData}

end





end
