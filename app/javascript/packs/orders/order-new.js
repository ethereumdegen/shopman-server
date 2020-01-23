
var $ = require("jquery");
import Vue from 'vue/dist/vue.esm.js';


import ShoppingCartHelper from './shopping-cart-helper'

//var shoppingCartHelper = new ShoppingCartHelper();

var shoppingList;
var shippingInformation;

export default class OrderNew {

    async init()
    {

      var self = this;
      console.log('order new ')
      await this.renderShoppingList();


    }

    async renderShoppingList()
    {
      var self = this ;
      var cart = ShoppingCartHelper.getCurrentShoppingCart()

      console.log('CART is ',cart, cart.length)

      //need to hit rails w an ajax call
      var cart = await this.getShoppingListDataFromCart(cart);

      console.log('cart2 is ', cart )

      var currency = allcurrencies[0]

      console.log('currency is ', currency )


      if(cart.currency != null)
      {
        currency = cart.currency
      }

      var shoppingListData = cart.shoppingList
      console.log('shopping list is ', shoppingListData )


      var subtotalRaw = cart.subtotalRaw;
      var subtotalFormatted = cart.subtotalFormatted;

      shoppingList = new Vue({
          el: '#shopping-list',
          data: {
             shoppingRows: shoppingListData,
             subtotalFormatted: subtotalFormatted,
             currency: currency

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
                  ShoppingCartHelper.clearShoppingCart(),
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
              countryCode: 'US',
              errorMessage: null
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
                      this.errorMessage = null;



                      if(self.shippingInfoIsValid())
                      {
                          self.submitOrderCreate()
                      }else{
                          this.errorMessage = 'Please fill in shipping information.'
                      }



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


    shippingInfoIsValid()
    {

      if( shippingInformation.name == null ||  shippingInformation.name.length < 2)
      {
        return false;
      }

      if( shippingInformation.streetAddress == null ||  shippingInformation.streetAddress.length < 2)
      {
        return false;
      }

      if( shippingInformation.stateCode == null ||  shippingInformation.stateCode.length < 2)
      {
        return false;
      }

      if( shippingInformation.zipCode == null ||  shippingInformation.zipCode.length < 5)
      {
        return false;
      }



      return true;
    }


    async submitOrderCreate()
    {
      var cart = ShoppingCartHelper.getCurrentShoppingCart()

      var shipping = {
        name: shippingInformation.name,
        streetAddress: shippingInformation.streetAddress,
        stateCode: shippingInformation.stateCode,
        countryCode: shippingInformation.countryCode,
        zipCode: shippingInformation.zipCode
      }



        console.log('submitOrderCreate',shipping)

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

            if(data.success == true){
              ShoppingCartHelper.clearShoppingCart()
              console.log('redirecting to ', data.redirect_url)
               window.location.href = data.redirect_url
            }else{
              //throw alert, alert helper?
              console.error('ERROR:', data.message)
            }


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
