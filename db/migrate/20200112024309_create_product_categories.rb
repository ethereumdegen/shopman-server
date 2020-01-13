class CreateProductCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :product_categories do |t|
      t.string :name, :null => false
      t.integer :parent_category_id

      t.timestamps
    end
  end
end
