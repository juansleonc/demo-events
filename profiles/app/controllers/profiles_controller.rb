class ProfilesController < ApplicationController
  before_action :authenticate_user!

  def show
    render json: current_user.profile
  end

  def update
    if current_user.update(profile_params)
      render json: current_user.profile, status: :ok
    else
      render json: current_user.errors, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.require(:user).permit(:name, :email, :bio, :avatar)
  end
end
