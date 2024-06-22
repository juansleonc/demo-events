class EventsController < ApplicationController
  before_action :set_event, only: [:show, :update, :destroy]
  before_action :authenticate_user

  # GET /events
  def index
    @events = Event.where(user_id: @current_user_id)
    render json: @events
  end

  # GET /events/:id
  def show
    render json: @event
  end

  # POST /events
  def create
    @event = Event.new(event_params)
    @event.user_id = @current_user_id

    if @event.save
      render json: @event, status: :created
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /events/:id
  def update
    if @event.update(event_params)
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # DELETE /events/:id
  def destroy
    @event.destroy
    head :no_content
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit(:name, :description, :date, :location, :capacity)
  end

  def authenticate_user
    @current_user_id = request.env['current_user_id']
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user_id
  end
end
