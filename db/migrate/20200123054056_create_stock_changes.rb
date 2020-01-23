class CreateStockChanges < ActiveRecord::Migration[5.2]
  def change
    create_table :stock_changes do |t|
      t.integer :product_id
      t.integer :delta

      t.timestamps
    end
  end
end
