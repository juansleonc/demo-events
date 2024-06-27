# frozen_string_literal: true

class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :date, :location, :latitude, :longitude, :capacity, :user_id
end
