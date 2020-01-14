class AddPriceToProduct < ActiveRecord::Migration[5.2]
  def change

    add_column :products, :price_currency_id, :integer
    add_column :products, :price_raw_units, :integer, limit: 8 #ex. satoshis


  end
end
