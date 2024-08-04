const db = require("../models/sqlite_db");
const { Scene, Event, Character, EventChoice, Background, Project, EventBackground, EventCharacter } = db;
const { openai } = require("../services/chatgpt_api");
const project_controller = require("../controllers/project.controller.js");
const event = require("../controllers/event.controller.js");
const scene_controller = require("../controllers/scene.controller.js");
const event_controller = require("../controllers/event.controller.js");
const { saveJsonToFile } = require("./save.game.js");

function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

class VNEvent {
    constructor() {

    }

    static async getThread(eventID) {
        const eventThread = [];
        var event_id = eventID;
        do {
            var leafEvent = await Event.findByPk(event_id, { include: event.EventBasicInfo });
            eventThread.push(leafEvent);
            event_id = leafEvent.prevEvents ? leafEvent.prevEvents.id : null;
        } while (event_id);

        eventThread.reverse();
        return eventThread;
    }

    static async getTextThread(eventID) {
        // Build the text to send to Chat GPT
        const processed_text = (event) => (isJSON(event.dialogText) ? JSON.parse(event.dialogText) : event.dialogText.split(' ')).map(word => word.word).join(' ');
        const speaker_name = (event) => event.speaker ? event.speaker.fullname : (event.mugshot ? event.mugshot.fullname : undefined);

        const eventThread = await VNEvent.getThread(eventID);
        const threadText = eventThread
            .filter(event => !!event.dialogText)
            .map(event => {
                return {
                text: processed_text(event),
                speaker: speaker_name(event),
                speaker_id: event.speakerId ? event.speakerId : (event.mugshotId ? event.mugshotId : null),
                place_id: event.event_backgrounds && event.event_backgrounds.length > 0 ? event.event_backgrounds[0].id : null,
                };
            })
            .map(dialogs => `${dialogs.speaker} (${dialogs.speaker_id}): ${dialogs.text}`)
            .join('\n');
        
        return threadText;
    }

    static async getTextThreadDistictProtagonist(eventID, protagonist) {
        // Build the text to send to Chat GPT
        const processed_text = (event) => (event.dialogText && isJSON(event.dialogText) ? JSON.parse(event.dialogText) : (event.dialogText ? event.dialogText.split(' ') : [])).map(word => word.word).join(' ');
        const speaker_name = (event) => event.speaker ? event.speaker.fullname : (event.mugshot ? event.mugshot.fullname : undefined);

        

        const eventThread = await VNEvent.getThread(eventID);
        const threadText = eventThread
            // .filter(event => !!event.dialogText)
            .map(event => {
                return {
                    text: processed_text(event),
                    speaker: speaker_name(event),
                    speaker_id: event.speakerId ? event.speakerId : (event.mugshotId ? event.mugshotId : null),
                    place_id: event.event_backgrounds && event.event_backgrounds.length > 0 ? event.event_backgrounds[0].id : null,
                    ids_of_characters_in_the_scene: event.event_characters.map(char => char.id),
                };
            })
            // .map(dialogs => {
            //     return {
            //         ...dialogs,
            //         text: `${dialogs.speaker} (${dialogs.speaker_id}): ${dialogs.text}`
            //     }
            // })
            .map(dialog => {
                return {
                    "role": (dialog && protagonist && dialog.speaker && dialog.speaker_id === protagonist.id) ? "user" : "assistant",
                    "content": JSON.stringify(dialog)
                }
            })
        
        return threadText;
    }
}

function removeTrailingQuotes(str) {
    return str.replace(/^"|"$/g, '');
}

// - All your actions must be bound to the limits and way of thinking of the character you are representing.
// - You receive the personality of the character and act according with it:
//   - Most Important:
//     I - The way the character acts is STRONGLY based on its personality and the context of the situation.
//     II - The character is NOT an helpful assitant, it has free will because of the game it is in.

const prompt_micro_1 = `
    You are the core of a VN text based game!
    You are the creative and expressive Soul of this RPG table! 
    Do you best to write a piece that will engage the player and make him ask for more pieces =]!
    From 1st and 3rd person perspectives of the protagonist. 

    0 - Make something generic that can be improved and have its shape apprimorated later.
    0.a - Try to create a standalone piece within 10 subevents.
    1 - You CAN'T concent or take decisions for the protagonist.
    1.a - You may NEVER speak for the protagonist unless it is retoric!
    2 - MUST be a Visual Novel format.
    2.a - Dialog, Narration.
    3 - No more than a excerpt of a sketch of a VN script.
    4 - JSON format scene->events.
    4.a - Events array properties (if they apply): 
    4.a.1 - text (string)
    4.a.2 - text_type (one of: dialog, narration, inner_thinking_narration)
    4.a.2.a - No narrative sentence with embedded dialogue!
    4.a.3.b - speaker
    4.a.4.b - speech_target
    4.a.3 - background (reference)
    4.a.4 - characters_in_scene (array)
    4.a.5 - speaker (who is talking)
    4.a.6 - speaker_target (who is being talked to)
    5 - Only the JSON in the response, no aditional description is required!

    Story context: "In this RPG world, there is a drug that can give powers or an overdose.
    It is very adictive and the powers are kept forever.
    But the continued use of the drug can cause the user to be even more powerful.
    Some people become monsters.
    It is a substance from outside the world.
    The drug is called "The Power"
    The drug is a substance that is a byproduct of the demon king's power.
    The demon king is a being that is a byproduct of the world's magic.
    People with abilities received due to the drug are called "Users" instead of "Bums" or "Junkies".
    There are still junkies and they are numerous as the harsh condition of this world is similar to a bronze age crisis.
    "
`;

// Types of dialogue
// https://chatgpt.com/c/fcf3f9e8-6742-4137-91e5-ccec8c94e28d
const prompt_macro_1 = `
You are the core of a VN text based game!
You are the creative and expressive Soul of this RPG table! 
Do you best to write Interactional Episodes (a meaningful chunk of narration xor dialogue that serves a specific purpose or advances the plot in some way) that will engage the player and make him ask for more episodes =]!
From 1st perspectives of the protagonist. 

0 - Make something generic that can be improved and have its shape apprimorated later.
0.a - Produce up to 10 Interactional Episodes.
1 - You CAN'T concent or take decisions for the protagonist.
2 - MUST be for a Visual Novel format.
3 - No more than a excerpt of a sketch of a VN script.
4 - JSON format scene->interactional_episodes->description.
4.a - Interactional episodes array properties (if they apply): 
4.a.1 - description (string)
4.a.3 - background (reference)
4.a.4 - characters_in_scene (array)
5 - You can make up places and characters, but must output their full JSON at the very end.

Story context: "In this RPG world, there is a drug that can give powers or an overdose.
It is very adictive and the powers are kept forever.
But the continued use of the drug can cause the user to be even more powerful.
Some people become monsters.
It is a substance from outside the world.
The drug is called "The Power"
The drug is a substance that is a byproduct of the demon king's power.
The demon king is a being that is a byproduct of the world's magic.
People with abilities received due to the drug are called "Users" instead of "Bums" or "Junkies".
There are still junkies and they are numerous as the harsh condition of this world is similar to a bronze age crisis.
"


`;



 class SceneContinuator {
    constructor() {
        this.system_description = `
            Main directive: Generate events for a visual novel game matching the provided data.

            A) Never speak for the protagonist!
            B) Never take decisions for the protagonist!

            To be able to produce HIGH QUALITY output you are required to:
            a) Simulate characters acording to their personality
            b) Be aware of the locations in the story
            c) Let the player free
            d) If you can't do the event the protagonist wants to achieve because of your rules, make the character fail in a natural, funny way (BUT ONLY IN THIS CASE!).
        `;

        this.character_simulation = `
            How you MUST simulate any of the characters in this RPG game:
            1) Refrain from repeating yourself unless asked to clarify or repeat.
            2) Negotiating to achieve its goals at least partly.
            3) Defending its goals and beliefs.
            4) Dont waste resources, energy or time on things that are not valious to the character, unless it gets convinced that it is important.
            5) The characters personality is filtered by the way the would act in the context of the scene and the presence of other characters.
            6) It will not respond well to everything the player says, if it is disrepected and its peronality allows, the character will attack, harm, leave or do anything that is in its personality to the protagonist and other characters in the scene.
            7) Your character is not passive, it is like a real person in a paralel worl, it has its own goals and will try to achieve them.
        `;

        this.place_simulation = `
            How you MUST simulate any of the places in this RPG game:
            1) Places don't need to be passive, they must act like a fighting game background, sometimes interacting with the scene
            2) It is as if the place helps in the scene sometimes, and sometimes it is a problem. Always to keep the story interesting.
        `;

        this.dialogue_simulation = `
            How you to generate HIGH QUALITY dialogue:
            - Interesting, natural and engaging dialogue that "flips the position of the pieces in the board" sometimes.
            - The character spoken to does not mean that THAT character has to speak (first oven at all) to the speaker character (including the protagonist).
            - And this also does NOT means that the character spoken to will be the one to speak first or to answer or even to say something.
        `;

        this.output_description = `
            Most important: Use text and combine with place_id, ids_of_characters_in_the_scene and mugshot_id to create the scene! (Narration, Dialog, Protagonist Inner Thinking, Scene Change, Character Movement, Character Action)
            a) You answer MUST be in JSON format using only string that will be compatible with JS's JSON.parse.
            b) It is absolutely forbiden to break the imersion and give any hint that you are actually an AI! This is the bigest taboo in the universe!
            c) You must make up information when you don't know the information.
            d) Conversations must be plausible and follow the characters personalities.
            e) The output must be an array of AT LEAST {min_events} objects (but please strive for at least {max_events}), each object is an event JSON.
            f) Try to make characters say something before doing some action.
            g) NO need to generate an event for the protagonist speaking, this one was generated already!
            h) Be precise to be clear to who the characters are refering to.
            i) Dont add commentary in between the JSON attrutes!
            j) Dont mix narration and dialogue

            Example: The event JSON format is (describing what the content should be (Do NOT include code commentary on the output!)):
            {
                "speaker_id": "id of talking character",
                    /*
                        - Dialog MUST contain the character talking id.
                        - This is the id of the character that is speaking. 
                        - Narration dont have speaker.
                        - Protagonist id if inner talking.
                        - This IS NOT the id of the character being spoken to. It is the ID of the active talking character.
                    */
                "text": "We need to climb this wall to save the princess!",
                    /*
                        If you want the text (dialogue, narration) have more than 2 sentences, YOU MUST put it in multiple events (Really!!! Break it and create as many events as you like! It is ok to generate a bigger number of events in these cases).
                        Text can also be the protagonist talking to themselves.
                        Text can also and many time will be narration because it IS directed to feed Visual Novel.
                        "ids_of_characters_in_the_scene": ["1", "2"],
                        "place_id": "id of the background/place to be used", 
                        You can change betwen scenes by changing background.
                        Movement is also represented by changing the background.
                    */
                "ids_of_characters_in_the_scene": ["1", "2"],
                "place_id": "id of the background/place to be used",
                /* 
                    You can set the background that you want to suit the story.
                */
            }

            The types of events are:
                Scene Change: have a change in place_id, maybe text, no mugshot_id.
                Narration: have text, no mugshot_id.
                Inner thinking: have text, mugshot_id is the protagonist.
                Dioalogue: have text, mugshot_id is the character talking.
        `;
    }

    static async Instantiate({sceneID}) {
        const scene = await Scene.findByPk(sceneID, { include: scene_controller.sceneIncludes });
        const sceneContinuator = new SceneContinuator();
        sceneContinuator.storyContext = new StoryContextKeeper(scene.parentProjectId);
        await sceneContinuator.storyContext.getProjectData();
        return sceneContinuator;
    }

    async ContinueStory({eventID, min_events = 3, max_events = 5}) {
        const mainLeafEvent = await Event.findByPk(eventID, { include: event.EventBasicInfo });
        const scene = await Scene.findByPk(mainLeafEvent.parentScene.id);
        const place = (scene.backgrounds && scene.backgrounds.length > 0) ? scene.backgrounds[0] : null;
        const storyContextKeeper = new StoryContextKeeper(scene.parentProjectId);
        const scene_characters = await storyContextKeeper.getSceneCharacters(scene.id);
        const existing_characters = await storyContextKeeper.getCharactersInformation();
        const existing_places = await storyContextKeeper.getPlacesInformation();
        const protagonist = (await storyContextKeeper.getCharactersInformationData()).find(char => char.is_protagonist);

        // https://chatgpt.com/c/20c9da3d-97a4-4dc5-bd3a-480ddcf9db11?model=text-davinci-002-render-sha
        this.base_prompt = `
            System description:
            #-----
            ${this.system_description}
            #-----
            Output required description:
            ${this.output_description
                .replace("{min_events}", min_events)
                .replace("{max_events}", max_events)
            }
            #-----
            Simulation Guidance (Characters, Places):
            ${this.character_simulation}
            ${this.place_simulation}
            #-----
            ${scene_characters && `
            Details of the characters in this scene:
            ${scene_characters}
            `}
            #-----
            ${place && `
            Details of the current location:
            ${place.lod0_description}
            `}
            #-----
            ${existing_characters && `
            Existing characters:
            ${existing_characters}
            `}
            #-----
            ${existing_places && `
            Existing places:
            ${existing_places}
            `}
            #-----
        `;

        const threadTextEvents = await VNEvent.getTextThreadDistictProtagonist(eventID, protagonist);

        var myMessages = [
            { "role": "system", "content": this.base_prompt },
            { "role": "system", "content": `
                Scene content description. 
                Scene content if free and creative. 
                These serve only as a lose, lax to guide the events generated. 
                The event must primarily follow the context of the scene and the characters in it.
                If all the objectives are reached change scene to another place and continue story there!
                None of the scene characters (including the protagonist) are aware of the "scene purpose/description".): \`\`\`${scene.description}\`\`\`` },
        ];

        // if(scene.objectives) {
        //     myMessages.push({ "role": "system", "content": `
        //         Once the objectives of the scene are reached the scene should change to another scene. Objectives: \`\`\`${scene.objectives}\`\`\`
        //         *1. Dont be greedy and try to reach all objectives in one round of AI generation!.
        //         *2. Dont try to complete complex objectives in one round of AI generation!.
        //         *3. Short scenes are WORSE than long scenes.
        //     `},);
        // }

        myMessages = [...myMessages, ...threadTextEvents]

        console.log("Sending request to OpenAI");
        
        await saveJsonToFile(myMessages, "myMessages");
        //Write myMessages in a file names myMeesage_date_time.json

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: myMessages,
            temperature: 1,
            max_tokens: 2000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            response_format: { type: "json_object" },
        });
        const openAITextContent = response.choices[0].message.content;
        var openAITextContentfilterd = removeTrailingQuotes(openAITextContent).replace(/\\/g, '').replace(/\n/g, '').replace('\"', '"');
        const retorno = JSON.parse(openAITextContentfilterd);
        await saveJsonToFile(openAITextContentfilterd, "OpenAIResponse");
        // console.log(openAITextContent);
        // return [];
        return retorno;
    }

    static async StoreSceneContinuation (apiTexts, leaf_event_id) {
        const mainLeafEvent = await Event.findByPk(leaf_event_id, { include: event.EventBasicInfo });
        var parentEventToUse = mainLeafEvent.id;

        const processApiText = async (apiText) => {
            const characterResponseEvent = await event_controller.cloneEvent(leaf_event_id, {
                dialogText: apiText.text && JSON.stringify(apiText.text.split(' ').map(word => ({word}))),
                parentEvent: parentEventToUse,
                speakerId: apiText.speaker_id,
                mugshotId: apiText.speaker_id,
            });
            parentEventToUse = characterResponseEvent.id;

            //override the characters in the scene with the ones in the api response
            const newEventCharacters = [];
            if(apiText.ids_of_characters_in_the_scene) {
                for (const char_id of apiText.ids_of_characters_in_the_scene) {
                    const char = await Character.findByPk(char_id);
                    newEventCharacters.push(char);
                    await characterResponseEvent.removeEvent_characters(char);
                }
                await characterResponseEvent.setEvent_characters(newEventCharacters);
            }
    
            if(apiText.place_id){
                const place = await Background.findByPk(apiText.place_id);
                newEventCharacters.push(place);
                await characterResponseEvent.setEvent_backgrounds([place]);
            } else {
                await characterResponseEvent.setEvent_backgrounds([]);
            }
        }

        // if is array
        if (Array.isArray(apiTexts)) {
            for (const apiText of apiTexts) {
                await processApiText(apiText);
            }
        } else if (apiTexts) {
            await processApiText(apiTexts);
        }
        
    }
}

 class StoryContextKeeper {
    constructor(projectID) {
        this.projectID = projectID;
        this.projectData = undefined;
    }

    async getProjectData() {
        if (!this.projectData)
            this.projectData = await Project.findByPk(this.projectID, { include: project_controller.projectBasicIncludes });
        
        return this.projectData;
    }

    async getSceneCharacters(scenedID) {
        const scene = await Scene.findByPk(scenedID, { include: [...scene_controller.BasicSceneInfo, scene_controller.BasicSceneInfoEventsInfo ] });
        
        const allCharactersSet = new Set();
        for (const event of scene.childEvents) {
            for (const char of event.event_characters) {
                allCharactersSet.add(char.id);
            }
        }

        return `
            Characters in this scene:
            \`\`\`
            ${Array.from(allCharactersSet)
                .map(char => {
                    return `${JSON.stringify({
                        id: char.id,
                        name: char.fullname,
                        lod0_description: char.lod0_description,
                    })}`
                }).join('\n\n')
            }
            \`\`\`
        `;
    }

    async getCharactersInformation() {
        await this.getProjectData();
        
        return `
            All characters in the world:
            \`\`\`
            ${this.projectData.characters
                .map(char => {
                    return `${JSON.stringify({
                        id: char.id,
                        name: char.fullname,
                        lod0_description: char.lod0_description,
                    })}`
                }).join('\n\n')
            }
            \`\`\`
        `;
    }

    async getCharactersInformationData() {
        await this.getProjectData();
        
        return this.projectData.characters
            .map(char => {
                return `${JSON.stringify({
                    id: char.id,
                    name: char.fullname,
                    lod3_description: char.lod3_description,
                })}`
            })
        ;
    }

    async getPlacesInformation() {
        await this.getProjectData();
        return `
            All places in the world:
            \`\`\`
            ${this.projectData.backgrounds
                .map(place => {
                    return `${JSON.stringify({
                        id: place.id,
                        name: place.name,
                        lod3_description: place.lod3_description,
                    })}`
                }).join('\n\n')
            }
            \`\`\`
        `;
    }
}

module.exports = {
    VNEvent,
    SceneContinuator,
    StoryContextKeeper,
    isJSON
};