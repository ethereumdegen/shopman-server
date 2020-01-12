class AddShippingDaysToProduct < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :est_shipping_days, :integer #ex. satoshis

  end
end
