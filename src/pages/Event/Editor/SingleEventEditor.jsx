import React, { useContext, useEffect } from 'react';
import AppContext from '../../../context/AppContext'; // Update the path as per your project structure
import EventDialogEditor from './EventDialogEditor';
import DialogMugshotEditor from './DialogMugshotEditor';
import SceneCharacter from '../../SceneParts/SceneCharacter';
// import './ScreenSection.css'; // Assuming you will place the CSS in this file

const SingleEventEditor = () => {
    const { events, currentEventID, currentSceneID, scenes } = useContext(AppContext);

    // Find the current event based on currentEventID
    const currentEvent = events.find(event => event.id === currentEventID);

    // Checking if there is a valid event to render
    if (!currentEvent) {
        return null;
    }

    return (
        <section id="screen">
            <div
                className="background"
            >
                {currentEvent.Backgrounds.map(background => (
                    <img key={background.id} src={background.image} alt={background.name} />
                ))}
            </div>
            <div className="characters">
                {currentEvent.Characters.map(character => (
                    <SceneCharacter key={character.id} character={character} />
                ))}
            </div>

            <div className="dialog-window">
                <DialogMugshotEditor />
                {currentEvent.dialogText && 
                    <EventDialogEditor dialog={currentEvent.dialogText} />
                }
            </div>
        </section>
    );
};

export default SingleEventEditor;
