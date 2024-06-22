class User

  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  field :email, type: String
  field :password_digest, type: String
  field :role, type: String, default: "user"

  has_secure_password
  has_many :events

  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 6 }
  validates :role, presence: true, inclusion: { in: %w[user admin] }

  before_save :downcase_email

  private

  def downcase_email
    self.email = email.downcase
  end
end
