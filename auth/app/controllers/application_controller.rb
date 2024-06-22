class ApplicationController < ActionController::API
  # before_action :authorized

  # def authorized
  #   render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
  # end

  # def logged_in?
  #   !!current_user
  # end

  # def current_user
  #   if decoded_token
  #     user_id = decoded_token[0]['user_id']
  #     @current_user = User.find(user_id)
  #   end
  # rescue
  #   nil
  # end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def auth_header
    request.headers['Authorization']
  end

  def encode_token(payload)
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end
end
