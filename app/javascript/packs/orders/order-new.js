
var $ = require("jquery");
import Vue from 'vue/dist/vue.esm.js';


import ShoppingCartHelper from './shopping-cart-helper'

var shoppingCartHelper = new ShoppingCartHelper();

var shoppingList;

export default class OrderNew {

    async init()
    {

      var self = this;

      await this.renderShoppingList();


    }

    async renderShoppingList()
    {
      var cart = shoppingCartHelper.getCurrentShoppingCart()

      console.log('cart is ',cart, cart.length)

      //need to hit rails w an ajax call
      var shoppingListData = await this.getShoppingListDataFromCart(cart);

      console.log('shopping list is ', shoppingListData )



      shoppingList = new Vue({
          el: '#shopping-list',
          data: {
             shoppingRows: shoppingListData

          },
          methods: {

                deleteRow: function (event,index) {
                    console.log('delete row',index)
                },
                onQuantityChange: function( event, index){
                    console.log('quantity change ' )  //like input change
                }


            }

        })
    }

    async getShoppingListDataFromCart(cart)
    {


      return new Promise((resolve, reject) => {
        $.ajax({
          url: '/order/getshoppinglistdata',
          beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
          type: 'POST',
          dataType: 'json',
          data: {
            "cart": cart,
          },
          success: function(data) {
            console.log('got ajax response', data )
           
            resolve( data.shoppingList )
          },
          error: function(error) {
            reject(error)
          },
        })
      })


    }


     update(renderData)
    {



    }



}
