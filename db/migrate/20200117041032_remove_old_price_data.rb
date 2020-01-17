class RemoveOldPriceData < ActiveRecord::Migration[5.2]
  def change

    remove_column :products, :price_currency_id, :integer
    remove_column :products, :price_raw_units, :integer, limit: 8 #ex. satoshis
    remove_column :order_rows, :price_currency_id, :integer, limit: 8 #ex. satoshis
    remove_column :order_rows, :price_raw_units, :integer, limit: 8 #ex. satoshis


  end
end
