# frozen_string_literal: true

module Auth
  class SessionsController < ApplicationController
    include ErrorHandler
    include ResponseHandler

    def create
      user = find_user_by_email(params[:email])
      if user&.authenticate(params[:password])
        render_success(user, status: :ok, serializer: UserSerializer, token: encode_token(user_id: user.id))
      else
        render_error('Invalid email or password', status: :unauthorized)
      end
    end

    private

    def find_user_by_email(email)
      User.find_by(email:)
    rescue Mongoid::Errors::DocumentNotFound
      nil
    end
  end
end
