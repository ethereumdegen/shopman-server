

var $ = require("jquery");

import Vue from 'vue/dist/vue.esm.js';

import GenericDashboard from './generic-dashboard'

import AlertRenderer from './alert-renderer'

import HomeRenderer from './home-renderer'

import InvoiceRenderer from './invoice-renderer'
import GetCryptoRenderer from './get-crypto-renderer'

import ActiveProductsContainerRenderer from './products/active-product-container-renderer'

import ProductShow from './products/product-show'
import OrderNew from './orders/order-new'


var url = require('url');

var web3utils = require('web3-utils')


//var flash = require('./flash')

var genericDashboard = new GenericDashboard();

var alertRenderer = new AlertRenderer();
var homeRenderer;
var getCryptoRenderer;
var invoiceRenderer;


$(document).ready(function(){

          var urlstring = window.location.href ;





          var url_parts = url.parse(urlstring, true);
          var query = url_parts.query;

          console.log('query2', query)

      loadNavbar();

      if($("#home").length > 0){

          console.log('found home ' )
        homeRenderer = new HomeRenderer();

        genericDashboard.init(homeRenderer, query);


        var activeProductsContainerRenderer = new ActiveProductsContainerRenderer();
        activeProductsContainerRenderer.init();


      }


      if($("#user-show").length > 0){

        var activeProductsContainerRenderer = new ActiveProductsContainerRenderer();
        activeProductsContainerRenderer.init();

      }

      if($("#product-show").length > 0){

        var activeProductsContainerRenderer = new ActiveProductsContainerRenderer();
        activeProductsContainerRenderer.init();

        var productShow = new ProductShow();
        productShow.init();

      }

      if($("#order-new").length > 0){


        var orderNew = new OrderNew();
        orderNew.init();

      }


      if($("#invoice").length > 0){

        invoiceRenderer = new InvoiceRenderer();

        genericDashboard.init(invoiceRenderer, query);


      }

      if($("#get-crypto").length > 0){

        getCryptoRenderer = new GetCryptoRenderer();

        genericDashboard.init(getCryptoRenderer, query);


      }


});


function loadNavbar(){
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
