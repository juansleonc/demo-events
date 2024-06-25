module ErrorHandler
  extend ActiveSupport::Concern

  included do
    rescue_from Mongoid::Errors::DocumentNotFound, with: :record_not_found
    rescue_from Mongoid::Errors::Validations, with: :unprocessable_entity
  end

  private

  def record_not_found(exception)
    render json: { errors: exception.message }, status: :not_found
  end

  def unprocessable_entity(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
