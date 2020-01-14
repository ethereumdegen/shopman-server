class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.integer :user_id 
      t.string :invoice_uuid
      t.integer :order_status
      t.string :tracking_number

      t.timestamps
    end
  end
end
