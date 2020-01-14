/*
unit tests for this file would be helpful

*/
export default class ShoppingCartHelper {


    addItemToCart(productId, quantity)
    {

        var cart = this.getCurrentShoppingCart();

        var existingIndex = this.getIndexOfItemInCart( productId )

        if(existingIndex == -1){
          console.log(JSON.stringify( cart ))
          cart.push({product_id: productId, quantity: quantity })
          sessionStorage.setItem( "shoppingCart", JSON.stringify( cart ) );
        }else{
          this.addQuantityToItemInCart(existingIndex, quantity)
        }

        return this.getCurrentShoppingCart();

    }

    getIndexOfItemInCart(productId)
    {
      var cart = this.getCurrentShoppingCart();

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

    addQuantityToItemInCart(index,quantity)
    {
        var cart = this.getCurrentShoppingCart();
        var row = cart[index];

        var newQuantity = row.quantity + quantity;

        cart[index] = {product_id: row.product_id, quantity: newQuantity }
        console.log('newcart', cart )
        sessionStorage.setItem( "shoppingCart", JSON.stringify( cart ) );

    }



    clearShoppingCart()
    {
        sessionStorage.setItem( "shoppingCart", null );
    }


    getCurrentShoppingCart()
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
