

var $ = require("jquery");

import Vue from 'vue/dist/vue.esm.js';

import GenericDashboard from './generic-dashboard'

import AlertRenderer from './alert-renderer'

import HomeRenderer from './home-renderer'

import InvoiceRenderer from './invoice-renderer'

import ActiveProductsContainerRenderer from './products/active-product-container-renderer'



var url = require('url');

var web3utils = require('web3-utils')


//var flash = require('./flash')

var genericDashboard = new GenericDashboard();

var alertRenderer = new AlertRenderer();
var homeRenderer;
var invoiceRenderer;


$(document).ready(function(){

          var urlstring = window.location.href ;





          var url_parts = url.parse(urlstring, true);
          var query = url_parts.query;

          console.log('query', query)



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

      }


      if($("#invoice").length > 0){

        invoiceRenderer = new InvoiceRenderer();

        genericDashboard.init(invoiceRenderer, query);


      }



});
