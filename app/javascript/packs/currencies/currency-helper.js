
export default class CurrencyHelper {


    setSelectedCurrencyId(currencyId)
    {

      console.log('select currency', currencyId )
      sessionStorage.setItem( "primaryCurrencyId",   currencyId  );


    }

    getSelectedCurrencyId( )
    {
      var selectedCurrencyId = sessionStorage.getItem( "primaryCurrencyId"  )

      if( selectedCurrencyId != null)
      {
        //return default currency
          return selectedCurrencyId;
      }else{

        return 1;
      }

    }

    getActivePriceFromArray(price_data_array)
    {
      for(var i=0;i<price_data_array.length;i++)
      {
        console.log('sel cur',this.getSelectedCurrencyId())
        if(price_data_array[i].currency.id == this.getSelectedCurrencyId())
        {
          return price_data_array[i];
        }

      }
      return price_data_array[0];

    }




}
