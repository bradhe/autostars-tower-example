class ReviewController < ApplicationController
  def post
    review = params[:review]
    stars = Autostar.calculate_stars(review)
    render :json => { stars: stars }
  end
end
