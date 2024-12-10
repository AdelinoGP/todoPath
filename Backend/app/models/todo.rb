class Todo < ApplicationRecord
  belongs_to :project
  
  validates :title, presence: true, length: { maximum: 140 }
  validates :description,  length: { maximum: 600 }

  attribute :is_completed, :boolean, default: false
  attribute :created_at, :datetime, default: -> { Time.current }
  attribute :completed_at, :datetime

  def mark_as_completed
    update(is_completed: true, completed_at: Time.current)
  end
 
  def mark_as_incomplete
    update(is_completed: false, completed_at: nil)
  end
end