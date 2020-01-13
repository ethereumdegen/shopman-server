class OrderController < ApplicationController
  def new
  end

  def show
  end

  def index
  end


    def getShoppingListData
      p 'get shopping list data '

      cart = params[:cart]

      p cart

       @list = cart

      respond_to do |format|
        format.js { render json: {success:true, shoppingList:   @list }.to_json }
        format.html
      end


    end


end
