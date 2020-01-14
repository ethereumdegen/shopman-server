FactoryBot.define do
  factory :product_category do
    name     { Faker::Name.last_name }
  #  last_name     { Faker::Name.first_name }
    #email     { Faker::Internet.email }
  # password     { Faker::Internet.password(8) }
  end
end
