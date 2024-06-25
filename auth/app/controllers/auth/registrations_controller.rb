# frozen_string_literal: true

module Auth
  class RegistrationsController < ApplicationController
    include ErrorHandler
    include ResponseHandler

    def create
      user = User.new(user_params)
      if user.save
        render_success(user, status: :created, serializer: UserSerializer, token: encode_token(user_id: user.id))
      else
        render_error(user.errors.full_messages)
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :role)
    end
  end
end
