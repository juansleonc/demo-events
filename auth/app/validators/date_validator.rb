class DateValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    return if value.blank?
    if value <= Time.now
      record.errors.add(attribute, 'must be after the current time')
    end
  end
end
