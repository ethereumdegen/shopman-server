class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :name, :null => false
      t.integer :product_category_id
      t.integer :seller_id, :null => false
      t.text :description

      t.timestamps
    end
  end
end
