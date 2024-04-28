module.exports = {
  up: async (queryInterface, Sequelize) => {

    
    // Insert into parent tables first
    await queryInterface.bulkInsert('Backgrounds', [
      {
        "id": 1,
        "name": "Some Forest",
        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_backgrounds/bg_00009.jpg",
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        "id": 2,
        "name": "Some Forest 2",
        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_backgrounds/00041-2534950232.png",
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        "id": 3,
        "name": "Some garden",
        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_backgrounds/00242-1899305028-1.png",
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
    }
    ], {});

    await queryInterface.bulkInsert('Scenes', [
      { id: 1, order: 1, title: "Início", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, order: 2, title: "Guerra na floresta", createdAt: new Date(), updatedAt: new Date() }
    ], {});

    await queryInterface.bulkInsert('Events', [
      { id: 1, parentEvent: null, speakerId: 1, mugshotId: 1, dialogText: 'You look lost asdasdasd!', parentSceneId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, parentEvent: 1, speakerId: null, mugshotId: 2, dialogText: 'Yes. Who are you?', parentSceneId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, parentEvent: null, speakerId: 1, mugshotId: 1, dialogText: "I'm Elara, a pleasure meet you", parentSceneId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, parentEvent: null, speakerId: 1, mugshotId: 1, dialogText: 'Why do you lie to me?\nI can read your mind!', parentSceneId: 1, createdAt: new Date(), updatedAt: new Date() },
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

    // Then insert into child tables
    await queryInterface.bulkInsert('EventBackgrounds', [
      { EventId: 1, BackgroundId: 1, createdAt: new Date(), updatedAt: new Date() },
      { EventId: 2, BackgroundId: 1, createdAt: new Date(), updatedAt: new Date() },
      { EventId: 3, BackgroundId: 1, createdAt: new Date(), updatedAt: new Date() },
      { EventId: 4, BackgroundId: 1, createdAt: new Date(), updatedAt: new Date() },
    ], {});

    await queryInterface.bulkInsert('EventCharacters', [
      { CharacterId: 1, EventId: 1, createdAt: new Date(), updatedAt: new Date() },
      { CharacterId: 2, EventId: 1, createdAt: new Date(), updatedAt: new Date() },
      { CharacterId: 1, EventId: 2, createdAt: new Date(), updatedAt: new Date() },
      { CharacterId: 1, EventId: 3, createdAt: new Date(), updatedAt: new Date() },
      { CharacterId: 1, EventId: 4, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {

  }
};
