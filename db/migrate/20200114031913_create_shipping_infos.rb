class CreateShippingInfos < ActiveRecord::Migration[5.2]
  def change
    create_table :shipping_infos do |t|

      t.integer :shippable_id, :null => false
      t.string :shippable_type, :null => false

      t.string :ship_to_name, :null => false
      t.string :streetAddress, :null => false
      t.string :stateCode, :null => false
      t.string :zipCode, :null => false
      t.string :countryCode, :null => false

      t.timestamps
    end
  end
end
