class AddEnabledToProduct < ActiveRecord::Migration[5.2]
  def change

    add_column :products, :enabled, :boolean, default: true


  end
end
