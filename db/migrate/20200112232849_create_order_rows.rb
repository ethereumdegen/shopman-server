class CreateOrderRows < ActiveRecord::Migration[5.2]
  def change
    create_table :order_rows do |t|
      t.integer :order_id, :null => false
      t.integer :product_id, :null => false
      t.integer :quantity, :null => false

      t.integer :price_currency_id, :null => false
      t.integer :price_raw_units, limit: 8#ex. satoshis



      t.timestamps
    end
  end
end
