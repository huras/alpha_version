import React, { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [scenes, setScenes] = useState([
    {
      event_id: 1,
      events: [
        {
          "background": [
            {
              "id": 1,
              "name": "Some Forest",
              "image": "img/bg/00041-2534950232.png"
            }
          ],
          "characters_on_scene": [
            {
              "id": 1,
              "image": "img/char/00133-1521237494.png"
            },
            {
              "id": 2,
              "image": "img/char/00136-1521237497.png"
            },
          ],
          "audio_events": [
            // "start music",
            // "stop music",
            // "play SFX"
          ],
          "dialog": 
            {
              "speaker": false,
              "text": "Hello World!\nI'm Kazuma, the main character of this story.\nAnd this is a very long text to test the dialog window."
            }
        },
        {
          "background": [
            {
              "id": 1,
              "name": "Some Forest",
              "image": "img/bg/00041-2534950232.png"
            }
          ],
          "characters_on_scene": [
            {
              "id": 1,
              "image": "img/char/00133-1521237494.png"
            },
          ],
          "audio_events": [
          ],
          "dialog": 
            {
              "speaker": "Kazuma",
              "text": "The king is dead! Long live the king!"
            }
          
        },
        {
          // Define the structure of your new event here
          background: [], // Example structure
          characters_on_scene: [],
          dialog: { speaker: false, text: false, show: false },
        }
      ]
    }
  ]);
  const [characters, setCharacters] = useState([
    {
      "id": 1,
      "mugshot": "img/char/00133-1521237494.png",
      "image": "img/00133-1521237494.png",
      "alignment": "Chaotic Good",
      "fullname": "Lyra Flamehair",
      "family": "Flamehair",
      "race": "Human",
      "neutral_traits": ["Charismatic", "Brave", "Impulsive"],
      "negative_traits": ["Reckless", "Short-tempered"],
      "known_characters": ["cassandra_starshield", "elder_mage_veloran"],
      "skills": ["Dual Wielding Lv 4", "Alchemy Lv 2", "Unarmed Combat Lv 3", "Fire Magic Lv 4"],
      "short_backstory": "Lyra was born into a family of famed pyromancers. She left home to explore the world and find her own path, using her fiery talents to protect the innocent.",
      "age": 23,
      "core_memories": {
        "sad": ["destruction of her childhood home", "loss of her familiar"],
        "joy": ["discovering a new spell", "her first adventure"],
        "fear": ["water", "confinement"],
        "disgust": ["necromancy", "betrayal"],
        "anger": ["injustice", "slavery"]
      },
      "long_term_goals": ["Master the elemental magics", "Find the Phoenix Stone", "Open a school for adventurers"],
      "physical_appearance": {
        "hair_color": "fiery red",
        "eye_color": "hazel",
        "height": "5 feet 6 inches",
        "build": "fit"
      },
      "personality_traits": ["adventurous", "independent"],
      "beliefs_values": {
        "justice": "believes in taking action to right wrongs",
        "honor": "personal freedom and choice are paramount",
        "family": "family is chosen through bonds of friendship and loyalty"
      },
      "relationships": {
        "friends": ["sir_baldric_the_bold"],
        "enemies": ["the_cold_empress"],
        "romantic_interests": ["gavriel_the_wanderer"]
      },
      "fears_vulnerabilities": {
        "fears": ["the loss of her magical abilities"],
        "vulnerabilities": ["prone to overextending in battle"]
      },
      "unique_abilities_powers": ["Phoenix Rebirth (can recover quickly from near-defeat)"],
      "hobbies_interests": ["experimenting with potion recipes", "exploring ancient ruins"],
      "quirks_habits": ["always carries a vial of fire salt", "draws tiny flames on parchment when bored"]
    },
    {
      "id": 2,
      "mugshot": "00136-1521237497.png",
      "image": "img/char/00136-1521237497.png",
      // "id": "azure_sentinel_01",
      "alignment": "Lawful Good",
      "fullname": "Cassandra Starshield",
      "family": "Starshield",
      "race": "Elf",
      "neutral_traits": ["Tactical", "Observant", "Disciplined"],
      "negative_traits": ["Stubborn", "Inflexible"],
      "known_characters": ["elder_mage_veloran", "rogue_thief_kir"],
      "skills": ["Swordsmanship Lv 4", "Light Magic Lv 3", "Tactics Lv 5", "Archery Lv 2"],
      "short_backstory": "Cassandra grew up in the militaristic city of Elyndor, where discipline and skill in combat are valued above all. She rose quickly through the ranks due to her dedication and strategic mind.",
      "age": 125,
      "core_memories": {
        "sad": ["fall of Elyndor's eastern bastion", "death of mentor"],
        "joy": ["first successful command", "mastering the sword dance"],
        "fear": ["losing her troops", "dishonor"],
        "disgust": ["cowardice", "treachery"],
        "anger": ["corruption in the high council", "unfair accusations against her family"]
      },
      "long_term_goals": ["Restore her family's honor", "Become head of the city guard", "Reform the high council"],
      "physical_appearance": {
        "hair_color": "blue-black",
        "eye_color": "emerald green",
        "height": "5 feet 9 inches",
        "build": "slender yet muscular"
      },
      "personality_traits": ["leader", "loyal"],
      "beliefs_values": {
        "justice": "believes in the rule of law and order",
        "honor": "upholds the knightly virtues of chivalry and respect",
        "family": "dedicated to her family's legacy"
      },
      "relationships": {
        "friends": ["thorin_the_blacksmith"],
        "enemies": ["zara_the_sorceress"],
        "romantic_interests": ["damien_the_scout"]
      },
      "fears_vulnerabilities": {
        "fears": ["the dark magic rising in the south"],
        "vulnerabilities": ["her family's disgraced name"]
      },
      "unique_abilities_powers": ["Aura of Valor (inspires allies)"],
      "hobbies_interests": ["studying ancient tactics", "falconry"],
      "quirks_habits": ["meticulously sharpens her sword every night", "always checks the wind direction"]
    },
    {
      'id': 3,
      'mugshot': '00137-1521237498.png',
      'image': 'img/char/00137-1521237498.png',
      'protagonist': true,
    }
  ]);
  const [backgrounds, setBackgrounds] = useState([
    {
      "id": 1,
      "name": "Some Forest",
      "image": "img/bg/00041-2534950232.png"
    },
  ]);

  // Scene editor context
  const [currentScene, setCurrentScene] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(0);
  const hasValidCurrentEvent = () => {
    currentScene !== undefined && currentEvent !== undefined && (scenes && scenes[currentScene] && scenes[currentScene].events && scenes[currentScene].events[currentEvent])
  };

  return (
    <AppContext.Provider
      value={{
        currentEvent,
        currentScene,
        scenes,
        setScenes,
        characters,
        setCharacters,
        backgrounds,
        setBackgrounds,
        setCurrentEvent,
        setCurrentScene,
        hasValidCurrentEvent
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;