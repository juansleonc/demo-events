module ResponseHandler
  extend ActiveSupport::Concern

  def render_success(data, status: :ok, serializer: nil, each_serializer: nil, token: nil)
    if each_serializer
      render json: data, each_serializer: each_serializer, status: status
    elsif serializer
      render json: serializer.new(data).serializable_hash.merge(token ? { token: token } : {}), status: status
    else
      render json: data, status: status
    end
  end

  def render_error(errors, status: :unprocessable_entity)
    render json: { errors: errors }, status: status
  end
end
