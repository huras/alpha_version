import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext'; // Update the path as per your project structure
import { Button } from 'react-bootstrap'; // Assuming you're using React Bootstrap

const EventDialogEditor = () => {
    const { scenes, setScenes, currentScene, currentEvent } = useContext(AppContext);
    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState('');

    if (currentScene === undefined || currentEvent === undefined) {
        return null;
    }

    const event = scenes[currentScene].events[currentEvent];

    const handleTextClick = () => {
        setEditMode(true);
        setEditedText(event.dialog.text);
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
                                dialog: { ...e.dialog, text: editedText }
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
        setEditedText('');
    };

    if((!event.dialog.text && event.dialog.text !== '')   || event.dialog.show === false) {
        return null;
    }

    return (
        <div>
            {editMode ? (
                <div className='vn-dialog-edit-mode'>
                    <textarea 
                        className="text vn-window"
                        value={editedText} 
                        onChange={(e) => setEditedText(e.target.value)}
                    />
                    <div className='edit-buttons'>
                        <Button variant="success" onClick={handleSave}>Save</Button>
                        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                    </div>
                </div>
            ) : (
                <pre className="text vn-window" onClick={handleTextClick}>
                    {event.dialog.text}
                </pre>
            )}
        </div>
    );
};

export default EventDialogEditor;
