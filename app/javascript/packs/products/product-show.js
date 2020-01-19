
var $ = require("jquery");
import Vue from 'vue/dist/vue.esm.js';


import ShoppingCartHelper from '../orders/shopping-cart-helper'

//var shoppingCartHelper = new ShoppingCartHelper();


import CurrencyHelper from '../currencies/currency-helper'

var currencyHelper = new CurrencyHelper();


var productDetails;



export default class ProductShow {

    init(  )
    {

      var self = this;


      var selectedCurrencyId = currencyHelper.getSelectedCurrencyId()
      currencyHelper.registerSelectCurrencyChangeCallback(this);

      productDetails = new Vue({
          el: '#product-details',
          data: {
             product: productData,
             activePriceData: currencyHelper.getActivePriceFromArray( productData.price_data ), //productData.price_data[0],
             selectedCurrencyId: selectedCurrencyId,
             errorMessage: null


          },
          methods: {

                clickTab: function (event,index) {
                   this.activeTagIndex = index;
                   self.selectedProductCategory(index)
                }


            },
          watch:{
            selectedCurrencyId: function()
            {
            //  this.activeProductData = productData;
              this.activePriceData = currencyHelper.getActivePriceFromArray( productData.price_data )

            }
          }

        })


      $('#add-to-cart').click(function(){
        console.log('click')
        self.addToCart()
      })

    }

    onCurrencyChanged()
    {
      console.log('currency change meep!', currencyHelper.getSelectedCurrencyId( ))

      Vue.set(productDetails, 'selectedCurrencyId', currencyHelper.getSelectedCurrencyId( ))


    }



    addToCart(  ) // ??
    {
        console.log('add to cart!', productData )

      var productId = productData.id;
      var quantity = 1;
      var currencyId = currencyHelper.getSelectedCurrencyId( );
      var response = ShoppingCartHelper.addItemToCart(productId,1,currencyId)

      if(response.success == true)
      {
        //redirect to new order page
        window.location.href = '/order/new'

      }else{
        Vue.set(productDetails, 'errorMessage', response.message)

        console.log('ERROR: ', response.message)
      }


    }



     update(renderData)
    {



    }



}
