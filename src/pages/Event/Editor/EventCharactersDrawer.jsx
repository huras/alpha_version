import React, { useContext, useState } from 'react';
import { Offcanvas, ListGroup, Button, Badge, Modal } from 'react-bootstrap';
import { Trash, Plus, Pencil, ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import AppContext from '../../../context/AppContext'; // Update the path as per your project structure
import ProjectContext from '../../../context/ProjectContext';

const EventCharactersDrawer = ({ scene, event, onDecide, onCancel }) => {
    const [showCharactersModal, setShowCharactersModal] = useState(false);
    const [selectedCharacters, setSelectedCharacters] = useState(event.event_characters || []);
    const { project, setProject} = useContext(ProjectContext);
    

    const handleAddCharacter = () => {
        // setSelectedCharIndex(-1); // -1 indicates adding a new character
        setShowCharactersModal(true);
    };

    const handleMoveCharacter = (charId, direction) => {
        // const charactersOnScene = [...scenes[currentScene].events[currentEvent].Characters];
        // const index = charactersOnScene.findIndex(c => c.id === charId);
        
        // if (index < 0) return; // Character not found

        // const targetIndex = direction === 'up' ? index - 1 : index + 1;
        // if (targetIndex < 0 || targetIndex >= charactersOnScene.length) return; // Target index out of bounds

        // [charactersOnScene[index], charactersOnScene[targetIndex]] = [charactersOnScene[targetIndex], charactersOnScene[index]];

        // const updatedEvents = scenes[currentScene].events.map((event, eventIndex) => {
        //     if (eventIndex === currentEvent) {
        //         return { ...event, Characters: charactersOnScene };
        //     }
        //     return event;
        // });

        // const updatedScenes = [...scenes];
        // updatedScenes[currentScene].events = updatedEvents;
        // setScenes(updatedScenes);
    };

    const handleDeleteCharacter = (char) => {
        setSelectedCharacters(selectedCharacters.filter((_) => _.id !== char.id));
    };

    const handleEditCharacter = (charIndex) => {
        // setSelectedCharIndex(charIndex);
        // setShowCharactersModal(true);
    };

    const handleSelectCharacter = (character) => {
        // const updatedEvents = scenes[currentScene].events.map((event, eventIndex) => {
        //     if (eventIndex === currentEvent) {
        //         // Check if adding a new character
        //         if (selectedCharIndex === -1) {
        //             // Add new character
        //             return {
        //                 ...event,
        //                 Characters: [...event.Characters, {
        //                     char_id: character.id, id: Date.now(),
        //                     name: character.fullname || 'Unnamed Character',
        //                     image: character.image
        //                 }]
        //             };
        //         } else {
        //             // Update existing character
        //             const updatedCharacters = [...event.Characters];
        //             updatedCharacters[selectedCharIndex] = character;
        //             return { ...event, Characters: updatedCharacters };
        //         }
        //     }
        //     return event;
        // });

        // const updatedScenes = [...scenes];
        // updatedScenes[currentScene].events = updatedEvents;
        // setScenes(updatedScenes);
        // setShowCharactersModal(false);
        // setSelectedCharIndex(null); // Reset the selected index
    };

    // if (!((currentScene !== undefined && currentEvent !== undefined && (scenes && scenes[currentScene] && scenes[currentScene].events && scenes[currentScene].events[currentEvent])))) {
    //     return null;
    // }

    // const currentCharacters = scenes[currentScene].events[currentEvent].Characters;

    const handleToggleCharacter = (character) => {
        const isAlreadyAdded = selectedCharacters.some(selected => selected.id === character.id);
        if (isAlreadyAdded) {
            setSelectedCharacters(selectedCharacters.filter(selected => selected.id !== character.id));
        } else {
            setSelectedCharacters([...selectedCharacters, character]);
        }
    };

    const handleModalClose = () => {
        setShowCharactersModal(false);
        onDecide(selectedCharacters); // Assuming onDecide is where you handle the final character list
    };

    return (
        <>
            <Offcanvas show={true} onHide={() => { onDecide(selectedCharacters)}} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Current Event Characters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                        {selectedCharacters.map((character, index) => (
                            <ListGroup.Item 
                                key={character.id} 
                                className="d-flex align-items-center character-item"
                                style={{ backgroundColor: 'lightgray' }} // Style for already added characters
                            >
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
                                        <div>
                                            <Button size="sm" className="me-1">
                                                <Pencil size={16} />
                                            </Button>
                                            <Button variant="danger" size="sm" className="me-1"
                                                onClick={() => handleDeleteCharacter(character)}
                                            >
                                                <Trash size={16} />
                                            </Button>
                                            <Button variant="light" size="sm" className="me-1">
                                                <ArrowUp />
                                            </Button>
                                            <Button variant="light" size="sm">
                                                <ArrowDown />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))}
                        <Button variant="primary" onClick={() => setShowCharactersModal(true)} className="mt-2">
                            <Plus size={16} /> Add New Character
                        </Button>
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>

            <Modal show={showCharactersModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Character</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {project.characters.map((char) => (
                            <ListGroup.Item 
                                key={char.id} 
                                onClick={() => handleToggleCharacter(char)} 
                                className="d-flex align-items-center character-item"
                                style={{ cursor: 'pointer', backgroundColor: selectedCharacters.some(c => c.id === char.id) ? '#dedede' : 'transparent' }}
                            >
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
