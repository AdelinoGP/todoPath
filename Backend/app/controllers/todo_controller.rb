class TodoController < ApplicationController
  before_action :set_todo, only: %i[show update destroy complete]
  before_action :authorize_user, only: [:show, :update, :destroy, :complete]

  def index
    if current_user
      render json: current_user.projects.includes(:todos).map(&:todos).flatten
    else
      render json: { error: 'User not logged in' }, status: :unauthorized
    end
  end

  def project_todos
    project = current_user.projects.find(params[:project_id])
    render json: project.todos
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Project not found' }, status: :not_found
  end

  def show
    render json: @todo
  end

  def create
    todo = Todo.new(todo_params)
    if todo.save
      render json: todo, status: :created
    else
      render json: todo.errors, status: :unprocessable_entity
    end
  end

  def update
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @todo.destroy
      head :no_content
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  def complete
    if @todo.mark_as_completed()
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  private

  def set_todo
    @todo = Todo.find(params[:id])
  end

  def todo_params
    params.permit(:title, :description, :project_id)
  end

  def authorize_user
    unless @todo.project.user == current_user
      render json: { error: 'Not Authorized' }, status: :unauthorized
    end
  end
end
