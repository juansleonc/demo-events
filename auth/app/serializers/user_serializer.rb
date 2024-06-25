class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :role, :token

  def token
    instance_options[:token]
  end
end
