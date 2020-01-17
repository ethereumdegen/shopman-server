
var $ = require("jquery");
import Vue from 'vue/dist/vue.esm.js';



const ContractInterface = require('./contract-interface')



import CurrencyHelper from './currencies/currency-helper'

var currencyHelper = new CurrencyHelper();


var currencyList;
var ethereumHelper;


export default class NavbarRenderer {



    init( ethHelper, params )
    {
      ethereumHelper = ethHelper;

      console.log('get navbar renderer')

      this.loadNavbar()

      var selectedCurrencyId = currencyHelper.getSelectedCurrencyId()
      currencyHelper.registerSelectCurrencyChangeCallback(this);

      currencyList =   new Vue({
          el: '#currency-list',
          data: {
             currencies: allcurrencies,
             selectedCurrencyId: selectedCurrencyId
          },
          methods: {

                updated() {
                  console.log('on update')

                },
                onSelectCurrency: function (id){
                  console.log('select currency id ' , id)
                  //self.claimName( this.inputName )
                  currencyHelper.setSelectedCurrencyId(id);
                }
            }
        })

    }

    update()
    {

    }

    async onWeb3Connected() //from eth helper callback
    {
      console.log(' on web3 !!')

      var self = this;



        /*this.initInvoiceDataTable()

        Vue.set(payInvoiceInput, 'web3connected', true)

        await this.loadInvoiceData( self )

        setInterval(function(){  self.loadInvoiceData(self)  }, 10000);
        */

    }

    onCurrencyChanged()
    {
      console.log('currency change meep', currencyHelper.getSelectedCurrencyId( ))

      Vue.set(currencyList, 'selectedCurrencyId', currencyHelper.getSelectedCurrencyId( ))


    }




    async loadNavbar(){
      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach( el => {
          el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

          });
        });
      }

    }

}
