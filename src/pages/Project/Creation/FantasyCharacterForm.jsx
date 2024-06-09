import React, { useState } from 'react';
import CarouselSelect from './Genre';
import { Button, Col, Form, Row } from 'react-bootstrap';

const FantasyCharacterForm = ({genre}) => {

    //Preset the story using a Form UI CYOA and then save it to the database
    //The user now must play to earn points to achieve the character creation
    //In the middle the system will generate more lore, characters, places in the lower octaves of detail level.
    //The user can get side quest points to purchase more things of the CYOA store.
    //Each trait selected in the CYOA story wil be an arch of the story.
    //The system will align these archs to create a story with a higher level arch with depression and climax.

    const [character, setCharacter] = useState(null);
    const [characterPoints, setCharacterPoints] = useState(20);

    const CharacterFicha = {
        character_status: [
            {id: 'str', label: 'Strength', description: 'Measures physical power and capability for tasks like lifting, carrying, and breaking objects.'},
            {id: 'dex', label: 'Dexterity', description: 'Governs agility, reflexes, and balance, influencing skills like stealth, acrobatics, and ranged attacks.'},
            {id: 'con', label: 'Constitution', description: 'Represents health, stamina, and vitality, affecting hit points and resistance to certain effects like poison or disease.'},
            {id: 'int', label: 'Intelligence', description: 'Reflects cognitive ability, memory, and problem-solving skills, influencing knowledge-based skills and spellcasting for certain classes.'},
            {id: 'wis', label: 'Wisdom', description: 'Measures perception, intuition, and willpower, affecting insight, survival skills, and some magical abilities.'},
            {id: 'cha', label: 'Charisma', description: 'Represents charm, persuasiveness, and force of personality, influencing social interactions, leadership, and certain magical abilities.'},
        ],
        required_character_powers: [
            {id: 'player_teleport',  description: 'You can teleport .'}
        ],
        character_powers: [
        ],
        character_race: [
            {
                id: 'human', 
                label: 'Humanity', 
                description: "Thriving off productivity and numbers, humans habe grown to be one of the world's most dominating powers, but are otherwise fairly average physiologically.",
                status_preset: {str: 4, dex: 4, con: 3, int: 3, wis: 3, cha: 4},
                custom_backgrounds: [
                    {id: 'noble', label: 'Noble', description: 'You are a member of a noble family, whether you are the heir to the throne or a distant cousin. You are well-versed in the ways of courtly intrigue and politics.'},
                    {id: 'soldier', label: 'Soldier', description: 'You are a veteran of a military force, having seen combat and learned the ways of war. You are disciplined and well-trained.'},
                    {id: 'merchant', label: 'Merchant', description: 'You are a successful merchant, trader, or entrepreneur, having made a name for yourself in the world of business. You are skilled in negotiation and trade.'},
                ]
            },
            {
                id: 'elf', 
                label: 'Elves', 
                description: "One of the oldes races, the Elves are known for their preservation of their heritage. They pride themselves on their intellect and wisdom.",
                status_preset: {str: 3, dex: 4, con: 2, int: 5, wis: 6, cha: 4},
            },
        ],
        character_backgrounds: [

        ],
        character_classes: [
            {id: 'fighter', label: 'Fighter', description: 'A master of martial combat, skilled with a variety of weapons and armor.'},
            {id: 'wizard', label: 'Wizard', description: 'A scholarly magic-user capable of manipulating the structures of reality.'},
            {id: 'rogue', label: 'Rogue', description: 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies.'},
            {id: 'cleric', label: 'Cleric', description: 'A priestly champion who wields divine magic in service of a higher power.'},
            {id: 'ranger', label: 'Ranger', description: 'A warrior who uses martial prowess and nature magic to protect the wilderness.'},
            {id: 'paladin', label: 'Paladin', description: 'A holy warrior bound to a sacred oath, capable of smiting enemies and healing allies.'},
            {id: 'sorcerer', label: 'Sorcerer', description: 'A spellcaster who draws on inherent magic from a gift or bloodline.'},
            {id: 'bard', label: 'Bard', description: 'An inspiring magician whose power echoes the music of creation.'},
            {id: 'druid', label: 'Druid', description: 'A priest of the Old Faith, wielding the powers of nature—moonlight and plant growth, fire and lightning—and adopting animal forms.'},
            {id: 'monk', label: 'Monk', description: 'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection.'},
            {id: 'barbarian', label: 'Barbarian', description: 'A fierce warrior of primitive background who can enter a battle rage.'},
            {id: 'warlock', label: 'Warlock', description: 'A wielder of magic that is derived from a bargain with an extraplanar entity.'},
        ],

    };

    return (
        <>
            <Form.Group controlId="formGenre">
                <Form.Label>Select fantasy main theme</Form.Label>
                <CarouselSelect options={[
                    
                    
                ]} onSetOption={setGenre} />
            </Form.Group>

            {/* {genre && genre.value === 'fantasy' && (Fantasy)} */}
        </>
    );
}

export default FantasyCharacterForm;
