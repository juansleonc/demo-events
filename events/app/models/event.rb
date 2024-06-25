# frozen_string_literal: true

class Event
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :description, type: String
  field :date, type: Time
  field :location, type: String
  field :capacity, type: Integer
  field :user_id, type: BSON::ObjectId

  validates :name, :description, :date, :location, :capacity, presence: true
  validates :name, length: { maximum: 255 }
  validates :description, length: { maximum: 255 }
  validates :location, length: { maximum: 255 }
  validates :capacity, numericality: { only_integer: true }
  validates :date, date: { after: Time.zone.now }
  validates :user_id, presence: true
end
