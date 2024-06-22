FactoryBot.define do
  factory :event do
    name { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
    date { Faker::Date.forward(days: 23) }
    location { Faker::Address.full_address }
    capacity { rand(10..100) }
    association :user
  end
end
