# frozen_string_literal: true

class DateValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    return if value.blank?

    return unless value <= Time.zone.now

    record.errors.add(attribute, 'must be after the current time')
  end
end
