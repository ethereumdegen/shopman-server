class CreateProductPrices < ActiveRecord::Migration[5.2]
  def change
    create_table :product_prices do |t|
      t.integer :product_id
      t.integer :currency_id
      t.integer :price_raw_units

      t.timestamps
    end
  end
end
