class Autostar
  def self.calculate_stars(review)
    task = Task.new("bradhe/autostars", ENV["TOWER_SECRET_KEY"])
    result = task.do(review: review)
    result.number()
  end
end
