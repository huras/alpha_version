module.exports = {
  up: async (queryInterface, Sequelize) => {


    // Insert into parent tables first
    await queryInterface.bulkInsert('Backgrounds', [
      {
        "id": 1,
        "name": "Some Forest",
        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_backgrounds/bg_00009.jpg",
        "description": "A dense forest with tall trees and dappled sunlight.",
        "parentBackground": null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 2,
        "name": "Some Forest 2",
        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_backgrounds/00041-2534950232.png",
        "description": "A dense forest with tall trees and dappled sunlight and a river.",
        "parentBackground": 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 3,
        "name": "Some garden",
        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_backgrounds/00242-1899305028-1.png",
        "description": "A beautiful garden with flowers and a fountain.",
        "parentBackground": 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 4,
        "name": "Icy Village",
        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_backgrounds/00262-3509399340.png",
        "description": "A village covered in snow and ice.",
        "parentBackground": null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

    await queryInterface.bulkInsert('Characters', [
      {
        id: 1,
        mugshot: JSON.stringify({
          scale: 0.56,
          x: 0.54,
          y: 0.14
        }),
        image: "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00339-2189841899.png",
        alignment: "Chaotic Good",
        fullname: "Lyra Flamehair",
        family: "Flamehair",
        race: "Human",
        neutral_traits: JSON.stringify(["Charismatic", "Brave", "Impulsive"]),
        negative_traits: JSON.stringify(["Reckless", "Short-tempered"]),
        known_characters: JSON.stringify(["cassandra_starshield", "elder_mage_veloran"]),
        skills: JSON.stringify(["Dual Wielding Lv 4", "Alchemy Lv 2", "Unarmed Combat Lv 3", "Fire Magic Lv 4"]),
        short_backstory: "Lyra was born into a family of famed pyromancers. She left home to explore the world and find her own path, using her fiery talents to protect the innocent.",
        age: 23,
        core_memories: JSON.stringify({
          sad: JSON.stringify(["destruction of her childhood home", "loss of her familiar"]),
          joy: JSON.stringify(["discovering a new spell", "her first adventure"]),
          fear: JSON.stringify(["water", "confinement"]),
          disgust: JSON.stringify(["necromancy", "betrayal"]),
          anger: JSON.stringify(["injustice", "slavery"])
        }),
        long_term_goals: JSON.stringify(["Master the elemental magics", "Find the Phoenix Stone", "Open a school for adventurers"]),
        physical_appearance: JSON.stringify({
          hair_color: "fiery red",
          eye_color: "hazel",
          height: "5 feet 6 inches",
          build: "fit"
        }),
        personality_traits: JSON.stringify(["adventurous", "independent"]),
        beliefs_values: JSON.stringify({
          justice: "believes in taking action to right wrongs",
          honor: "personal freedom and choice are paramount",
          family: "family is chosen through bonds of friendship and loyalty"
        }),
        relationships: JSON.stringify({
          friends: JSON.stringify(["sir_baldric_the_bold"]),
          enemies: JSON.stringify(["the_cold_empress"]),
          romantic_interests: JSON.stringify(["gavriel_the_wanderer"])
        }),
        fears_vulnerabilities: JSON.stringify({
          fears: JSON.stringify(["the loss of her magical abilities"]),
          vulnerabilities: JSON.stringify(["prone to overextending in battle"])
        }),
        unique_abilities_powers: JSON.stringify(["Phoenix Rebirth (can recover quickly from near-defeat)"]),
        hobbies_interests: JSON.stringify(["experimenting with potion recipes", "exploring ancient ruins"]),
        quirks_habits: JSON.stringify(["always carries a vial of fire salt", "draws tiny flames on parchment when bored"]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        mugshot: JSON.stringify({
          scale: 0.55,
          x: 0.55,
          y: 0.14
        }),
        image: "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00358-421244272.png",
        alignment: "Lawful Good",
        fullname: "Cassandra Starshield",
        family: "Starshield",
        race: "Human",
        neutral_traits: JSON.stringify(["Tactical", "Observant", "Disciplined"]),
        negative_traits: JSON.stringify(["Stubborn", "Inflexible"]),
        known_characters: JSON.stringify(["elder_mage_veloran", "rogue_thief_kir"]),
        skills: JSON.stringify(["Swordsmanship Lv 4", "Light Magic Lv 3", "Tactics Lv 5", "Archery Lv 2"]),
        short_backstory: "Cassandra grew up in the militaristic city of Elyndor, where discipline and skill in combat are valued above all. She rose quickly through the ranks due to her dedication and strategic mind.",
        age: 125,
        core_memories: JSON.stringify({
          sad: JSON.stringify(["fall of Elyndor's eastern bastion", "death of mentor"]),
          joy: JSON.stringify(["first successful command", "mastering the sword dance"]),
          fear: JSON.stringify(["losing her troops", "dishonor"]),
          disgust: JSON.stringify(["cowardice", "treachery"]),
          anger: JSON.stringify(["corruption in the high council", "unfair accusations against her family"])
        }),
        long_term_goals: JSON.stringify(["Restore her family's honor", "Become head of the city guard", "Reform the high council"]),
        physical_appearance: JSON.stringify({
          hair_color: "blue-black",
          eye_color: "emerald green",
          height: "5 feet 9 inches",
          build: "slender yet muscular"
        }),
        personality_traits: JSON.stringify(["leader", "loyal"]),
        beliefs_values: JSON.stringify({
          justice: "believes in the rule of law and order",
          honor: "upholds the knightly virtues of chivalry and respect",
          family: "dedicated to her family's legacy"
        }),
        relationships: JSON.stringify({
          friends: JSON.stringify(["thorin_the_blacksmith"]),
          enemies: JSON.stringify(["zara_the_sorceress"]),
          romantic_interests: JSON.stringify(["damien_the_scout"])
        }),
        fears_vulnerabilities: JSON.stringify({
          fears: JSON.stringify(["the dark magic rising in the south"]),
          vulnerabilities: JSON.stringify(["her family's disgraced name"])
        }),
        unique_abilities_powers: JSON.stringify(["Aura of Valor (inspires allies)"]),
        hobbies_interests: JSON.stringify(["studying ancient tactics", "falconry"]),
        quirks_habits: JSON.stringify(["meticulously sharpens her sword every night", "always checks the wind direction"]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        mugshot: JSON.stringify({
          scale: 0.6,
          x: 0.45,
          y: 0.2
        }),
        image: "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00133-1521237494.png",
        alignment: "Chaotic Neutral",
        fullname: "Merek Stormbringer",
        family: "Stormbringer",
        race: "Elf",
        neutral_traits: JSON.stringify(["Clever", "Quick", "Resourceful"]),
        negative_traits: JSON.stringify(["Impulsive", "Reckless"]),
        known_characters: JSON.stringify(["sage_elara", "knight_sir_gareth"]),
        skills: JSON.stringify(["Alchemy Lv 3", "Stealth Lv 5", "Lockpicking Lv 4", "Dagger Fighting Lv 2"]),
        short_backstory: "Raised in the shadowy Elven forest of Mirath, Merek learned the ways of the thief out of necessity. His quick fingers and even quicker wit have gotten him out of many tight spots.",
        age: 90,
        core_memories: JSON.stringify({
          sad: JSON.stringify(["loss of his mentor to dark forces", "the great fire of Mirath"]),
          joy: JSON.stringify(["his first successful heist", "joining the Guild of Shadows"]),
          fear: JSON.stringify(["capture by the city guards", "betrayal"]),
          disgust: JSON.stringify(["greed", "corruption"]),
          anger: JSON.stringify(["injustice towards the poor", "corrupt officials"])
        }),
        long_term_goals: JSON.stringify(["Steal the Crown of Eldoria", "Become the master of the Guild of Shadows", "Avenge his mentor's death"]),
        physical_appearance: JSON.stringify({
          hair_color: "silver",
          eye_color: "piercing blue",
          height: "5 feet 7 inches",
          build: "lean"
        }),
        personality_traits: JSON.stringify(["mischievous", "independent"]),
        beliefs_values: JSON.stringify({
          freedom: "cherishes personal freedom above all else",
          wealth: "seeks to amass a fortune",
          justice: "has a complicated relationship with justice"
        }),
        relationships: JSON.stringify({
          friends: JSON.stringify(["lia_the_merchant"]),
          enemies: JSON.stringify(["captain_von_grek"]),
          romantic_interests: JSON.stringify(["isla_the_adventuress"])
        }),
        fears_vulnerabilities: JSON.stringify({
          fears: JSON.stringify(["losing his freedom", "ghosts"]),
          vulnerabilities: JSON.stringify(["his secret identity"])
        }),
        unique_abilities_powers: JSON.stringify(["Shadowmeld (can blend into shadows)"]),
        hobbies_interests: JSON.stringify(["collecting rare artifacts", "playing the flute"]),
        quirks_habits: JSON.stringify(["whistles when nervous", "always wears a hood"]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        mugshot: JSON.stringify({
          scale: 0.5,
          x: 0.5,
          y: 0.18
        }),
        image: "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00136-1521237497.png",
        alignment: "Neutral Good",
        fullname: "Aria Moonshadow",
        family: "Moonshadow",
        race: "Human",
        neutral_traits: JSON.stringify(["Calm", "Intuitive", "Patient"]),
        negative_traits: JSON.stringify(["Overprotective", "Secretive"]),
        known_characters: JSON.stringify(["wizard_merlock", "princess_lyanna"]),
        skills: JSON.stringify(["Healing Magic Lv 5", "Herbology Lv 4", "Diplomacy Lv 3", "Bowmanship Lv 1"]),
        short_backstory: "Aria was born into a family of healers and learned her craft in the tranquil village of Serene Valley. Her gifts for healing have drawn both reverence and jealousy.",
        age: 70,
        core_memories: JSON.stringify({
          sad: JSON.stringify(["plague that swept her village", "loss of her brother"]),
          joy: JSON.stringify(["saving a child's life", "the annual Festival of Lights"]),
          fear: JSON.stringify(["return of the plague", "harm to her loved ones"]),
          disgust: JSON.stringify(["violence", "deceit"]),
          anger: JSON.stringify(["those who exploit the weak", "destruction of nature"])
        }),
        long_term_goals: JSON.stringify(["Find the ancient Herb of Life", "Establish a sanctuary for the sick", "Teach her healing arts to the next generation"]),
        physical_appearance: JSON.stringify({
          hair_color: "golden",
          eye_color: "deep brown",
          height: "5 feet 4 inches",
          build: "willowy"
        }),
        personality_traits: JSON.stringify(["gentle", "compassionate"]),
        beliefs_values: JSON.stringify({
          peace: "believes in healing and reconciliation",
          life: "values all forms of life",
          knowledge: "strives to learn more about her craft"
        }),
        relationships: JSON.stringify({
          friends: JSON.stringify(["the herbalist_gideon"]),
          enemies: JSON.stringify(["warlord_zharkov"]),
          romantic_interests: JSON.stringify(["loran_the_peacekeeper"])
        }),
        fears_vulnerabilities: JSON.stringify({
          fears: JSON.stringify(["dark magic", "losing her healing touch"]),
          vulnerabilities: JSON.stringify(["her family's reputation"])
        }),
        unique_abilities_powers: JSON.stringify(["Lifebind (can link her life force to heal others)"]),
        hobbies_interests: JSON.stringify(["gardening", "writing poetry"]),
        quirks_habits: JSON.stringify(["speaks to plants", "always carries a peace amulet"]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "id": 5,
        "mugshot": JSON.stringify({
          "scale": 0.6,
          "x": 0.5,
          "y": 0.2
        }),
        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00338-1426668810.png",
        "alignment": "Neutral Good",
        "fullname": "Katara of the Southern Water Tribe",
        "family": "Water Tribe",
        "race": "Human",
        "neutral_traits": JSON.stringify(["Empathetic", "Resourceful", "Nurturing"]),
        "negative_traits": JSON.stringify(["Naive", "Overprotective"]),
        "known_characters": JSON.stringify(["her brother Sokka"]),
        "skills": JSON.stringify(["Waterbending Lv 4", "Healing Lv 3"]),
        "short_backstory": "Katara grew up in the Southern Water Tribe under the shadow of war, longing for adventure and a chance to make a difference.",
        "age": 14,
        "core_memories": JSON.stringify({
          "sad": JSON.stringify(["loss of her mother"]),
          "joy": JSON.stringify(["first successful waterbending"]),
          "fear": JSON.stringify(["Fire Nation attacks"]),
          "disgust": JSON.stringify(["oppression by the Fire Nation"]),
          "anger": JSON.stringify(["injustice towards her people"])
        }),
        "long_term_goals": JSON.stringify(["Master waterbending", "Help end the Fire Nation's tyranny"]),
        "physical_appearance": JSON.stringify({
          "hair_color": "dark brown",
          "eye_color": "blue",
          "height": "5 feet 4 inches",
          "build": "athletic"
        }),
        "personality_traits": JSON.stringify(["caring", "determined"]),
        "beliefs_values": JSON.stringify({
          "justice": "believes in fighting for the oppressed",
          "honor": "values the traditions of her tribe",
          "family": "deeply connected to her brother and late mother"
        }),
        "relationships": JSON.stringify({
          "friends": JSON.stringify(["Aang (eventually)", "Toph (eventually)"]),
          "enemies": JSON.stringify(["Zuko (initially)", "Fire Nation soldiers"]),
          "romantic_interests": JSON.stringify(["Aang (eventually)"])
        }),
        "fears_vulnerabilities": JSON.stringify({
          "fears": JSON.stringify(["losing her loved ones", "failure to protect her tribe"]),
          "vulnerabilities": JSON.stringify(["her compassionate nature can be exploited"])
        }),
        "unique_abilities_powers": JSON.stringify(["Waterbending mastery"]),
        "hobbies_interests": JSON.stringify(["practicing waterbending", "storytelling"]),
        "quirks_habits": JSON.stringify(["always carries her mother's necklace", "practices waterbending at dawn"]),
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "id": 6,
        "mugshot": JSON.stringify({
          "scale": 0.6,
          "x": 0.5,
          "y": 0.15
        }),
        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00196-880327345.png",
        "alignment": "Lawful Evil",
        "fullname": "Princess Azula",
        "family": "Fire Nation Royal Family",
        "race": "Human",
        "neutral_traits": JSON.stringify(["Intelligent", "Strategic", "Charismatic"]),
        "negative_traits": JSON.stringify(["Manipulative", "Paranoid", "Cruel"]),
        "known_characters": JSON.stringify(["Zuko", "Mai", "Ty Lee"]),
        "skills": JSON.stringify(["Firebending Lv 5", "Lightning Generation Lv 4", "Tactics Lv 5"]),
        "short_backstory": "Raised in the royal family of the Fire Nation, Azula was groomed for greatness, often overshadowing her older brother Zuko with her prodigious skills.",
        "age": 14,
        "core_memories": JSON.stringify({
          "sad": JSON.stringify(["her mother's apparent favoritism towards Zuko"]),
          "joy": JSON.stringify(["being praised by her father"]),
          "fear": JSON.stringify(["losing her father's approval"]),
          "disgust": JSON.stringify(["weakness"]),
          "anger": JSON.stringify(["betrayal by friends"])
        }),
        "long_term_goals": JSON.stringify(["Become the Fire Lord", "Conquer the Earth Kingdom"]),
        "physical_appearance": JSON.stringify({
          "hair_color": "black",
          "eye_color": "golden",
          "height": "5 feet 5 inches",
          "build": "slim"
        }),
        "personality_traits": JSON.stringify(["ambitious", "ruthless"]),
        "beliefs_values": JSON.stringify({
          "justice": "believes in the absolute power of the Fire Nation",
          "honor": "values loyalty to the Fire Nation above all",
          "family": "sees her family as a political tool"
        }),
        "relationships": JSON.stringify({
          "friends": JSON.stringify(["Mai and Ty Lee (frenemies)"]),
          "enemies": JSON.stringify(["Team Avatar", "Zuko (on and off)"]),
          "romantic_interests": JSON.stringify([])
        }),
        "fears_vulnerabilities": JSON.stringify({
          "fears": JSON.stringify(["losing control", "being seen as weak"]),
          "vulnerabilities": JSON.stringify(["her need for absolute control can alienate allies"])
        }),
        "unique_abilities_powers": JSON.stringify(["Master of blue fire", "Precise lightning control"]),
        "hobbies_interests": JSON.stringify(["mastering new combat techniques", "political strategizing"]),
        "quirks_habits": JSON.stringify(["often manipulates conversations", "practices her firebending with perfection"]),
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ], {});

    await queryInterface.bulkInsert('Projects', [
      { id: 1, title: "My first IA-VN", createdAt: new Date(), updatedAt: new Date() },
    ], {});

    await queryInterface.bulkInsert('Scenes', [
      { id: 1, order: 1, title: "Prólogo", parentProjectId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, order: 2, title: "Guerra na floresta", parentProjectId: 1, createdAt: new Date(), updatedAt: new Date() }
    ], {});

    await queryInterface.bulkInsert('Events', [
      {
        id: 1, order: 1, parentEvent: null, speakerId: 5, mugshotId: 5, dialogText: JSON.stringify([
          { word: 'You', effect: null },
          { word: 'look', effect: null },
          { word: 'lost', effect: 'shaky' },
          { word: '!', effect: null },
        ]), parentSceneId: 1, createdAt: new Date(), updatedAt: new Date()
      },

      {
        id: 2, order: 2, parentEvent: 1, speakerId: null, mugshotId: 2, dialogText: JSON.stringify([
          { word: 'Yes', effect: null },
          { word: '.', effect: null },
          { word: '\n', effect: null },
          { word: 'But', effect: null },
          { word: 'how', effect: null },
          { word: 'do', effect: null },
          { word: 'you', effect: null },
          { word: 'know', effect: null },
          { word: '?', effect: null },
        ]), parentSceneId: 1, createdAt: new Date(), updatedAt: new Date()
      },

      {
        id: 3, order: 3, parentEvent: 2, speakerId: 1, mugshotId: 1, dialogText: JSON.stringify([
          { word: "I'm", effect: null },
          { word: 'a', effect: null },
          { word: 'mage', effect: null },
          { word: 'bitch', effect: 'impact' },
          { word: '.', effect: null },
        ]), parentSceneId: 1, createdAt: new Date(), updatedAt: new Date()
      },

      { id: 4, order: 4, parentEvent: 3, speakerId: 1, mugshotId: 1, dialogText: null, parentSceneId: 1, createdAt: new Date(), updatedAt: new Date() },
    ], {});

    await queryInterface.bulkInsert('EventChoices', [
      {
        // Assuming you have columns like EventId and NextEventId to link the choice with events
        EventId: 2, // The event where the choice is made
        RelatedEventId: 3, // The event that follows if this choice is selected
        choice: 'Tell the truth',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        EventId: 2, // The event where the choice is made
        RelatedEventId: 4, // The event that follows if this choice is selected
        choice: 'Lie',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('ProjectBackgrounds', [
      { ProjectId: 1, BackgroundId: 1, createdAt: new Date(), updatedAt: new Date() },
      { ProjectId: 1, BackgroundId: 2, createdAt: new Date(), updatedAt: new Date() },
      { ProjectId: 1, BackgroundId: 3, createdAt: new Date(), updatedAt: new Date() },
      { ProjectId: 1, BackgroundId: 4, createdAt: new Date(), updatedAt: new Date() },
    ], {});

    await queryInterface.bulkInsert('ProjectCharacters', [
      { ProjectId: 1, CharacterId: 1, createdAt: new Date(), updatedAt: new Date() },
      { ProjectId: 1, CharacterId: 2, createdAt: new Date(), updatedAt: new Date() },
      { ProjectId: 1, CharacterId: 3, createdAt: new Date(), updatedAt: new Date() },
      { ProjectId: 1, CharacterId: 4, createdAt: new Date(), updatedAt: new Date() },
      { ProjectId: 1, CharacterId: 5, createdAt: new Date(), updatedAt: new Date() },
      { ProjectId: 1, CharacterId: 6, createdAt: new Date(), updatedAt: new Date() },
    ], {});

    // Then insert into child tables
    await queryInterface.bulkInsert('EventBackgrounds', [
      { EventId: 1, BackgroundId: 4, createdAt: new Date(), updatedAt: new Date() },
      { EventId: 2, BackgroundId: 4, createdAt: new Date(), updatedAt: new Date() },
      { EventId: 3, BackgroundId: 4, createdAt: new Date(), updatedAt: new Date() },
      { EventId: 4, BackgroundId: 4, createdAt: new Date(), updatedAt: new Date() },
    ], {});

    await queryInterface.bulkInsert('EventCharacters', [
      { CharacterId: 5, EventId: 1, order: 0, createdAt: new Date(), updatedAt: new Date() },
      { CharacterId: 6, EventId: 1, order: 1, createdAt: new Date(), updatedAt: new Date() },
      { CharacterId: 5, EventId: 2, order: 1, createdAt: new Date(), updatedAt: new Date() },
      { CharacterId: 6, EventId: 2, order: 0, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {

  }
};
