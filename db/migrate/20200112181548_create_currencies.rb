class CreateCurrencies < ActiveRecord::Migration[5.2]
  def change
    create_table :currencies do |t|
      t.string :name, :null => false
      t.string :eth_contract_address

      t.timestamps
    end
  end
end
