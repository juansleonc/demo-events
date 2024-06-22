class AuthenticationService
  def initialize(user)
    @user = user
  end

  def login(email, password)
    user = User.find_by(email: email)
    return nil unless user&.authenticate(password)

    JsonWebToken.encode(user_id: user.id)
  end
end
