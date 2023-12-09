import React, { useContext, useState } from 'react';
import { Offcanvas, ListGroup, Button, Badge, Modal } from 'react-bootstrap';
import { Trash, Plus, Pencil, ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import AppContext from '../context/AppContext'; // Update the path as per your project structure

const EventCharactersDrawer = ({ show, handleClose }) => {
    const { scenes, setScenes, currentScene, currentEvent, characters } = useContext(AppContext);
    const [showCharactersModal, setShowCharactersModal] = useState(false);
    const [selectedCharIndex, setSelectedCharIndex] = useState(null);

    const handleAddCharacter = () => {
        setSelectedCharIndex(-1); // -1 indicates adding a new character
        setShowCharactersModal(true);
    };

    const handleMoveCharacter = (charId, direction) => {
        const charactersOnScene = [...scenes[currentScene].events[currentEvent].characters_on_scene];
        const index = charactersOnScene.findIndex(c => c.id === charId);
        
        if (index < 0) return; // Character not found

        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= charactersOnScene.length) return; // Target index out of bounds

        [charactersOnScene[index], charactersOnScene[targetIndex]] = [charactersOnScene[targetIndex], charactersOnScene[index]];

        const updatedEvents = scenes[currentScene].events.map((event, eventIndex) => {
            if (eventIndex === currentEvent) {
                return { ...event, characters_on_scene: charactersOnScene };
            }
            return event;
        });

        const updatedScenes = [...scenes];
        updatedScenes[currentScene].events = updatedEvents;
        setScenes(updatedScenes);
    };

    const handleDeleteCharacter = (charIndex) => {
        const updatedEvents = scenes[currentScene].events.map((event, eventIndex) => {
            if (eventIndex === currentEvent) {
                return {
                    ...event,
                    characters_on_scene: event.characters_on_scene.filter((_, i) => i !== charIndex)
                };
            }
            return event;
        });

        const updatedScenes = [...scenes];
        updatedScenes[currentScene].events = updatedEvents;
        setScenes(updatedScenes);
    };

    const handleEditCharacter = (charIndex) => {
        setSelectedCharIndex(charIndex);
        setShowCharactersModal(true);
    };

    const handleSelectCharacter = (character) => {
        const updatedEvents = scenes[currentScene].events.map((event, eventIndex) => {
            if (eventIndex === currentEvent) {
                // Check if adding a new character
                if (selectedCharIndex === -1) {
                    // Add new character
                    return {
                        ...event,
                        characters_on_scene: [...event.characters_on_scene, {
                            char_id: character.id, id: Date.now(),
                            name: character.fullname || 'Unnamed Character',
                            image: character.image
                        }]
                    };
                } else {
                    // Update existing character
                    const updatedCharacters = [...event.characters_on_scene];
                    updatedCharacters[selectedCharIndex] = character;
                    return { ...event, characters_on_scene: updatedCharacters };
                }
            }
            return event;
        });

        const updatedScenes = [...scenes];
        updatedScenes[currentScene].events = updatedEvents;
        setScenes(updatedScenes);
        setShowCharactersModal(false);
        setSelectedCharIndex(null); // Reset the selected index
    };

    if (!((currentScene !== undefined && currentEvent !== undefined && (scenes && scenes[currentScene] && scenes[currentScene].events && scenes[currentScene].events[currentEvent])))) {
        return null;
    }

    const currentCharacters = scenes[currentScene].events[currentEvent].characters_on_scene;

    return (
        <>
            <Offcanvas show={show} onHide={handleClose} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Current Event Characters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                        {currentCharacters.map((character, index) => (
                            <ListGroup.Item key={character.id} className="d-flex align-items-center">
                                <div className="me-2">
                                    <img
                                        src={character.image}
                                        alt="Character"
                                        style={{ width: '60px', height: '100px', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Badge bg="secondary" className="me-2">#{index + 1}</Badge>
                                        <Button size="sm" onClick={() => handleEditCharacter(index)}>
                                            <Pencil size={16} />
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDeleteCharacter(index)}>
                                            <Trash size={16} />
                                        </Button>
                                        <Button variant="light" size="sm" onClick={() => handleMoveCharacter(character.id, 'up')}>
                                            <ArrowUp />
                                        </Button>
                                        <Button variant="light" size="sm" onClick={() => handleMoveCharacter(character.id, 'down')}>
                                            <ArrowDown />
                                        </Button>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))}
                        <Button variant="primary" onClick={handleAddCharacter} className="mt-2">
                            <Plus size={16} /> Add New Character
                        </Button>
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>

            <Modal show={showCharactersModal} onHide={() => setShowCharactersModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Character</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {characters.map((char) => (
                            <ListGroup.Item key={char.id} onClick={() => handleSelectCharacter(char)} className="d-flex align-items-center">
                                <img
                                    src={char.image}
                                    alt={char.fullname || "Character"}
                                    style={{ width: '60px', height: '100px', objectFit: 'cover' }}
                                />
                                <div className="ms-2">{char.fullname || "Unnamed Character"}</div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EventCharactersDrawer;
