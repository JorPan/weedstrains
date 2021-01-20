# Herbals
 This app accesses an extensive database with information about positive effects, negative effects, and medical effects of different weed strains.  It is designed so the user can search for a strain and learn more about it, or provide their preferences for the effects they'd like to experience and which negative effects they'd like to avoid.  After indicating those preferences by checking boxes, users will see all the strains that match those preferences. 
 
 ## Inspiration
 This app was inspired by the idea that users may want to indicate which positive and medical effects they are looking for before making a decision about which weed strain to buy or grow.  It empowers users to learn about strains they may buy from dispensaries.  It puts a focus on the user's needs and wishes in relationship with this plant medicine.
 
 ## Technologies 
 
 💻Ruby <br />
 💻Rails <br />
 💻Javascript <br />
 💻SQLite3 // postgresql for deployment <br />
 💻Active Record <br />
 
 ## Demo Video
 
 [Herbals - Strain Suggester Intro Video](https://youtu.be/DBSvbyIl-LU)
 
 ## Setup
 
- In order to experience this app, users must clone this Github repository and open it in their code editor. 
- Install the Ruby gems by running "bundle install". 
- Create your local database by running "rails db:migrate". 
- Seed the database by running "rails db:seed". 
- After doing all of that, start up the back-end by running "rails s", and the front-end by running "lite-server", which will open the app in your browser. 

## Instructions

There a couple of ways to interface with this app.  If you'd like to search for a specific strain, or all strains that contain a specific word, then use the search function.  If you'd like to filter through all of the strains and find the positive effects and medical effects you're looking for, use the checkboxes to indicate what you're looking for, then get suggestions.  Also, indicate which negative effects you'd like to avoid by using the checkboxes to indicate what you would not like to experience. 

## Code Example

```
def create
        Joiner.destroy_all
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

        strainarray = $strainstodisplay.map do |strain|
            Strain.find_by name: strain.name
        end

        effectarray = Effect.all.map do |effect|
            effect.id
        end

       @joiners = strainarray.map do |strain|
            Joiner.create(
                strain_id: strain.id,
                name: strain.name,
                category: strain.race,
                flavors: strain.flavor,
                positive_effects: strain.positive_effects,
                medical_effects: strain.medical_effects,
                negative_effects: strain.negative_effects
            )
        end

        redirect_to "http://localhost:3001/suggestions.html" 
        
    end


```
    
## Status
    
We are consistently trying to improve the user's experience with this app.  We value feedback from our community.  On that note, we have some ideas for improving this app:

🦾 A way to collect feedback from the community about the app user experience <br />
🦾 A way to collect feedback from the community about whether their experiences with the weed strains align with the information we have <br />
🦾 Forums to discuss different weed strains <br />
🦾 Adding other plant medicines or fungi to the app with more information <br />

## Contact 

[Linkedin](https://www.linkedin.com/in/cassandra-whitty-0a184a1a4/) Cassandra Whitty <br />
[Linkedin](https://www.linkedin.com/in/christopher-henderson-665796201/) Christopher Henderson <br />
[Linkedin](https://www.linkedin.com/in/jordan-panasewicz-77a93158/) Jordan Panasewicz
