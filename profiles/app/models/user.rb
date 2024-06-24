class User
  include Mongoid::Document
  include Mongoid::Timestamps

  field :email, type: String
  field :name, type: String
  field :bio, type: String
  field :avatar, type: String

  validates :email, presence: true, uniqueness: true
  validates :name, presence: true

  def profile
    {
      email: email,
      name: name,
      bio: bio,
      avatar: avatar
    }
  end
end
