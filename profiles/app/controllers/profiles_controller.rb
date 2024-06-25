# frozen_string_literal: true

class ProfilesController < ApplicationController
  include ErrorHandler
  include ResponseHandler

  def show
    render_success(current_user, serializer: ProfileSerializer)
  end

  def update
    if current_user.update(profile_params)
      render_success(current_user, status: :ok, serializer: ProfileSerializer)
    else
      render_error(current_user.errors)
    end
  end

  private

  def profile_params
    params.require(:user).permit(:name, :email, :bio, :avatar)
  end
end
