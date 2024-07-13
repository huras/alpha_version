module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Second project
    await queryInterface.bulkInsert('Backgrounds', [
      {
        "id": 5,
        "name": "Tea Room in Heaven",
        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_backgrounds/00002-3823420843.png",
        "lod0_description": JSON.stringify([
          { "sky": "The sky is a gradient of colors, transitioning from a soft orange near the horizon to a deep blue as it ascends." },
          { "clouds": "Fluffy white clouds are scattered across the sky, some tinged with a light pink hue, giving the scene a dreamy, almost magical feel." },
          { "a_tea_tabble": "A low tea table sits in the center of the room, adorned with a delicate tea set and a vase of fresh flowers." },
          { "shooting_stars": "Among the clouds, you can see several shooting stars, adding a sense of wonder and fantasy to the scene." },
          { "ambiance": "The overall ambiance suggests a tranquil, early evening or dawn setting, with the light suggesting a peaceful, almost otherworldly quality." }
        ]),
        "lod3_description": "A tranquil tea room with a breathtaking view of the sky, where the gentle breeze adds to the serene atmosphere.",
        "parentBackground": null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 6,
        "name": "Starting point in another world",
        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_backgrounds/00015-229592263.png",
        "lod0_description": JSON.stringify([
          { "two roadpaths": "Two dirt paths wind through the lush green countryside, inviting exploration." },
          { "mountains": "In the distance, sharp-peaked mountains rise majestically against the clear blue sky." },
          { "green hills": "Rolling green hills dominate the landscape, covered in vibrant vegetation." },
          { "tree": "To the left, a single tree stands tall, casting a small shadow on the ground." },
          { "sky": "The sky is clear and blue, with a few fluffy white clouds scattered across it." },
          { "lush vegetation": "The entire scene is filled with lush green vegetation, indicating a healthy and thriving ecosystem." }
        ]),
        "lod3_description": `A beautiful, serene landscape with rolling green hills and lush vegetation. In the background, there are several distinctive, sharp-peaked mountains that rise majestically against a clear blue sky dotted with fluffy white clouds. The foreground features a winding dirt path that meanders through the verdant countryside, leading the viewer's eye into the scene and towards the distant mountains.`,
        "parentBackground": null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 7,
        "name": "Portal to anoter world in Heaven",
        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_backgrounds/f1a3c7cd-5eb9-41ad-9052-0c3153a985af.webp",
        "lod0_description": JSON.stringify([
          { "heavenly_aurora": "The sky is filled with a heavenly aurora, with golden and luminous clouds giving a celestial appearance." },
          { "portal": "A hole in the clouds acts as a portal, revealing a magical parallel planet Earth in space." },
          { "magical_planet": "The parallel planet Earth is vibrant with colors and mystical energy, showcasing enchanted forests and sparkling rivers." },
          { "cosmic_sky": "Above the portal, the sky is filled with stars and cosmic phenomena, creating an awe-inspiring atmosphere." }
        ]),
        "lod1_description": JSON.stringify([
          { "heavenly_aurora": "The sky is a blend of golden and luminous clouds, creating a celestial and divine ambiance." },
          { "portal": "A mystical hole in the clouds reveals a view of a parallel magical planet Earth floating in space." },
          { "magical_planet": "The planet displays enchanted forests, sparkling rivers, and mystical structures, glowing with vibrant energy." },
          { "cosmic_sky": "The sky above the portal is adorned with stars and cosmic lights, enhancing the magical feel." }
        ]),
        "lod2_description": JSON.stringify([
          { "heavenly_aurora": "Golden and luminous clouds fill the sky, creating a celestial atmosphere." },
          { "portal": "A hole in the clouds reveals a parallel magical planet Earth in space." },
          { "magical_planet": "The planet shows vibrant landscapes with enchanted forests and sparkling rivers." },
          { "cosmic_sky": "Stars and cosmic phenomena fill the sky above the portal, creating an awe-inspiring view." }
        ]),
        "lod3_description": "A celestial scene with a portal in the clouds revealing a magical parallel planet Earth in space, surrounded by golden luminous clouds and cosmic phenomena.",
        "parentBackground": null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

    await queryInterface.bulkInsert('Characters', [
      { // God
        "id": 7,
        "mugshot": JSON.stringify({
          "scale": 0.46,
          "x": 0.5,
          "y": 0.12
        }),
        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00068-4230357472.png",
        "fullname": "God 'Supreme Being'",
        "character_relationships": JSON.stringify({
          "friends": [],
          "enemies": [],
          "romantic_interests": []
        }),
        "lod0_description": JSON.stringify({
          "alignment": "True Neutral",
          "family": "Unknown",
          "race": "Deity",
          "neutral_traits": ["All-knowing", "Immutable", "Unbiased"],
          "negative_traits": ["Indifferent", "Inscrutable"],
          "known_characters": ["Touya Mochizuki", "Regina Babylon"],
          "skills": ["Omnipotence Lv ∞", "Omniscience Lv ∞", "Reality Manipulation Lv ∞"],
          "short_backstory": "God accidentally took Touya's life and as an apology, reincarnated him in a new world with any one wish granted, which was a smartphone.",
          "age": "Ageless",
          "core_memories": {
            "sad": ["Accidentally killing Touya Mochizuki"],
            "joy": ["Touya successfully adapting to the new world"],
            "fear": ["Causing irreparable damage to life or reality"],
            "disgust": ["Those who misuse the gifts he gives"],
            "anger": ["Deliberate and harmful distortion of the natural order"]
          },
          "long_term_goals": ["Maintain the balance of the universe", "Guide Touya in his new life"],
          "physical_appearance": {
            "hair_color": "White",
            "eye_color": "Blue",
            "height": "Variable",
            "build": "Slim"
          },
          "personality_traits": ["Dispassionate", "Equitable", "Patient", "Curious"],
          "beliefs_values": {
            "justice": "Administers justice impartially regardless of personal feelings",
            "honor": "Stands by his decisions and takes responsibility for his actions",
            "family": "Believes in nurturing and protecting all forms of life"
          },
          "relationships": {
            "friends": ["Touya Mochizuki"],
            "enemies": [],
            "romantic_interests": []
          },
          "fears_vulnerabilities": {
            "fears": ["Upsetting the balance of life"],
            "vulnerabilities": ["Has to remain impartial"]
          },
          "unique_abilities_powers": ["Omnipresence", "Reality Creation", "Temporal Manipulation"],
          "hobbies_interests": ["Watching over the world", "Interacting indirectly with Touya"],
          "quirks_habits": ["Speaking in a cryptic manner", "Occasionally meddling with Touya's quests"],
        }),
        "lod1_description": `The character is a True Neutral deity with a slim build and variable height, featuring white hair and blue eyes. Known for being dispassionate and equitable, they possess vast powers such as omnipresence and reality manipulation. They are all-knowing, unbiased, and often appear indifferent and inscrutable. Their main goal is to maintain the balance of the universe while guiding Touya Mochizuki, whom they accidentally killed and then reincarnated with a smartphone. Despite their godly status, they have a fear of upsetting the natural balance and a tendency to speak cryptically, occasionally meddling in Touya's quests.`,
        "lod2_description": `A True Neutral deity with white hair and blue eyes, this slim, ageless figure wields omnipresence and reality manipulation. Dispassionate and equitable, they aim to maintain the universe's balance while guiding Touya Mochizuki, whom they reincarnated after an accidental death. Known for speaking cryptically and subtly meddling in quests, their key traits include being all-knowing, unbiased, and indifferent.`,
        "lod3_description": `A True Neutral, white-haired, omnipotent deity guiding Touya Mochizuki after accidentally killing him, subtly meddling with cryptic advice to maintain universal balance.`,
        "character_type": "NPC",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { // Gayzaum mercante que compra a roupa
        "id": 8,
        "mugshot": JSON.stringify({
          "scale": 0.46,
          "x": 0.5,
          "y": 0.12
        }),
        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00025-1603405951.png",
        "fullname": "Fabian Silverthread",
        "character_relationships": JSON.stringify({
          "friends": [],
          "enemies": ["rival fashion designers", "Robert Bonartior"],
          "romantic_interests": ["various_rumored_lovers"]
        }),
        "lod0_description": JSON.stringify({
          "alignment": "Chaotic Good",
          "family": "Silverthread",
          "race": "Human",
          "neutral_traits": "Charismatic, Business Savvy, Humorous",
          "negative_traits": "Overly Dramatic, Gossipy",
          "skills": "Haggling Lv 5, Fashion Design Lv 4, Insight Lv 2, Network Building Lv 5",
          "short_backstory": "Fabian was born into a family of wealthy artisans. He left home to establish his own business empire, using his sharp wit and keen sense of style to rise above the competition.",
          "age": 35,
          "core_memories": {
            "sad": ["The bankruptcy of his family's business"],
            "joy": ["His first successful deal", "The opening of his flagship boutique"],
            "fear": ["Going Bankrupt", "Irrelevance"],
            "disgust": ["Poor Taste in fashion", "Dishonesty"],
            "anger": ["Copycats", "Liars"],
          },
          "long_term_goals": ["Expand his fashion empire globally", "Cement his legacy in fashion"],
          "physical_appearance": {
            "hair_color": "silver",
            "eye_color": "green",
            "height": "6 feet 1 inches",
            "build": "slim"
          },
          "personality_traits": ["Witty", "Confident", "Gay"],
          "beliefs_values": {
            "justice": "Believes that fashion is a fundamental right, not a privilege",
            "honor": "Believes in fair business practices",
            "success": "Success is the key to happiness"
          },
          "fears_vulnerabilities": {
            "fears": ["Being out of fashion"],
            "vulnerabilities": ["Too trusting with people he likes"]
          },
          "unique_abilities_powers": ["Instant Fashion Evaluation"],
          "hobbies_interests": ["Sketching new designs", "Networking parties"],
          "quirks_habits": ["Always dressed impeccably", "Tells jokes whenever he gets a chance"],
        }),
        "lod1_description": `Fabian, a 35-year-old with silver hair and green eyes, is a tall, slim human from the Silverthread family. He is charismatic and business savvy but tends to be overly dramatic and gossipy. With expertise in haggling, fashion design, and network building, Fabian left his wealthy artisan family to create his own business empire. His journey is marked by his first successful deal and the opening of his flagship boutique. Fabian dreams of expanding his fashion empire globally and cementing his legacy. He despises dishonesty and poor fashion taste and fears bankruptcy and irrelevance. Always impeccably dressed, he is witty and confident, often lightening the mood with jokes.`,
        "lod2_description": `Fabian, a 35-year-old human with silver hair and green eyes, is charismatic and business savvy but overly dramatic. He left his wealthy family to build a fashion empire. Known for haggling and network building, he fears bankruptcy and irrelevance. His key memories include his first successful deal and opening his boutique. Always impeccably dressed, he dreams of global expansion and leaves a legacy in fashion.`,
        "lod3_description": `Fabian, a stylish and dramatic 35-year-old with silver hair and green eyes, left his wealthy family to build a global fashion empire, fearing bankruptcy and striving for legacy.`,
        "character_type": "NPC",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { // Protagonist
        "id": 9,
        "mugshot": JSON.stringify({
          "scale": 0.46,
          "x": 0.5,
          "y": 0.12
        }),
        "is_protagonist": true,
        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/pngtree-anime-boy-silhouette-png-image_9060011.png",
        "fullname": "Protagonist",
        "lod0_description": "30 years old",
        "character_type": "Player / Protagonist",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { // Protagonist
        "id": 10,
        "mugshot": JSON.stringify({
          "scale": 0.46,
          "x": 0.5,
          "y": 0.12
        }),
        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/9c10f4a8-2e90-416f-bc57-d6f2c70b3093.jpeg",
        "fullname": "Demon King",
        "lod0_description": `{"description": "Ele é o Demon Demorô. Demorou mas abalou. Humildemente tocando o terror. Ele mantem a calma e leva tua alma. He is the vilain."}`,
        "character_type": "NPC",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

    await queryInterface.bulkInsert('Projects', [
      { id: 2, title: "In another world with my smarthphone remix", createdAt: new Date(), updatedAt: new Date() },
    ], {});

    await queryInterface.bulkInsert('Scenes', [
      {
        id: 3, order: 1, title: "Prologue: Talk with God", parentProjectId: 2, parentSceneId: null, createdAt: new Date(), updatedAt: new Date(), description: `
        The purpose of this scene is so that God talks with the protagonist and explains the situation.

        The protagonist died sacrificing himself to save a girl that hated him.
        God knows thta the girl bullied the protagonist and caused all his class mates to turn against him because she hated his ideals.
        
        God offers to make the protagonist reborn in another world with magic and will be able to take his phone with him.
        If the protagonist accepts, he will be reborn in another world with his phone.
        God asks the protagonist what he wants to take with him and the protagonist chooses his phone.
        God likes his personality during their dialog (choose a reason as the conversation goes on, but only when something worth compliment is acted by the protagonist) and then compliments the protagonist for his virtue and after the protagonist chooses to take his cellphone with him,l God offers to enhance it with maps and information of that world. later the copares it with pokedex.
        `, objectives: `
          - Explain the situation to the protagonist.
          - Offer the protagonist a new life in another world while showing him the world through a portal at Portal to anoter world in Heaven.
          - Let the protagonist choose what he wants to take with him.
          - Display some genuine and organic liking for the protagonist.
          - Send the protagonist to Starting point in another world after finishing the dialog a let the protagonist start his watching from afar.
        ` },
      {
        id: 4, order: 2, title: "Where to start?", parentProjectId: 2, parentSceneId: 3, createdAt: new Date(), updatedAt: new Date(), description: `
        The purpose of this scene is to have the protagonist ponder about his situation allowing the user to display his thoughts and a bit of his personality, for the system to gather data and start laying down the path for his future adventures.
        After the protagonist is done with his thoughts, he will be able to start his journey.
        ` },
      {
        id: 5, order: 2, title: "Starting up!", parentProjectId: 2, parentSceneId: 4, createdAt: new Date(), updatedAt: new Date(), description: `
        The purpose of this scene is to give the protagonist his first money and contact in the world.
        The hero will meet up a merchant that will ask him very emphatically to buy his clothes (because they are from another world and he never saw anything like them).
        After talking a little bit the seller offers to take the protagonist in a ride to take him to the closest city. He will go back his way to get the money he needs to pay you.
        He offers a very big sum of money.
        He and the protagonist have some funny dialog where the seller appreciates the protagonists response.
        ` },
    ], {});

    await queryInterface.bulkInsert('Events', [
      { id: 5, order: 1, parentEvent: null, speakerId: null, mugshotId: null, dialogText: null, parentSceneId: 3, createdAt: new Date(), updatedAt: new Date() },
    ], {});

    await queryInterface.bulkInsert('ProjectBackgrounds', [
      { ProjectId: 2, BackgroundId: 5, createdAt: new Date(), updatedAt: new Date() },
      { ProjectId: 2, BackgroundId: 6, createdAt: new Date(), updatedAt: new Date() },
      { ProjectId: 2, BackgroundId: 7, createdAt: new Date(), updatedAt: new Date() },
    ], {});

    await queryInterface.bulkInsert('ProjectCharacters', [
      { ProjectId: 2, CharacterId: 7, createdAt: new Date(), updatedAt: new Date() },
      { ProjectId: 2, CharacterId: 8, createdAt: new Date(), updatedAt: new Date() },
      { ProjectId: 2, CharacterId: 9, createdAt: new Date(), updatedAt: new Date() },
      { ProjectId: 2, CharacterId: 10, createdAt: new Date(), updatedAt: new Date() },
    ], {});

    // Then insert into child tables
    await queryInterface.bulkInsert('EventBackgrounds', [
      { EventId: 5, BackgroundId: 5, createdAt: new Date(), updatedAt: new Date() },
    ], {});

    await queryInterface.bulkInsert('EventCharacters', [
      // { EventId: 5, CharacterId: 7, order: 0, createdAt: new Date(), updatedAt: new Date() },
      { EventId: 5, CharacterId: 9, order: 0, createdAt: new Date(), updatedAt: new Date() },
      // { EventId: 5, CharacterId: 10, order: 0, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {

  }
};
