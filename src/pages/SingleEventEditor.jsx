import React, { useContext } from 'react';
import AppContext from '../context/AppContext'; // Update the path as per your project structure
import EventDialogEditor from './EventDialogEditor';
import DialogMugshotEditor from './DialogMugshotEditor';
// import './ScreenSection.css'; // Assuming you will place the CSS in this file


// Event Structure demo
// {
//     "background": [
//       {
//         "id": 1,
//         "name": "Some Forest",
//         "image": "img/bg/00041-2534950232.png"
//       }
//     ],
//     "characters_on_scene": [
//       {
//         "id": 1,
//         "image": "img/char/00133-1521237494.png"
//       },
//     ],
//     "audio_events": [
//     ],
//     "dialog": [
//       {
//         "speaker": "Kazuma",
//         "text": "The king is dead! Long live the king!"
//       }
//     ]
// }

const SingleEventEditor = () => {
    const { currentEvent,
        scenes, currentScene, hasValidCurrentEvent } = useContext(AppContext);

    const event = scenes[currentScene].events[currentEvent]; // Assuming currentEvent has all the necessary data

    if( !((currentScene !== undefined && currentEvent !== undefined && (scenes && scenes[currentScene] && scenes[currentScene].events && scenes[currentScene].events[currentEvent]))) ) {
        return null;
    }

    return (
        
                <section id="screen">
                    <div
                        className="background"
                        style={{ backgroundImage: `url('${(event.background.length == 0) ? '' : event.background.image}')` }}
                    >
                        {event.background.map(character => (
                            <img key={character.id} src={character.image} alt="Background" />
                        ))}
                    </div>
                    <div className="characters">
                        {event.characters_on_scene.map(character => (
                            <img key={character.id} src={character.image} alt="Character" />
                        ))}
                    </div>

                    <div className="dialog-window">
                        <DialogMugshotEditor />
                        {event.dialog.text &&
                            <EventDialogEditor />}

                    </div>

                </section>
            
    );
};

export default SingleEventEditor;
