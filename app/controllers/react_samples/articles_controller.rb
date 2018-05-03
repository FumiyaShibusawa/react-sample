class ReactSamples::ArticlesController < ApplicationController
  def index
    @q = Article.ransack(params[:q])
    raw_articles_data = JSON.parse @q.result.page(params[:page]).per(10).to_json
    respond_to do |format|
      format.html
      format.json { render json: raw_articles_data }
    end
  end
end
