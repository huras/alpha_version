import React, { useContext, useState } from 'react';
import AppContext from '../../../context/AppContext'; // Update the path as per your project structure
import { Button } from 'react-bootstrap'; // Assuming you're using React Bootstrap
import { SaveFill, XCircleFill, PersonVideo2 } from 'react-bootstrap-icons';

const EventDialogEditor = () => {
    const { events, setEvents, currentEventID } = useContext(AppContext);
    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState('');

    // Finding the current event based on currentEventID
    const currentEvent = events.find(event => event.id === currentEventID);

    if (!currentEvent) {
        return null; // If no current event is selected, nothing is rendered
    }

    const handleTextClick = () => {
        setEditMode(true);
        setEditedText(currentEvent.dialogText);
    };

    const handleSave = () => {
        // Update the dialog text of the current event
        const updatedEvents = events.map(event => {
            if (event.id === currentEventID) {
                return { ...event, dialogText: editedText };
            }
            return event;
        });

        setEvents(updatedEvents);
        setEditMode(false);
    };

    const handleCancel = () => {
        setEditMode(false);
        setEditedText('');
    };

    // Render nothing if dialog text is not available or dialog is not meant to be shown
    if (!currentEvent.dialogText && currentEvent.dialogText !== '') {
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
                        <Button variant="warning" onClick={handleSave} title="Animation Mode">
                            <PersonVideo2/>
                        </Button>
                        <Button variant="success" onClick={handleSave}><SaveFill/></Button>
                        <Button variant="secondary" onClick={handleCancel}><XCircleFill/></Button>
                    </div>
                </div>
            ) : (
                <pre className="text vn-window" onClick={handleTextClick}>
                    {currentEvent.dialogText}
                </pre>
            )}
        </div>
    );
};

export default EventDialogEditor;
