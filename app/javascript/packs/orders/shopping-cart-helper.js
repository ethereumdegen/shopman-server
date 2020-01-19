/*
unit tests for this file would be helpful

*/
export default class ShoppingCartHelper {


    static addItemToCart(productId, quantity, currencyId)
    {

        var cart = ShoppingCartHelper.getCurrentShoppingCart();




        var existingIndex = ShoppingCartHelper.getIndexOfItemInCart( productId, currencyId )

        if(existingIndex == -1){
          console.log(JSON.stringify( cart ))
          cart.push({product_id: productId, quantity: quantity, currency_id: currencyId })

            if(ShoppingCartHelper.hasConflictingCurrenciesInCart(cart))
            {
                return {success:false, cart: this.getCurrentShoppingCart(), message:'Cannot add items using different currencies.'};
            }

          sessionStorage.setItem( "shoppingCart", JSON.stringify( cart ) );

        }else{
          ShoppingCartHelper.addQuantityToItemInCart(existingIndex, quantity)
        }

        return {success:true, cart: ShoppingCartHelper.getCurrentShoppingCart()};

    }

    static hasConflictingCurrenciesInCart(cart)
    {
        var previous_currency_id = null;


      for(var i=0;i<cart.length;i++)
      {
        var item = cart[i];
        var currency_id = item.currency_id;

        if( previous_currency_id == null || previous_currency_id == currency_id   )
        {
          previous_currency_id = currency_id;
        }else {
           return true
        }

      }

      return false
    }

   


    static getIndexOfItemInCart(productId)
    {
      var cart = ShoppingCartHelper.getCurrentShoppingCart();

      for(var i=0; i<cart.length; i++)
      {
        var row = cart[i];

        if(row.product_id == productId)
        {
          return i;
        }
      }

      return -1;
    }

    static addQuantityToItemInCart(index,quantity)
    {
        var cart = ShoppingCartHelper.getCurrentShoppingCart();
        var row = cart[index];

        var newQuantity = row.quantity + quantity;

        cart[index] = {product_id: row.product_id, quantity: newQuantity, currency_id: row.currency_id }
        console.log('newcart', cart )
        sessionStorage.setItem( "shoppingCart", JSON.stringify( cart ) );

    }



    static clearShoppingCart()
    {
        sessionStorage.setItem( "shoppingCart", null );
    }


    static getCurrentShoppingCart()
    {
      var cart =  JSON.parse( sessionStorage.getItem( "shoppingCart"  ));



      if(cart == null)
      {
        cart = [];
      }


      console.log('values', cart )
      return Array.from(cart);//different array format with no keys

    }

}
