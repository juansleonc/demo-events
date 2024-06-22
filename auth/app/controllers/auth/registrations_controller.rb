module Auth
  class RegistrationsController < ApplicationController
    def create
      user = User.new(user_params)
      if user.save
        render json: { token: encode_token(user_id: user.id) }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :role)
    end
  end
end