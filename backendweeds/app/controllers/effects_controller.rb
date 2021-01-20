class EffectsController < ApplicationController

    def index
        @effects = Effect.all 
        render json: @effects
    end
end
