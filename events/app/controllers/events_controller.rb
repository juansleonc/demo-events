# frozen_string_literal: true

class EventsController < ApplicationController
  include ErrorHandler
  include ResponseHandler

  before_action :set_event, only: %i[show update destroy]
  before_action :authenticate_user

  def index
    events = current_user_events
    render_success(events, each_serializer: EventSerializer)
  end

  def show
    render_success(@event, serializer: EventSerializer)
  end

  def create
    event = build_event
    if event.save
      render_success(event, status: :created, serializer: EventSerializer)
    else
      render_error(event.errors)
    end
  end

  def update
    if @event.update(event_params)
      render_success(@event, serializer: EventSerializer)
    else
      render_error(@event.errors)
    end
  end

  def destroy
    @event.destroy
    head :no_content
  end

  private

  def current_user_events
    Event.where(user_id: @current_user_id)
  end

  def build_event
    Event.new(event_params).tap do |event|
      event.user_id = @current_user_id
    end
  end

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit(:name, :description, :date, :location, :capacity)
  end

  def authenticate_user
    @current_user_id = request.env['current_user_id']
    render_error('Not Authorized', :unauthorized)  unless @current_user_id
  end
end
