# frozen_string_literal: true

class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  field :email, type: String
  field :password_digest, type: String
  field :role, type: String, default: 'user'
  field :avatar, type: String, default: 'http://example.com/avatar.png'

  has_secure_password
  has_many :events

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :email, presence: true, uniqueness: { case_sensitive: false },
                    format: { with: VALID_EMAIL_REGEX }
  validates :password, presence: true, length: { minimum: 6 }
  validates :role, presence: true, inclusion: { in: %w[user admin] }

  before_save :downcase_email

  private

  def downcase_email
    self.email = email.downcase
  end
end
