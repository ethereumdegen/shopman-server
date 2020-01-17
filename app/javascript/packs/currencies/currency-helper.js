
export default class CurrencyHelper {


    setSelectedCurrencyId(currencyId)
    {

      console.log('select currency', currencyId )
      sessionStorage.setItem( "primaryCurrencyId",   currencyId  );


    }

    getSelectedCurrencyId( )
    {
      var selectedCurrencyId = sessionStorage.getItem( "primaryCurrencyId"  )

      if(typeof selectedCurrencyId == 'undefined')
      {
        //return default currency
          return 1;
      }

    }

    getActivePriceFromArray(price_data_array)
    {
      for(var i=0;i<price_data_array.length;i++)
      {
        if(price_data_array[i].currency_id == this.getSelectedCurrencyId())
        {
          return price_data_array[i];
        }

      }
      return price_data_array[0];

    }




}
