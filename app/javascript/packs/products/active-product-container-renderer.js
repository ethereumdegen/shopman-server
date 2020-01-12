var $ = require("jquery");
import Vue from 'vue/dist/vue.esm.js';


var categoryTabSelector;
var productCards;


export default class ActiveProductsContainerRenderer {


  init()
  {
    var self = this;

    var options = activeProductContainerOptions;


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
             activeProducts: []

          },
          methods: {

                clickCard: function (event,index) {
                    console.log('index')
                }


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

  selectedProductCategory(index)
  {
    console.log('selected category',index)

    this.updateActiveProducts();
  }

  updateActiveProducts()
  {
    var newArray = [];

   newArray = productCards.products.filter(item => item.product_category_id == categoryTabSelector.activeTagIndex)


    Vue.set(productCards, 'activeProducts', newArray)

  }


}
