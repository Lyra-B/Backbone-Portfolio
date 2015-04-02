class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :biography
      t.string :mission
      t.string :image_url

      t.timestamps null: false
    end
  end
end
