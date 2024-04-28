import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppContext from '../../context/AppContext'; // Adjust the path as needed
import { ChevronLeft, ChevronRight, JustifyLeft, PencilFill, PlayFill } from 'react-bootstrap-icons';
import axios from 'axios';
import EventListDrawer from '../Event/Editor/EventListDrawer';
import EventList from '../Event/EventList';
import { Button } from 'react-bootstrap';

export default function ScenePage() {
    const navigate = useNavigate();
    const [scene, setScene] = useState(null);

    const [currentEventID, setCurrentEventID] = useState(null);
    const [branchSelection, setBranchSelection] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showEventsDrawer, setShowEventsDrawer] = useState(false);

    /*
        Scene response example:
        ```
        {
            "id": 1,
            "title": "Início",
            "order": 1,
            "createdAt": "2024-04-28T02:17:57.087Z",
            "updatedAt": "2024-04-28T02:17:57.087Z",
            "childEvents": [
                {
                    "id": 1,
                    "parentEvent": null,
                    "speakerId": 1,
                    "mugshotId": 1,
                    "dialogText": "You look lost asdasdasd!",
                    "createdAt": "2024-04-28T02:17:57.094Z",
                    "updatedAt": "2024-04-28T02:17:57.094Z",
                    "parentSceneId": 1,
                    "event_backgrounds": [
                        {
                            "id": 1,
                            "name": "Some Forest",
                            "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_backgrounds/bg_00009.jpg",
                            "createdAt": "2024-04-28T02:17:57.069Z",
                            "updatedAt": "2024-04-28T02:17:57.069Z",
                            "EventBackgrounds": {
                                "createdAt": "2024-04-28T02:17:57.113Z",
                                "updatedAt": "2024-04-28T02:17:57.113Z",
                                "EventId": 1,
                                "BackgroundId": 1
                            }
                        }
                    ],
                    "event_characters": [
                        {
                            "id": 1,
                            "mugshot": "{\"scale\":0.56,\"x\":0.54,\"y\":0.14}",
                            "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00339-2189841899.png",
                            "alignment": "Chaotic Good",
                            "fullname": "Lyra Flamehair",
                            "family": "Flamehair",
                            "race": "Human",
                            "neutral_traits": "[\"Charismatic\",\"Brave\",\"Impulsive\"]",
                            "negative_traits": "[\"Reckless\",\"Short-tempered\"]",
                            "known_characters": "[\"cassandra_starshield\",\"elder_mage_veloran\"]",
                            "skills": "[\"Dual Wielding Lv 4\",\"Alchemy Lv 2\",\"Unarmed Combat Lv 3\",\"Fire Magic Lv 4\"]",
                            "short_backstory": "Lyra was born into a family of famed pyromancers. She left home to explore the world and find her own path, using her fiery talents to protect the innocent.",
                            "age": 23,
                            "core_memories": "{\"sad\":\"[\\\"destruction of her childhood home\\\",\\\"loss of her familiar\\\"]\",\"joy\":\"[\\\"discovering a new spell\\\",\\\"her first adventure\\\"]\",\"fear\":\"[\\\"water\\\",\\\"confinement\\\"]\",\"disgust\":\"[\\\"necromancy\\\",\\\"betrayal\\\"]\",\"anger\":\"[\\\"injustice\\\",\\\"slavery\\\"]\"}",
                            "long_term_goals": "[\"Master the elemental magics\",\"Find the Phoenix Stone\",\"Open a school for adventurers\"]",
                            "physical_appearance": "{\"hair_color\":\"fiery red\",\"eye_color\":\"hazel\",\"height\":\"5 feet 6 inches\",\"build\":\"fit\"}",
                            "personality_traits": "[\"adventurous\",\"independent\"]",
                            "beliefs_values": "{\"justice\":\"believes in taking action to right wrongs\",\"honor\":\"personal freedom and choice are paramount\",\"family\":\"family is chosen through bonds of friendship and loyalty\"}",
                            "relationships": "{\"friends\":\"[\\\"sir_baldric_the_bold\\\"]\",\"enemies\":\"[\\\"the_cold_empress\\\"]\",\"romantic_interests\":\"[\\\"gavriel_the_wanderer\\\"]\"}",
                            "fears_vulnerabilities": "{\"fears\":\"[\\\"the loss of her magical abilities\\\"]\",\"vulnerabilities\":\"[\\\"prone to overextending in battle\\\"]\"}",
                            "unique_abilities_powers": "[\"Phoenix Rebirth (can recover quickly from near-defeat)\"]",
                            "hobbies_interests": "[\"experimenting with potion recipes\",\"exploring ancient ruins\"]",
                            "quirks_habits": "[\"always carries a vial of fire salt\",\"draws tiny flames on parchment when bored\"]",
                            "createdAt": "2024-04-28T02:17:57.078Z",
                            "updatedAt": "2024-04-28T02:17:57.078Z",
                            "EventCharacters": {
                                "createdAt": "2024-04-28T02:17:57.120Z",
                                "updatedAt": "2024-04-28T02:17:57.120Z",
                                "EventId": 1,
                                "CharacterId": 1
                            }
                        },
                        {
                            "id": 2,
                            "mugshot": "{\"scale\":0.55,\"x\":0.55,\"y\":0.14}",
                            "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00358-421244272.png",
                            "alignment": "Lawful Good",
                            "fullname": "Cassandra Starshield",
                            "family": "Starshield",
                            "race": "Human",
                            "neutral_traits": "[\"Tactical\",\"Observant\",\"Disciplined\"]",
                            "negative_traits": "[\"Stubborn\",\"Inflexible\"]",
                            "known_characters": "[\"elder_mage_veloran\",\"rogue_thief_kir\"]",
                            "skills": "[\"Swordsmanship Lv 4\",\"Light Magic Lv 3\",\"Tactics Lv 5\",\"Archery Lv 2\"]",
                            "short_backstory": "Cassandra grew up in the militaristic city of Elyndor, where discipline and skill in combat are valued above all. She rose quickly through the ranks due to her dedication and strategic mind.",
                            "age": 125,
                            "core_memories": "{\"sad\":\"[\\\"fall of Elyndor's eastern bastion\\\",\\\"death of mentor\\\"]\",\"joy\":\"[\\\"first successful command\\\",\\\"mastering the sword dance\\\"]\",\"fear\":\"[\\\"losing her troops\\\",\\\"dishonor\\\"]\",\"disgust\":\"[\\\"cowardice\\\",\\\"treachery\\\"]\",\"anger\":\"[\\\"corruption in the high council\\\",\\\"unfair accusations against her family\\\"]\"}",
                            "long_term_goals": "[\"Restore her family's honor\",\"Become head of the city guard\",\"Reform the high council\"]",
                            "physical_appearance": "{\"hair_color\":\"blue-black\",\"eye_color\":\"emerald green\",\"height\":\"5 feet 9 inches\",\"build\":\"slender yet muscular\"}",
                            "personality_traits": "[\"leader\",\"loyal\"]",
                            "beliefs_values": "{\"justice\":\"believes in the rule of law and order\",\"honor\":\"upholds the knightly virtues of chivalry and respect\",\"family\":\"dedicated to her family's legacy\"}",
                            "relationships": "{\"friends\":\"[\\\"thorin_the_blacksmith\\\"]\",\"enemies\":\"[\\\"zara_the_sorceress\\\"]\",\"romantic_interests\":\"[\\\"damien_the_scout\\\"]\"}",
                            "fears_vulnerabilities": "{\"fears\":\"[\\\"the dark magic rising in the south\\\"]\",\"vulnerabilities\":\"[\\\"her family's disgraced name\\\"]\"}",
                            "unique_abilities_powers": "[\"Aura of Valor (inspires allies)\"]",
                            "hobbies_interests": "[\"studying ancient tactics\",\"falconry\"]",
                            "quirks_habits": "[\"meticulously sharpens her sword every night\",\"always checks the wind direction\"]",
                            "createdAt": "2024-04-28T02:17:57.078Z",
                            "updatedAt": "2024-04-28T02:17:57.078Z",
                            "EventCharacters": {
                                "createdAt": "2024-04-28T02:17:57.120Z",
                                "updatedAt": "2024-04-28T02:17:57.120Z",
                                "EventId": 1,
                                "CharacterId": 2
                            }
                        }
                    ],
                    "childEvents": [],
                    "parentEvents": [],
                    "speaker": {
                        "id": 1,
                        "mugshot": "{\"scale\":0.56,\"x\":0.54,\"y\":0.14}",
                        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00339-2189841899.png",
                        "alignment": "Chaotic Good",
                        "fullname": "Lyra Flamehair",
                        "family": "Flamehair",
                        "race": "Human",
                        "neutral_traits": "[\"Charismatic\",\"Brave\",\"Impulsive\"]",
                        "negative_traits": "[\"Reckless\",\"Short-tempered\"]",
                        "known_characters": "[\"cassandra_starshield\",\"elder_mage_veloran\"]",
                        "skills": "[\"Dual Wielding Lv 4\",\"Alchemy Lv 2\",\"Unarmed Combat Lv 3\",\"Fire Magic Lv 4\"]",
                        "short_backstory": "Lyra was born into a family of famed pyromancers. She left home to explore the world and find her own path, using her fiery talents to protect the innocent.",
                        "age": 23,
                        "core_memories": "{\"sad\":\"[\\\"destruction of her childhood home\\\",\\\"loss of her familiar\\\"]\",\"joy\":\"[\\\"discovering a new spell\\\",\\\"her first adventure\\\"]\",\"fear\":\"[\\\"water\\\",\\\"confinement\\\"]\",\"disgust\":\"[\\\"necromancy\\\",\\\"betrayal\\\"]\",\"anger\":\"[\\\"injustice\\\",\\\"slavery\\\"]\"}",
                        "long_term_goals": "[\"Master the elemental magics\",\"Find the Phoenix Stone\",\"Open a school for adventurers\"]",
                        "physical_appearance": "{\"hair_color\":\"fiery red\",\"eye_color\":\"hazel\",\"height\":\"5 feet 6 inches\",\"build\":\"fit\"}",
                        "personality_traits": "[\"adventurous\",\"independent\"]",
                        "beliefs_values": "{\"justice\":\"believes in taking action to right wrongs\",\"honor\":\"personal freedom and choice are paramount\",\"family\":\"family is chosen through bonds of friendship and loyalty\"}",
                        "relationships": "{\"friends\":\"[\\\"sir_baldric_the_bold\\\"]\",\"enemies\":\"[\\\"the_cold_empress\\\"]\",\"romantic_interests\":\"[\\\"gavriel_the_wanderer\\\"]\"}",
                        "fears_vulnerabilities": "{\"fears\":\"[\\\"the loss of her magical abilities\\\"]\",\"vulnerabilities\":\"[\\\"prone to overextending in battle\\\"]\"}",
                        "unique_abilities_powers": "[\"Phoenix Rebirth (can recover quickly from near-defeat)\"]",
                        "hobbies_interests": "[\"experimenting with potion recipes\",\"exploring ancient ruins\"]",
                        "quirks_habits": "[\"always carries a vial of fire salt\",\"draws tiny flames on parchment when bored\"]",
                        "createdAt": "2024-04-28T02:17:57.078Z",
                        "updatedAt": "2024-04-28T02:17:57.078Z"
                    },
                    "mugshot": {
                        "id": 1,
                        "mugshot": "{\"scale\":0.56,\"x\":0.54,\"y\":0.14}",
                        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00339-2189841899.png",
                        "alignment": "Chaotic Good",
                        "fullname": "Lyra Flamehair",
                        "family": "Flamehair",
                        "race": "Human",
                        "neutral_traits": "[\"Charismatic\",\"Brave\",\"Impulsive\"]",
                        "negative_traits": "[\"Reckless\",\"Short-tempered\"]",
                        "known_characters": "[\"cassandra_starshield\",\"elder_mage_veloran\"]",
                        "skills": "[\"Dual Wielding Lv 4\",\"Alchemy Lv 2\",\"Unarmed Combat Lv 3\",\"Fire Magic Lv 4\"]",
                        "short_backstory": "Lyra was born into a family of famed pyromancers. She left home to explore the world and find her own path, using her fiery talents to protect the innocent.",
                        "age": 23,
                        "core_memories": "{\"sad\":\"[\\\"destruction of her childhood home\\\",\\\"loss of her familiar\\\"]\",\"joy\":\"[\\\"discovering a new spell\\\",\\\"her first adventure\\\"]\",\"fear\":\"[\\\"water\\\",\\\"confinement\\\"]\",\"disgust\":\"[\\\"necromancy\\\",\\\"betrayal\\\"]\",\"anger\":\"[\\\"injustice\\\",\\\"slavery\\\"]\"}",
                        "long_term_goals": "[\"Master the elemental magics\",\"Find the Phoenix Stone\",\"Open a school for adventurers\"]",
                        "physical_appearance": "{\"hair_color\":\"fiery red\",\"eye_color\":\"hazel\",\"height\":\"5 feet 6 inches\",\"build\":\"fit\"}",
                        "personality_traits": "[\"adventurous\",\"independent\"]",
                        "beliefs_values": "{\"justice\":\"believes in taking action to right wrongs\",\"honor\":\"personal freedom and choice are paramount\",\"family\":\"family is chosen through bonds of friendship and loyalty\"}",
                        "relationships": "{\"friends\":\"[\\\"sir_baldric_the_bold\\\"]\",\"enemies\":\"[\\\"the_cold_empress\\\"]\",\"romantic_interests\":\"[\\\"gavriel_the_wanderer\\\"]\"}",
                        "fears_vulnerabilities": "{\"fears\":\"[\\\"the loss of her magical abilities\\\"]\",\"vulnerabilities\":\"[\\\"prone to overextending in battle\\\"]\"}",
                        "unique_abilities_powers": "[\"Phoenix Rebirth (can recover quickly from near-defeat)\"]",
                        "hobbies_interests": "[\"experimenting with potion recipes\",\"exploring ancient ruins\"]",
                        "quirks_habits": "[\"always carries a vial of fire salt\",\"draws tiny flames on parchment when bored\"]",
                        "createdAt": "2024-04-28T02:17:57.078Z",
                        "updatedAt": "2024-04-28T02:17:57.078Z"
                    }
                },
                {
                    "id": 2,
                    "parentEvent": 1,
                    "speakerId": null,
                    "mugshotId": 2,
                    "dialogText": "Yes. Who are you?",
                    "createdAt": "2024-04-28T02:17:57.094Z",
                    "updatedAt": "2024-04-28T02:17:57.094Z",
                    "parentSceneId": 1,
                    "event_backgrounds": [
                        {
                            "id": 1,
                            "name": "Some Forest",
                            "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_backgrounds/bg_00009.jpg",
                            "createdAt": "2024-04-28T02:17:57.069Z",
                            "updatedAt": "2024-04-28T02:17:57.069Z",
                            "EventBackgrounds": {
                                "createdAt": "2024-04-28T02:17:57.113Z",
                                "updatedAt": "2024-04-28T02:17:57.113Z",
                                "EventId": 2,
                                "BackgroundId": 1
                            }
                        }
                    ],
                    "event_characters": [
                        {
                            "id": 1,
                            "mugshot": "{\"scale\":0.56,\"x\":0.54,\"y\":0.14}",
                            "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00339-2189841899.png",
                            "alignment": "Chaotic Good",
                            "fullname": "Lyra Flamehair",
                            "family": "Flamehair",
                            "race": "Human",
                            "neutral_traits": "[\"Charismatic\",\"Brave\",\"Impulsive\"]",
                            "negative_traits": "[\"Reckless\",\"Short-tempered\"]",
                            "known_characters": "[\"cassandra_starshield\",\"elder_mage_veloran\"]",
                            "skills": "[\"Dual Wielding Lv 4\",\"Alchemy Lv 2\",\"Unarmed Combat Lv 3\",\"Fire Magic Lv 4\"]",
                            "short_backstory": "Lyra was born into a family of famed pyromancers. She left home to explore the world and find her own path, using her fiery talents to protect the innocent.",
                            "age": 23,
                            "core_memories": "{\"sad\":\"[\\\"destruction of her childhood home\\\",\\\"loss of her familiar\\\"]\",\"joy\":\"[\\\"discovering a new spell\\\",\\\"her first adventure\\\"]\",\"fear\":\"[\\\"water\\\",\\\"confinement\\\"]\",\"disgust\":\"[\\\"necromancy\\\",\\\"betrayal\\\"]\",\"anger\":\"[\\\"injustice\\\",\\\"slavery\\\"]\"}",
                            "long_term_goals": "[\"Master the elemental magics\",\"Find the Phoenix Stone\",\"Open a school for adventurers\"]",
                            "physical_appearance": "{\"hair_color\":\"fiery red\",\"eye_color\":\"hazel\",\"height\":\"5 feet 6 inches\",\"build\":\"fit\"}",
                            "personality_traits": "[\"adventurous\",\"independent\"]",
                            "beliefs_values": "{\"justice\":\"believes in taking action to right wrongs\",\"honor\":\"personal freedom and choice are paramount\",\"family\":\"family is chosen through bonds of friendship and loyalty\"}",
                            "relationships": "{\"friends\":\"[\\\"sir_baldric_the_bold\\\"]\",\"enemies\":\"[\\\"the_cold_empress\\\"]\",\"romantic_interests\":\"[\\\"gavriel_the_wanderer\\\"]\"}",
                            "fears_vulnerabilities": "{\"fears\":\"[\\\"the loss of her magical abilities\\\"]\",\"vulnerabilities\":\"[\\\"prone to overextending in battle\\\"]\"}",
                            "unique_abilities_powers": "[\"Phoenix Rebirth (can recover quickly from near-defeat)\"]",
                            "hobbies_interests": "[\"experimenting with potion recipes\",\"exploring ancient ruins\"]",
                            "quirks_habits": "[\"always carries a vial of fire salt\",\"draws tiny flames on parchment when bored\"]",
                            "createdAt": "2024-04-28T02:17:57.078Z",
                            "updatedAt": "2024-04-28T02:17:57.078Z",
                            "EventCharacters": {
                                "createdAt": "2024-04-28T02:17:57.120Z",
                                "updatedAt": "2024-04-28T02:17:57.120Z",
                                "EventId": 2,
                                "CharacterId": 1
                            }
                        }
                    ],
                    "childEvents": [
                        {
                            "id": 2,
                            "choice": "Lie",
                            "createdAt": "2024-04-28T02:17:57.104Z",
                            "updatedAt": "2024-04-28T02:17:57.104Z",
                            "EventId": 2,
                            "RelatedEventId": 4
                        },
                        {
                            "id": 1,
                            "choice": "Tell the truth",
                            "createdAt": "2024-04-28T02:17:57.104Z",
                            "updatedAt": "2024-04-28T02:17:57.104Z",
                            "EventId": 2,
                            "RelatedEventId": 3
                        }
                    ],
                    "parentEvents": [],
                    "speaker": null,
                    "mugshot": {
                        "id": 2,
                        "mugshot": "{\"scale\":0.55,\"x\":0.55,\"y\":0.14}",
                        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00358-421244272.png",
                        "alignment": "Lawful Good",
                        "fullname": "Cassandra Starshield",
                        "family": "Starshield",
                        "race": "Human",
                        "neutral_traits": "[\"Tactical\",\"Observant\",\"Disciplined\"]",
                        "negative_traits": "[\"Stubborn\",\"Inflexible\"]",
                        "known_characters": "[\"elder_mage_veloran\",\"rogue_thief_kir\"]",
                        "skills": "[\"Swordsmanship Lv 4\",\"Light Magic Lv 3\",\"Tactics Lv 5\",\"Archery Lv 2\"]",
                        "short_backstory": "Cassandra grew up in the militaristic city of Elyndor, where discipline and skill in combat are valued above all. She rose quickly through the ranks due to her dedication and strategic mind.",
                        "age": 125,
                        "core_memories": "{\"sad\":\"[\\\"fall of Elyndor's eastern bastion\\\",\\\"death of mentor\\\"]\",\"joy\":\"[\\\"first successful command\\\",\\\"mastering the sword dance\\\"]\",\"fear\":\"[\\\"losing her troops\\\",\\\"dishonor\\\"]\",\"disgust\":\"[\\\"cowardice\\\",\\\"treachery\\\"]\",\"anger\":\"[\\\"corruption in the high council\\\",\\\"unfair accusations against her family\\\"]\"}",
                        "long_term_goals": "[\"Restore her family's honor\",\"Become head of the city guard\",\"Reform the high council\"]",
                        "physical_appearance": "{\"hair_color\":\"blue-black\",\"eye_color\":\"emerald green\",\"height\":\"5 feet 9 inches\",\"build\":\"slender yet muscular\"}",
                        "personality_traits": "[\"leader\",\"loyal\"]",
                        "beliefs_values": "{\"justice\":\"believes in the rule of law and order\",\"honor\":\"upholds the knightly virtues of chivalry and respect\",\"family\":\"dedicated to her family's legacy\"}",
                        "relationships": "{\"friends\":\"[\\\"thorin_the_blacksmith\\\"]\",\"enemies\":\"[\\\"zara_the_sorceress\\\"]\",\"romantic_interests\":\"[\\\"damien_the_scout\\\"]\"}",
                        "fears_vulnerabilities": "{\"fears\":\"[\\\"the dark magic rising in the south\\\"]\",\"vulnerabilities\":\"[\\\"her family's disgraced name\\\"]\"}",
                        "unique_abilities_powers": "[\"Aura of Valor (inspires allies)\"]",
                        "hobbies_interests": "[\"studying ancient tactics\",\"falconry\"]",
                        "quirks_habits": "[\"meticulously sharpens her sword every night\",\"always checks the wind direction\"]",
                        "createdAt": "2024-04-28T02:17:57.078Z",
                        "updatedAt": "2024-04-28T02:17:57.078Z"
                    }
                },
                {
                    "id": 3,
                    "parentEvent": null,
                    "speakerId": 1,
                    "mugshotId": 1,
                    "dialogText": "I'm Elara, a pleasure meet you",
                    "createdAt": "2024-04-28T02:17:57.094Z",
                    "updatedAt": "2024-04-28T02:17:57.094Z",
                    "parentSceneId": 1,
                    "event_backgrounds": [
                        {
                            "id": 1,
                            "name": "Some Forest",
                            "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_backgrounds/bg_00009.jpg",
                            "createdAt": "2024-04-28T02:17:57.069Z",
                            "updatedAt": "2024-04-28T02:17:57.069Z",
                            "EventBackgrounds": {
                                "createdAt": "2024-04-28T02:17:57.113Z",
                                "updatedAt": "2024-04-28T02:17:57.113Z",
                                "EventId": 3,
                                "BackgroundId": 1
                            }
                        }
                    ],
                    "event_characters": [
                        {
                            "id": 1,
                            "mugshot": "{\"scale\":0.56,\"x\":0.54,\"y\":0.14}",
                            "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00339-2189841899.png",
                            "alignment": "Chaotic Good",
                            "fullname": "Lyra Flamehair",
                            "family": "Flamehair",
                            "race": "Human",
                            "neutral_traits": "[\"Charismatic\",\"Brave\",\"Impulsive\"]",
                            "negative_traits": "[\"Reckless\",\"Short-tempered\"]",
                            "known_characters": "[\"cassandra_starshield\",\"elder_mage_veloran\"]",
                            "skills": "[\"Dual Wielding Lv 4\",\"Alchemy Lv 2\",\"Unarmed Combat Lv 3\",\"Fire Magic Lv 4\"]",
                            "short_backstory": "Lyra was born into a family of famed pyromancers. She left home to explore the world and find her own path, using her fiery talents to protect the innocent.",
                            "age": 23,
                            "core_memories": "{\"sad\":\"[\\\"destruction of her childhood home\\\",\\\"loss of her familiar\\\"]\",\"joy\":\"[\\\"discovering a new spell\\\",\\\"her first adventure\\\"]\",\"fear\":\"[\\\"water\\\",\\\"confinement\\\"]\",\"disgust\":\"[\\\"necromancy\\\",\\\"betrayal\\\"]\",\"anger\":\"[\\\"injustice\\\",\\\"slavery\\\"]\"}",
                            "long_term_goals": "[\"Master the elemental magics\",\"Find the Phoenix Stone\",\"Open a school for adventurers\"]",
                            "physical_appearance": "{\"hair_color\":\"fiery red\",\"eye_color\":\"hazel\",\"height\":\"5 feet 6 inches\",\"build\":\"fit\"}",
                            "personality_traits": "[\"adventurous\",\"independent\"]",
                            "beliefs_values": "{\"justice\":\"believes in taking action to right wrongs\",\"honor\":\"personal freedom and choice are paramount\",\"family\":\"family is chosen through bonds of friendship and loyalty\"}",
                            "relationships": "{\"friends\":\"[\\\"sir_baldric_the_bold\\\"]\",\"enemies\":\"[\\\"the_cold_empress\\\"]\",\"romantic_interests\":\"[\\\"gavriel_the_wanderer\\\"]\"}",
                            "fears_vulnerabilities": "{\"fears\":\"[\\\"the loss of her magical abilities\\\"]\",\"vulnerabilities\":\"[\\\"prone to overextending in battle\\\"]\"}",
                            "unique_abilities_powers": "[\"Phoenix Rebirth (can recover quickly from near-defeat)\"]",
                            "hobbies_interests": "[\"experimenting with potion recipes\",\"exploring ancient ruins\"]",
                            "quirks_habits": "[\"always carries a vial of fire salt\",\"draws tiny flames on parchment when bored\"]",
                            "createdAt": "2024-04-28T02:17:57.078Z",
                            "updatedAt": "2024-04-28T02:17:57.078Z",
                            "EventCharacters": {
                                "createdAt": "2024-04-28T02:17:57.120Z",
                                "updatedAt": "2024-04-28T02:17:57.120Z",
                                "EventId": 3,
                                "CharacterId": 1
                            }
                        }
                    ],
                    "childEvents": [],
                    "parentEvents": [
                        {
                            "id": 1,
                            "choice": "Tell the truth",
                            "createdAt": "2024-04-28T02:17:57.104Z",
                            "updatedAt": "2024-04-28T02:17:57.104Z",
                            "EventId": 2,
                            "RelatedEventId": 3
                        }
                    ],
                    "speaker": {
                        "id": 1,
                        "mugshot": "{\"scale\":0.56,\"x\":0.54,\"y\":0.14}",
                        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00339-2189841899.png",
                        "alignment": "Chaotic Good",
                        "fullname": "Lyra Flamehair",
                        "family": "Flamehair",
                        "race": "Human",
                        "neutral_traits": "[\"Charismatic\",\"Brave\",\"Impulsive\"]",
                        "negative_traits": "[\"Reckless\",\"Short-tempered\"]",
                        "known_characters": "[\"cassandra_starshield\",\"elder_mage_veloran\"]",
                        "skills": "[\"Dual Wielding Lv 4\",\"Alchemy Lv 2\",\"Unarmed Combat Lv 3\",\"Fire Magic Lv 4\"]",
                        "short_backstory": "Lyra was born into a family of famed pyromancers. She left home to explore the world and find her own path, using her fiery talents to protect the innocent.",
                        "age": 23,
                        "core_memories": "{\"sad\":\"[\\\"destruction of her childhood home\\\",\\\"loss of her familiar\\\"]\",\"joy\":\"[\\\"discovering a new spell\\\",\\\"her first adventure\\\"]\",\"fear\":\"[\\\"water\\\",\\\"confinement\\\"]\",\"disgust\":\"[\\\"necromancy\\\",\\\"betrayal\\\"]\",\"anger\":\"[\\\"injustice\\\",\\\"slavery\\\"]\"}",
                        "long_term_goals": "[\"Master the elemental magics\",\"Find the Phoenix Stone\",\"Open a school for adventurers\"]",
                        "physical_appearance": "{\"hair_color\":\"fiery red\",\"eye_color\":\"hazel\",\"height\":\"5 feet 6 inches\",\"build\":\"fit\"}",
                        "personality_traits": "[\"adventurous\",\"independent\"]",
                        "beliefs_values": "{\"justice\":\"believes in taking action to right wrongs\",\"honor\":\"personal freedom and choice are paramount\",\"family\":\"family is chosen through bonds of friendship and loyalty\"}",
                        "relationships": "{\"friends\":\"[\\\"sir_baldric_the_bold\\\"]\",\"enemies\":\"[\\\"the_cold_empress\\\"]\",\"romantic_interests\":\"[\\\"gavriel_the_wanderer\\\"]\"}",
                        "fears_vulnerabilities": "{\"fears\":\"[\\\"the loss of her magical abilities\\\"]\",\"vulnerabilities\":\"[\\\"prone to overextending in battle\\\"]\"}",
                        "unique_abilities_powers": "[\"Phoenix Rebirth (can recover quickly from near-defeat)\"]",
                        "hobbies_interests": "[\"experimenting with potion recipes\",\"exploring ancient ruins\"]",
                        "quirks_habits": "[\"always carries a vial of fire salt\",\"draws tiny flames on parchment when bored\"]",
                        "createdAt": "2024-04-28T02:17:57.078Z",
                        "updatedAt": "2024-04-28T02:17:57.078Z"
                    },
                    "mugshot": {
                        "id": 1,
                        "mugshot": "{\"scale\":0.56,\"x\":0.54,\"y\":0.14}",
                        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00339-2189841899.png",
                        "alignment": "Chaotic Good",
                        "fullname": "Lyra Flamehair",
                        "family": "Flamehair",
                        "race": "Human",
                        "neutral_traits": "[\"Charismatic\",\"Brave\",\"Impulsive\"]",
                        "negative_traits": "[\"Reckless\",\"Short-tempered\"]",
                        "known_characters": "[\"cassandra_starshield\",\"elder_mage_veloran\"]",
                        "skills": "[\"Dual Wielding Lv 4\",\"Alchemy Lv 2\",\"Unarmed Combat Lv 3\",\"Fire Magic Lv 4\"]",
                        "short_backstory": "Lyra was born into a family of famed pyromancers. She left home to explore the world and find her own path, using her fiery talents to protect the innocent.",
                        "age": 23,
                        "core_memories": "{\"sad\":\"[\\\"destruction of her childhood home\\\",\\\"loss of her familiar\\\"]\",\"joy\":\"[\\\"discovering a new spell\\\",\\\"her first adventure\\\"]\",\"fear\":\"[\\\"water\\\",\\\"confinement\\\"]\",\"disgust\":\"[\\\"necromancy\\\",\\\"betrayal\\\"]\",\"anger\":\"[\\\"injustice\\\",\\\"slavery\\\"]\"}",
                        "long_term_goals": "[\"Master the elemental magics\",\"Find the Phoenix Stone\",\"Open a school for adventurers\"]",
                        "physical_appearance": "{\"hair_color\":\"fiery red\",\"eye_color\":\"hazel\",\"height\":\"5 feet 6 inches\",\"build\":\"fit\"}",
                        "personality_traits": "[\"adventurous\",\"independent\"]",
                        "beliefs_values": "{\"justice\":\"believes in taking action to right wrongs\",\"honor\":\"personal freedom and choice are paramount\",\"family\":\"family is chosen through bonds of friendship and loyalty\"}",
                        "relationships": "{\"friends\":\"[\\\"sir_baldric_the_bold\\\"]\",\"enemies\":\"[\\\"the_cold_empress\\\"]\",\"romantic_interests\":\"[\\\"gavriel_the_wanderer\\\"]\"}",
                        "fears_vulnerabilities": "{\"fears\":\"[\\\"the loss of her magical abilities\\\"]\",\"vulnerabilities\":\"[\\\"prone to overextending in battle\\\"]\"}",
                        "unique_abilities_powers": "[\"Phoenix Rebirth (can recover quickly from near-defeat)\"]",
                        "hobbies_interests": "[\"experimenting with potion recipes\",\"exploring ancient ruins\"]",
                        "quirks_habits": "[\"always carries a vial of fire salt\",\"draws tiny flames on parchment when bored\"]",
                        "createdAt": "2024-04-28T02:17:57.078Z",
                        "updatedAt": "2024-04-28T02:17:57.078Z"
                    }
                },
                {
                    "id": 4,
                    "parentEvent": null,
                    "speakerId": 1,
                    "mugshotId": 1,
                    "dialogText": "Why do you lie to me?\nI can read your mind!",
                    "createdAt": "2024-04-28T02:17:57.094Z",
                    "updatedAt": "2024-04-28T02:17:57.094Z",
                    "parentSceneId": 1,
                    "event_backgrounds": [
                        {
                            "id": 1,
                            "name": "Some Forest",
                            "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_backgrounds/bg_00009.jpg",
                            "createdAt": "2024-04-28T02:17:57.069Z",
                            "updatedAt": "2024-04-28T02:17:57.069Z",
                            "EventBackgrounds": {
                                "createdAt": "2024-04-28T02:17:57.113Z",
                                "updatedAt": "2024-04-28T02:17:57.113Z",
                                "EventId": 4,
                                "BackgroundId": 1
                            }
                        }
                    ],
                    "event_characters": [
                        {
                            "id": 1,
                            "mugshot": "{\"scale\":0.56,\"x\":0.54,\"y\":0.14}",
                            "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00339-2189841899.png",
                            "alignment": "Chaotic Good",
                            "fullname": "Lyra Flamehair",
                            "family": "Flamehair",
                            "race": "Human",
                            "neutral_traits": "[\"Charismatic\",\"Brave\",\"Impulsive\"]",
                            "negative_traits": "[\"Reckless\",\"Short-tempered\"]",
                            "known_characters": "[\"cassandra_starshield\",\"elder_mage_veloran\"]",
                            "skills": "[\"Dual Wielding Lv 4\",\"Alchemy Lv 2\",\"Unarmed Combat Lv 3\",\"Fire Magic Lv 4\"]",
                            "short_backstory": "Lyra was born into a family of famed pyromancers. She left home to explore the world and find her own path, using her fiery talents to protect the innocent.",
                            "age": 23,
                            "core_memories": "{\"sad\":\"[\\\"destruction of her childhood home\\\",\\\"loss of her familiar\\\"]\",\"joy\":\"[\\\"discovering a new spell\\\",\\\"her first adventure\\\"]\",\"fear\":\"[\\\"water\\\",\\\"confinement\\\"]\",\"disgust\":\"[\\\"necromancy\\\",\\\"betrayal\\\"]\",\"anger\":\"[\\\"injustice\\\",\\\"slavery\\\"]\"}",
                            "long_term_goals": "[\"Master the elemental magics\",\"Find the Phoenix Stone\",\"Open a school for adventurers\"]",
                            "physical_appearance": "{\"hair_color\":\"fiery red\",\"eye_color\":\"hazel\",\"height\":\"5 feet 6 inches\",\"build\":\"fit\"}",
                            "personality_traits": "[\"adventurous\",\"independent\"]",
                            "beliefs_values": "{\"justice\":\"believes in taking action to right wrongs\",\"honor\":\"personal freedom and choice are paramount\",\"family\":\"family is chosen through bonds of friendship and loyalty\"}",
                            "relationships": "{\"friends\":\"[\\\"sir_baldric_the_bold\\\"]\",\"enemies\":\"[\\\"the_cold_empress\\\"]\",\"romantic_interests\":\"[\\\"gavriel_the_wanderer\\\"]\"}",
                            "fears_vulnerabilities": "{\"fears\":\"[\\\"the loss of her magical abilities\\\"]\",\"vulnerabilities\":\"[\\\"prone to overextending in battle\\\"]\"}",
                            "unique_abilities_powers": "[\"Phoenix Rebirth (can recover quickly from near-defeat)\"]",
                            "hobbies_interests": "[\"experimenting with potion recipes\",\"exploring ancient ruins\"]",
                            "quirks_habits": "[\"always carries a vial of fire salt\",\"draws tiny flames on parchment when bored\"]",
                            "createdAt": "2024-04-28T02:17:57.078Z",
                            "updatedAt": "2024-04-28T02:17:57.078Z",
                            "EventCharacters": {
                                "createdAt": "2024-04-28T02:17:57.120Z",
                                "updatedAt": "2024-04-28T02:17:57.120Z",
                                "EventId": 4,
                                "CharacterId": 1
                            }
                        }
                    ],
                    "childEvents": [],
                    "parentEvents": [
                        {
                            "id": 2,
                            "choice": "Lie",
                            "createdAt": "2024-04-28T02:17:57.104Z",
                            "updatedAt": "2024-04-28T02:17:57.104Z",
                            "EventId": 2,
                            "RelatedEventId": 4
                        }
                    ],
                    "speaker": {
                        "id": 1,
                        "mugshot": "{\"scale\":0.56,\"x\":0.54,\"y\":0.14}",
                        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00339-2189841899.png",
                        "alignment": "Chaotic Good",
                        "fullname": "Lyra Flamehair",
                        "family": "Flamehair",
                        "race": "Human",
                        "neutral_traits": "[\"Charismatic\",\"Brave\",\"Impulsive\"]",
                        "negative_traits": "[\"Reckless\",\"Short-tempered\"]",
                        "known_characters": "[\"cassandra_starshield\",\"elder_mage_veloran\"]",
                        "skills": "[\"Dual Wielding Lv 4\",\"Alchemy Lv 2\",\"Unarmed Combat Lv 3\",\"Fire Magic Lv 4\"]",
                        "short_backstory": "Lyra was born into a family of famed pyromancers. She left home to explore the world and find her own path, using her fiery talents to protect the innocent.",
                        "age": 23,
                        "core_memories": "{\"sad\":\"[\\\"destruction of her childhood home\\\",\\\"loss of her familiar\\\"]\",\"joy\":\"[\\\"discovering a new spell\\\",\\\"her first adventure\\\"]\",\"fear\":\"[\\\"water\\\",\\\"confinement\\\"]\",\"disgust\":\"[\\\"necromancy\\\",\\\"betrayal\\\"]\",\"anger\":\"[\\\"injustice\\\",\\\"slavery\\\"]\"}",
                        "long_term_goals": "[\"Master the elemental magics\",\"Find the Phoenix Stone\",\"Open a school for adventurers\"]",
                        "physical_appearance": "{\"hair_color\":\"fiery red\",\"eye_color\":\"hazel\",\"height\":\"5 feet 6 inches\",\"build\":\"fit\"}",
                        "personality_traits": "[\"adventurous\",\"independent\"]",
                        "beliefs_values": "{\"justice\":\"believes in taking action to right wrongs\",\"honor\":\"personal freedom and choice are paramount\",\"family\":\"family is chosen through bonds of friendship and loyalty\"}",
                        "relationships": "{\"friends\":\"[\\\"sir_baldric_the_bold\\\"]\",\"enemies\":\"[\\\"the_cold_empress\\\"]\",\"romantic_interests\":\"[\\\"gavriel_the_wanderer\\\"]\"}",
                        "fears_vulnerabilities": "{\"fears\":\"[\\\"the loss of her magical abilities\\\"]\",\"vulnerabilities\":\"[\\\"prone to overextending in battle\\\"]\"}",
                        "unique_abilities_powers": "[\"Phoenix Rebirth (can recover quickly from near-defeat)\"]",
                        "hobbies_interests": "[\"experimenting with potion recipes\",\"exploring ancient ruins\"]",
                        "quirks_habits": "[\"always carries a vial of fire salt\",\"draws tiny flames on parchment when bored\"]",
                        "createdAt": "2024-04-28T02:17:57.078Z",
                        "updatedAt": "2024-04-28T02:17:57.078Z"
                    },
                    "mugshot": {
                        "id": 1,
                        "mugshot": "{\"scale\":0.56,\"x\":0.54,\"y\":0.14}",
                        "image": "http://isekai.hurast.com/wp-content/uploads/visual_novel_characters/00339-2189841899.png",
                        "alignment": "Chaotic Good",
                        "fullname": "Lyra Flamehair",
                        "family": "Flamehair",
                        "race": "Human",
                        "neutral_traits": "[\"Charismatic\",\"Brave\",\"Impulsive\"]",
                        "negative_traits": "[\"Reckless\",\"Short-tempered\"]",
                        "known_characters": "[\"cassandra_starshield\",\"elder_mage_veloran\"]",
                        "skills": "[\"Dual Wielding Lv 4\",\"Alchemy Lv 2\",\"Unarmed Combat Lv 3\",\"Fire Magic Lv 4\"]",
                        "short_backstory": "Lyra was born into a family of famed pyromancers. She left home to explore the world and find her own path, using her fiery talents to protect the innocent.",
                        "age": 23,
                        "core_memories": "{\"sad\":\"[\\\"destruction of her childhood home\\\",\\\"loss of her familiar\\\"]\",\"joy\":\"[\\\"discovering a new spell\\\",\\\"her first adventure\\\"]\",\"fear\":\"[\\\"water\\\",\\\"confinement\\\"]\",\"disgust\":\"[\\\"necromancy\\\",\\\"betrayal\\\"]\",\"anger\":\"[\\\"injustice\\\",\\\"slavery\\\"]\"}",
                        "long_term_goals": "[\"Master the elemental magics\",\"Find the Phoenix Stone\",\"Open a school for adventurers\"]",
                        "physical_appearance": "{\"hair_color\":\"fiery red\",\"eye_color\":\"hazel\",\"height\":\"5 feet 6 inches\",\"build\":\"fit\"}",
                        "personality_traits": "[\"adventurous\",\"independent\"]",
                        "beliefs_values": "{\"justice\":\"believes in taking action to right wrongs\",\"honor\":\"personal freedom and choice are paramount\",\"family\":\"family is chosen through bonds of friendship and loyalty\"}",
                        "relationships": "{\"friends\":\"[\\\"sir_baldric_the_bold\\\"]\",\"enemies\":\"[\\\"the_cold_empress\\\"]\",\"romantic_interests\":\"[\\\"gavriel_the_wanderer\\\"]\"}",
                        "fears_vulnerabilities": "{\"fears\":\"[\\\"the loss of her magical abilities\\\"]\",\"vulnerabilities\":\"[\\\"prone to overextending in battle\\\"]\"}",
                        "unique_abilities_powers": "[\"Phoenix Rebirth (can recover quickly from near-defeat)\"]",
                        "hobbies_interests": "[\"experimenting with potion recipes\",\"exploring ancient ruins\"]",
                        "quirks_habits": "[\"always carries a vial of fire salt\",\"draws tiny flames on parchment when bored\"]",
                        "createdAt": "2024-04-28T02:17:57.078Z",
                        "updatedAt": "2024-04-28T02:17:57.078Z"
                    }
                }
            ]
        }
        ```
    */

    useEffect(() => {
        var idToUse = undefined;
        if (!scene) {
            const urlParams = new URLSearchParams(window.location.search);
            idToUse = urlParams.get('id');
        } else {
            if (scene) return;
            idToUse = scene.id;
        }

        setIsLoading(true);
        axios.get(`http://localhost:8080/scene/${idToUse}`)
            .then(res => {
                setScene(res.data);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to fetch events');
            })
            .finally(() => setIsLoading(false));
    }, [scene]);

    const handleEditEvent = (eventId) => {
        setCurrentEventID( Number.parseInt(eventId) );
        navigate(`/scenes/${currentSceneID}/edit/${eventId}`);
    };

    const changeBranchSelection = (eventId, delta) => {

        //Check if index is out of bounds
        const currentIndex = branchSelection[eventId] || 0;
        if (currentIndex + delta >= scene.childEvents.find(e => e.id === eventId).childEvents.length || currentIndex + delta < 0) {
            return;
        }

        setBranchSelection(prev => ({
            ...prev,
            [eventId]: Math.max((prev[eventId] || 0) + delta, 0)
        }));
    };

    const getNextEventId = (eventId) => {
        const event = scene.childEvents.find(e => e.id === eventId);
        if (!event) return null;

        if (event.childEvents.length > 0) {
            const branchIndex = branchSelection[eventId] || 0;
            return event.childEvents[branchIndex]?.RelatedEventId;
        } else {
            // Find the next event in the sequence
            return scene.childEvents.find(e => e.parentEvent === eventId)?.id;
        }
    };

    const renderEvent = (eventId) => {
        const event = scene.childEvents.find(e => e.id === eventId);
        if (!event) return null;

        const nextEventId = getNextEventId(eventId);

        return (
            <>
                <div className='row'>
                    {/* Event details and edit button */}
                    <div className='col-12 mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Event {event.order}</h5>
                                <p className='card-text'>{event.dialogText}</p>
                                {/* Render event details here */}
                                <button onClick={() => handleEditEvent(eventId)} className='btn btn-primary'>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
                {event.childEvents.length > 0 && (
                    <div className='row mb-3'>
                        {/* Render Choice */}
                        <div className='col-12'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5 className='card-title'>Choice</h5>
                                    <p className='card-text'>{event.childEvents[Number.parseInt(branchSelection[eventId] || 0)]?.choice}</p>
                                    {/* Render choice details here */}
                                </div>
                            </div>
                            <div className='col-12 d-flex'>
                                <button className='btn' onClick={() => changeBranchSelection(eventId, -1)}><ChevronLeft /></button>
                                <input type="number" className='form-control' style={{ width: '50px', textAlign: 'center' }} value={(branchSelection[eventId] || 0) + 1} readOnly />
                                <button className='btn' onClick={() => changeBranchSelection(eventId, 1)}><ChevronRight /></button>
                            </div>
                        </div>
                    </div>
                )}
                {nextEventId && renderEvent(nextEventId)}
            </>
        );
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading events: {error}</p>;

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 mb-3 py-3'>
                    <h1>Scene Page</h1>
                </div>
            </div>

            <div className='row'>
                <div className='col-12 mb-3 py-3'>
                    <Button className='mx-1' variant="outline-success"><PlayFill className='mx-2' /> Play Scene</Button>
                    <Button className='mx-1' variant="outline-dark"><JustifyLeft className='mx-2'/> Scene Settings</Button>
                    <Button className='mx-1' variant="outline-dark"><PencilFill className='mx-2'/>Open event editor</Button>
                </div>
            </div>

            {scene && <EventList events={scene.childEvents} />}
            {currentEventID && renderEvent(currentEventID)}
        </div>
    );
}
