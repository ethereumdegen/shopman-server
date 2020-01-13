

import ShoppingCartHelper from '../../app/javascript/packs/products/shopping-cart-helper.js'
var shoppingCartHelper = new ShoppingCartHelper();


var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
