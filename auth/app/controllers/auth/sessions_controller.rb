module Auth
  class SessionsController < ApplicationController
    def create
      begin
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
          render json: user, serializer: UserSerializer, token: encode_token(user_id: user.id), status: :ok
        else
          render json: { errors: "Invalid email or password" }, status: :unauthorized
        end
      rescue Mongoid::Errors::DocumentNotFound
        render json: { errors: "Invalid email or password" }, status: :unauthorized
      end
    end
  end
end
