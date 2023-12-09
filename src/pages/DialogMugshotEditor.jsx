import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext'; // Update the path as per your project structure
import { Button, Form } from 'react-bootstrap'; // Assuming you're using React Bootstrap
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';

const DialogMugshotEditor = () => {
    const { scenes, setScenes, currentScene, currentEvent } = useContext(AppContext);
    const [editMode, setEditMode] = useState(false);
    const [editedMugshot, setEditedMugshot] = useState('');
    const [showMugshot, setShowMugshot] = useState(true); // State to toggle mugshot visibility


    if (currentScene === undefined || currentEvent === undefined) {
        return null;
    }

    const event = scenes[currentScene].events[currentEvent];

    const handleMugshotClick = () => {
        setEditMode(true);
        setEditedMugshot(event.dialog.mugshot || ''); // Assuming mugshot is a property of dialog
    };

    const handleSave = () => {
        const updatedScenes = scenes.map((scene, i) => {
            if (i === currentScene) {
                return {
                    ...scene,
                    events: scene.events.map((e, j) => {
                        if (j === currentEvent) {
                            return {
                                ...e,
                                dialog: { ...e.dialog, mugshot: editedMugshot }
                            };
                        }
                        return e;
                    })
                };
            }
            return scene;
        });

        setScenes(updatedScenes);
        setEditMode(false);
    };

    const handleCancel = () => {
        setEditMode(false);
        setEditedMugshot('');
    };

    const toggleMugshot = () => {
        setShowMugshot(!showMugshot);
        // Call a function to handle mugshot active state in the event
        handleMugshotActiveState(currentEvent, !showMugshot); // Example function call
    };

    // Example function to handle mugshot active state
    const handleMugshotActiveState = (eventIndex, isActive) => {
        // Logic to handle mugshot active state in the event
        // Update the event in the scenes to reflect the new active state
    };

    if((!event.dialog.text && event.dialog.text !== '') || event.dialog.show === false) {
        return null;
    }

    return (<>
        <div className="speaker vn-window">
            <div onClick={toggleMugshot} className='w-100 text-center'>
                {showMugshot ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
            </div>
            {showMugshot && (<>
                {editMode ? (
                    <div className='vn-dialog-edit-mode'>
                        <Form.Control
                            type="text"
                            value={editedMugshot}
                            onChange={(e) => setEditedMugshot(e.target.value)}
                            placeholder="Enter mugshot URL"
                        />
                        <div className='edit-buttons'>
                            <Button variant="success" onClick={handleSave}>Save</Button>
                            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                        </div>
                    </div>
                ) : (
                    <div onClick={handleMugshotClick}>
                        <div className="mugshot-placeholder">
                            <div className="mugshot" style={{ backgroundImage: `url(${event.dialog.mugshot || 'default-mugshot-url.png'})` }}></div>
                        </div>
                        {event.dialog.speaker &&
                            <div className="name">{event.dialog.speaker}</div>}
                    </div>
                )}
            </>)}
        </div>
    </>);
};

export default DialogMugshotEditor;
