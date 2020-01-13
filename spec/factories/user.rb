FactoryBot.define do
  factory :user do
    name     { Faker::Name.first_name }
  #  last_name     { Faker::Name.first_name }
    email     { Faker::Internet.email }
   password     { Faker::Internet.password(8) }
  end
end
