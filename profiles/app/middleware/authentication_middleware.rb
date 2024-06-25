class AuthenticationMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    auth_header = env['HTTP_AUTHORIZATION']
    if auth_header.present?
      token = auth_header.split(' ').last
      decoded_token = decode_token(token)
      if decoded_token
        env['current_user_id'] = decoded_token[0]['user_id']
        return @app.call(env)
      end
    else
      unauthorized_response
    end
  end

  private

  def decode_token(token)
    secret_key = Rails.application.secrets.secret_key_base
    begin
      JWT.decode(token, secret_key, true, algorithm: 'HS256')
    rescue JWT::DecodeError
      nil
    end
  end

  def unauthorized_response
    [401, { 'Content-Type' => 'application/json' }, [{ error: 'Unauthorized' }.to_json]]
  end
end
