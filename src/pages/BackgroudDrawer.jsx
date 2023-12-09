import React, { useContext } from 'react';
import { Offcanvas, ListGroup, Button, Badge } from 'react-bootstrap';
import { Trash, Plus } from 'react-bootstrap-icons';
import AppContext from '../context/AppContext'; // Update the path as per your project structure

const BackgroundDrawer = ({ show, handleClose }) => {
    const { scenes, setScenes, currentScene, currentEvent, hasValidCurrentEvent } = useContext(AppContext);

    const handleDeleteBackground = (bgIndex) => {
        const updatedEvents = scenes[currentScene].events.map((event, eventIndex) => {
            if (eventIndex === currentEvent) {
                return {
                    ...event,
                    background: event.background.filter((_, i) => i !== bgIndex)
                };
            }
            return event;
        });

        const updatedScenes = [...scenes];
        updatedScenes[currentScene].events = updatedEvents;
        setScenes(updatedScenes);
    };

    const handleAddBackground = () => {
        const newBackground = {
            // Define the structure of your new background here
            id: Date.now(), // Example structure
            name: 'New Background',
            image: ''
        };

        const updatedEvents = scenes[currentScene].events.map((event, eventIndex) => {
            if (eventIndex === currentEvent) {
                return {
                    ...event,
                    background: [...event.background, newBackground]
                };
            }
            return event;
        });

        const updatedScenes = [...scenes];
        updatedScenes[currentScene].events = updatedEvents;
        setScenes(updatedScenes);
    };

    if( !((currentScene !== undefined && currentEvent !== undefined && (scenes && scenes[currentScene] && scenes[currentScene].events && scenes[currentScene].events[currentEvent]))) ) {
        return null;
    }

    const currentBackgrounds = scenes[currentScene].events[currentEvent].background;

    return (
        
                <Offcanvas show={show} onHide={handleClose} placement="start">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Current event backgrounds</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ListGroup>
                            {currentBackgrounds.map((bg, index) => (
                                <ListGroup.Item key={bg.id} className="d-flex align-items-center">
                                    <div className="me-2">
                                        <img
                                            src={bg.image}
                                            alt="Background"
                                            style={{ width: '100px', height: '60px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <Badge bg="secondary" className="me-2">#{index + 1}</Badge>
                                                {bg.name}
                                            </div>
                                            <Button variant="danger" size="sm" onClick={() => handleDeleteBackground(index)}>
                                                <Trash size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                            <Button onClick={handleAddBackground} className="mt-2">
                                <Plus size={16} /> Add New Background
                            </Button>
                        </ListGroup>
                    </Offcanvas.Body>
                </Offcanvas>
           
    );
};

export default BackgroundDrawer;
