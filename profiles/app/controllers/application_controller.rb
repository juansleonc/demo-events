# frozen_string_literal: true

class ApplicationController < ActionController::API
  def current_user
    @current_user ||= User.find(request.env['current_user_id'])
  end
end
