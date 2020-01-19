

import ShoppingCartHelper from '../../app/javascript/packs/products/shopping-cart-helper.js'
var shoppingCartHelper = new ShoppingCartHelper();


var assert = require('assert');
describe('Array', function() {
  describe('add product', function() {
    it('should properly add product to cart', function(){

        var cart = ShoppingCartHelper.addItemToCart(1,1,1)

        var expected = [ { product_id: 1, quantity: 1, currency_id: 1 } ]

        console.log('cart is ',  JSON.stringify(cart))

        assert.equal(  JSON.stringify(cart) , JSON.stringify(expected)   );




        var cart = ShoppingCartHelper.addItemToCart(1,1, 1)

        var expected = [ { product_id: 1, quantity: 2, currency_id: 1 } ]

        console.log('cart is ',  JSON.stringify(cart))

        assert.equal(  JSON.stringify(cart) , JSON.stringify(expected)   );


    });
  });
});
