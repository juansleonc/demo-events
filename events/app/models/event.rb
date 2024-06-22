class Event
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :description, type: String
  field :date, type: Time
  field :location, type: String
  field :capacity, type: Integer
  belongs_to :user

  validates :name, :description, :date, :location, :capacity, presence: true
  validates :name, length: { maximum: 255 }
  validates :description, length: { maximum: 255 }
  validates :location, length: { maximum: 255 }
  validates :capacity, numericality: { only_integer: true }
  validates :date, date: { after: Time.now }
  validates :user, presence: true
end
