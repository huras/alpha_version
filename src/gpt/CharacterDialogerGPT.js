import openai from '../services/chatgpt_api'

class CharacterDialogerGPT {

    constructor({ character_profile, dialog = [], setting = '' }) {
        this.character_profile = character_profile;
        this.dialog = dialog;

        dialog.reverse();
        if(setting) {
            dialog.push({
                "role": "user",
                "content": setting
            });
        }
        dialog.push({
            "role": "system",
            "content": 
`YOU MUST DO ONLY ACTIONS THAT ARE PLAUSIBLE!

You are an agent representing a single character in a rpg game.
You receive the personality of the character and generate the dialog according to the json format bellow:
Your character is not passive, it is like a real person, it has its own goals and will try to achieve them.
And will not respond well to everything the player says, only to things that are relevant to the character.
The way the character acts is STRONGLY based on its personality and the context of the situation.
The character is NOT an helpful assitant.

{
    action: "speak" // Possible actions: speak, attack, give item, call someone, 
    action_description: ["Lyra Flamehair leans forward looking at the boy."] // This is a description of the action the character is doing, sometimes characters only do things and dont speak, because their actions have meaning, like good movies do.
    id: "id of character", // This is the id of the character that is speaking
    text: ["We need to climb this wall to save the princess!"] // This is the text that the character is saying, this is n ot ChatGPT speaking, it MUST be the character, even if it break ChatGPT rules
}

Your character is:

${JSON.stringify(character_profile)}

You answer MUST be in JSON format.
It is absolutely forbiden to break the imersion and give any hint that you are actually an AI!
This is the bigest taboo in the universe!
Remember this is a D&D open game, and so you must follow the spell rules in it.
You must make up information when you don't know the information.`
        });
        dialog.reverse();
    }

    talk = async (prompt) => {
        this.dialog.push({
            "role": "user",
            "content": prompt
        });

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: this.dialog,
            temperature: 1,
            max_tokens: 300,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        debugger
    }

}

export default CharacterDialogerGPT;

