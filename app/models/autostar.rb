class Autostar
  def self.calculate_stars(review)
    task = Task.new("bradhe/autostars", ENV["TOWER_SECRET_KEY"])
    result = task.do(review: review)
    result.number()
  end

  class Result
    def initialize(data)
      @data = JSON.parse(data)
    end

    def number()
      @data["result"]["number"].to_f
    end

    def string()
      @data["result"]["string"].to_s
    end
  end

  class Task
    def initialize(task_name, secret_key)
      @task_name = task_name
      @secret_key = secret_key
    end

    def do(*params)
      if params.empty?
        params = {}
      else
        params = params.first
      end

      conn = self.open_conn()

      response = conn.post("/api/apps/#{@task_name}/inference") do |req|
        req.body = params.to_json()
      end

      Result.new(response.body)
    end

    def open_conn()
      Faraday.new(
        url: 'https://services.tower.dev',
        headers: {
          'Content-Type' => 'application/json',
          'Authorization' => "Bearer #{@secret_key}"
        }
      )
    end
  end
end
