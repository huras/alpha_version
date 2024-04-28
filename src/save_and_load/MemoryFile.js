//class for saving and loading a GPT story
class MemoryFile {

    /*
    Format:
    {
        data: {
            backgrounds:[
                {
                    id: number,
                    description: string,
                    ...
                },
                ...
            ],
            characters:[
                {
                    id: number,
                    name: string,
                    description: string,
                    ...
                },
                ...
            ],
            scenes:[
                {
                    id: number
                    events:[ array_of_ent_ids ],
                },
                ...
            ],
            events: [{
                id: number,
                "background": [
                    {
                        "background_id": 1,
                    }
                ],
                "Characters": [
                    {
                        "character_id": 1,
                    },
                ],
                "dialog": {
                    "mugshot": false or character_id,
                    "speaker": false or string,
                    "text": false or "Você parece perdido."
                },
                "child_events": [ //these are just events that are triggered by this event
                    {
                        "event_id": 2,
                        "choice": "Quem é você",
                    },
                    {
                        "event_id": 16,
                        "choice": "Cala a boca sua cachorra!",
                    }
                ]
            }],
            ...
        },
        pos: number
    }
    */

    constructor({ data = {}, pos = 0 }) {
        this.data = data;
        this.pos = pos;
    }
}


/*
Example data
{
    "background": [ARRAY OF BACKGROUND IDS],
    "Characters": [ARRAY OF CHARACTER IDS],
    "dialog":
    {
    "speaker": [CHARACTER ID],
    "mugshot": [CHARACTER ID]
    "text": "Você parece perdido."
    },
    "child_events": [ARRAY OF EVENT IDS],
    "parent_scene": [SCENE ID],
},
*/