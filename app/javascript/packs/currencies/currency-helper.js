//might be handling this improperly as a singleton..

var registeredTargets = [];
export default class CurrencyHelper {


    registerSelectCurrencyChangeCallback(target)
    {
      registeredTargets.push(target);
    }

    fireOnCurrencyChange()
    {
      console.log(registeredTargets)
      registeredTargets.forEach(t => t.onCurrencyChanged())
    }


    setSelectedCurrencyId(currencyId)
    {

      console.log('select currency', currencyId )
      sessionStorage.setItem( "primaryCurrencyId",   currencyId  );

      this.fireOnCurrencyChange()

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
