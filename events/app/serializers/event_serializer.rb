class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :date, :location, :capacity, :user_id
end