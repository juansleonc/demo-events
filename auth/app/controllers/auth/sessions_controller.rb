module Auth
  class SessionsController < ApplicationController
    def create
      user = User.find_by(email: params[:email])
      if user&.authenticate(params[:password])
        render json: { token: encode_token(user_id: user.id) }
      else
        render json: { errors: "Invalid email or password" }, status: :unauthorized
      end
    end
  end
end
