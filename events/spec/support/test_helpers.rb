# frozen_string_literal: true

module TestHelpers
  def json_body
    JSON.parse(response.body, symbolize_names: true)
  end
end
