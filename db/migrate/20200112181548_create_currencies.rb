class CreateCurrencies < ActiveRecord::Migration[5.2]
  def change
    create_table :currencies do |t|
      t.string :name
      t.string :eth_contract_address

      t.timestamps
    end
  end
end
