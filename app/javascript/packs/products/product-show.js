
var $ = require("jquery");
import Vue from 'vue/dist/vue.esm.js';


import ShoppingCartHelper from './shopping-cart-helper'

var shoppingCartHelper = new ShoppingCartHelper();

export default class ProductShow {

    init(  )
    {

      var self = this;

      shoppingCartHelper.addItemToCart(1,1)

      //  sessionStorage.setItem( "total", 120 );


    }





     update(renderData)
    {



    }



}
