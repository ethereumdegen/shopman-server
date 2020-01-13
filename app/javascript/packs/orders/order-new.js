
var $ = require("jquery");
import Vue from 'vue/dist/vue.esm.js';


import ShoppingCartHelper from './shopping-cart-helper'

var shoppingCartHelper = new ShoppingCartHelper();

var shoppingList;
var shippingInformation;

export default class OrderNew {

    async init()
    {

      var self = this;

      await this.renderShoppingList();


    }

    async renderShoppingList()
    {
      var self = this ;
      var cart = shoppingCartHelper.getCurrentShoppingCart()

      console.log('cart is ',cart, cart.length)

      //need to hit rails w an ajax call
      var cart = await this.getShoppingListDataFromCart(cart);

      var shoppingListData = cart.shoppingList
      console.log('shopping list is ', shoppingListData )


      var subtotalRaw = cart.subtotalRaw;
      var subtotalFormatted = cart.subtotalFormatted;

      shoppingList = new Vue({
          el: '#shopping-list',
          data: {
             shoppingRows: shoppingListData,
             subtotalFormatted: subtotalFormatted,
             currency:currency

          },
          methods: {

                deleteRow: function (event,index) {
                    console.log('delete row',index)
                },
                onQuantityChange: function( event, index){
                    console.log('quantity change ' )  //like input change
                },
                resetCart: function(event){
                  console.log('reset cart ')
                  shoppingCartHelper.clearShoppingCart(),
                  // self.renderShoppingList()
                   Vue.set(shoppingList, 'shoppingRows', [])
                   Vue.set(shoppingList, 'subtotalFormatted', 0)

                }

            }

        })



        shippingInformation = new Vue({
            el: '#shipping-info',
            data: {
              name: '',
              streetAddress: '',
              stateCode: '',
              zipCode: ''
              // shoppingRows: shoppingListData

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

            resolve( data)
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
