
var $ = require("jquery");
import Vue from 'vue/dist/vue.esm.js';


import ShoppingCartHelper from '../orders/shopping-cart-helper'

var shoppingCartHelper = new ShoppingCartHelper();

export default class ProductShow {

    init(  )
    {

      var self = this;


      $('#add-to-cart').click(function(){
        console.log('click')
        self.addToCart()
      })

    }

    addToCart(  )
    {
        console.log('add to cart!')

      var productId = 1;
      var quantity = 1;
      shoppingCartHelper.addItemToCart(1,1)

      //redirect to new order page
      window.location.href = '/order/new'

    }



     update(renderData)
    {



    }



}
