
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
              zipCode: '',
              countryCode: 'US'
              // shoppingRows: shoppingListData

            },
            methods: {

                  deleteRow: function (event,index) {
                      console.log('delete row',index)
                  },
                  onQuantityChange: function( event, index){
                      console.log('quantity change ' )  //like input change
                  },
                  submitOrder: function(event){
                    self.submitOrderCreate()
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


    async submitOrderCreate()
    {
      var cart = shoppingCartHelper.getCurrentShoppingCart()

      var shipping = {
        name: shippingInformation.name,
        streetAddress: shippingInformation.streetAddress,
        stateCode: shippingInformation.stateCode,
        countryCode: shippingInformation.countryCode,
        zipCode: shippingInformation.zipCode
      }

      console.log('meep',shipping)

      var response = new Promise((resolve, reject) => {
        $.ajax({
          url: '/order/create',
          beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
          type: 'POST',
          dataType: 'json',
          data: {
            "cart": cart,
            "shipping": shipping
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
