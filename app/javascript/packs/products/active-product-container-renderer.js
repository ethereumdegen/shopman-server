var $ = require("jquery");
import Vue from 'vue/dist/vue.esm.js';


import CurrencyHelper from '../currencies/currency-helper'

var currencyHelper = new CurrencyHelper();

var categoryTabSelector;
var productCards;


export default class ActiveProductsContainerRenderer {


  init()
  {
    var self = this;

    var options = activeProductContainerOptions;


    var selectedCurrencyId = currencyHelper.getSelectedCurrencyId();
     currencyHelper.registerSelectCurrencyChangeCallback(this);



     if(featuredProducts == null || featuredProducts.length < 1) return;


    categoryTabSelector = new Vue({
        el: '#category-tabs',
        data: {
           activeTagIndex: 0,
           categories: [],


        },
        methods: {

              clickTab: function (event,index) {
                 this.activeTagIndex = index;
                 self.selectedProductCategory(index)
              }


          }

      })

      productCards= new Vue({
          el: '#product-cards',
          data: {
             products: featuredProducts,
             activeProducts: [],
             activeTagIndex : 0,
             selectedCurrencyId: selectedCurrencyId

          },
          methods: {

                clickCard: function (event,index) {
                    console.log('index')
                }


            },
            watch:{
              activeTagIndex: function()
              {
                this.activeProducts = self.getFinishedActiveProducts(this.products,this.activeTagIndex)
              },
              selectedCurrencyId: function()
              {
                this.activeProducts = self.getFinishedActiveProducts(this.products,this.activeTagIndex)
              }
            },
            computed: {

              /*  getPricedProductData: function(){
                        //console.log('getActivePriceOfProduct' , item)
                        //this function will determine what is displayed in the input
                        var result =  this.activeProducts;
                        result.forEach( e => e.active_price_data = currencyHelper.getActivePriceFromArray(e.price_data )  ) ;
                        console.log('meep', result)
                        return result;

                    }*/
            }


        })

        console.log('opt',options)

        if(options.filterByCategories)
        {
          //init data


          Vue.set(categoryTabSelector, 'activeTagIndex', firstcategoryid)
          Vue.set(categoryTabSelector, 'categories', allcategories)

          this.selectedProductCategory(firstcategoryid)


        }else{
          console.log(' do not filter !!')
          Vue.set(productCards, 'activeProducts', featuredProducts)

        }



  }

  getFinishedActiveProducts(products,activeTagIndex){
   var activeProducts =  products.filter(item => item.product_category_id == activeTagIndex)

   activeProducts.forEach( e => e.active_price_data = currencyHelper.getActivePriceFromArray(e.price_data )  ) ;


   return activeProducts
  }


  onCurrencyChanged()
  {
    console.log('currency change meep', currencyHelper.getSelectedCurrencyId( ))

    if(productCards != null)
    {
      Vue.set(productCards, 'selectedCurrencyId', currencyHelper.getSelectedCurrencyId( ))

    }


  }

  selectedProductCategory(index)
  {
    console.log('selected category',index)

      Vue.set(productCards, 'activeTagIndex', index)

  //  this.updateActiveProducts();
  }

  /*updateActiveProducts()
  {
    var newArray = [];

    newArray = productCards.products.filter(item => item.product_category_id == categoryTabSelector.activeTagIndex)


    Vue.set(productCards, 'activeProducts', newArray)

  }*/


}
