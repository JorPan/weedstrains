class JoinersController < ApplicationController

    def index
        # byebug
        @joiners = Joiner.all 
        render json: @joiners 
    end

    def create
$strainstodisplay = []
selectedpositiveeffects = []
selectednegativeeffects = []
selectedmedicaleffects = []
selecteffects = []  
        params.each do |key, value|
           if (key.include? "effect" && "positive")
                selectedpositiveeffects.push(key.split("-").first)
           elsif (key.include? "effect" && "medical")
            selectedmedicaleffects.push(key.split("-").first)
           elsif (key.include? "effect" && "negative")
            selectednegativeeffects.push(key.split("-").first)
           end
           
           selecteffects.push(Effect.find_by effect: "{\"effect\"=>\"Relaxed\", \"type\"=>\"positive\"}")
        end


       selectedstrains = []
       clearspositive = Strain.all.select do |strain|
        selectedpositiveeffects.each do |poseffect|
            break if strain.positive_effects.exclude? poseffect
        end
    end
        clearsmedical = clearspositive.select do |strain|
            selectedmedicaleffects.each do |medeffect|
                break if strain.medical_effects.exclude? medeffect
            end
        end

            clearsallthree = clearsmedical.select do |strain|
                selectednegativeeffects.each do |negeffect|
                    break if strain.negative_effects.include? negeffect
                end
            end

        clearsallthree.each do |strain|
            $strainstodisplay.push(strain)
        end

        strainarray = $strainstodisplay.each do |strain|
            Strain.find_by name: strain.name
        end

        effectarray = Effect.all.each do |effect|
            effect.id
        end


        byebug
        redirect_to "http://localhost:3001"







    end


    


end
