class AddDecimalsToCurrency < ActiveRecord::Migration[5.2]
  def change
    add_column :currencies, :decimals, :integer #ex. satoshis

  end
end
