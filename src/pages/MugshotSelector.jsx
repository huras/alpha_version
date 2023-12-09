import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { Button, Form, Modal, ListGroup } from 'react-bootstrap';
import { Pencil, Save } from 'react-bootstrap-icons';

const MugshotSelector = () => {
    const { scenes, setScenes, currentScene, currentEvent, characters } = useContext(AppContext);

    const [showCharacterModal, setShowCharacterModal] = useState(false);
    const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [mugshotData, setMugshotData] = useState({ scale: 1, x: 0, y: 0 });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (currentScene !== undefined && currentEvent !== undefined) {
            const mugshot = scenes[currentScene].events[currentEvent].dialog.mugshot;
            if (mugshot) {
                const character = characters.find(c => c.id === mugshot.char_id);
                setSelectedCharacter(character);
                setMugshotData(mugshot);
                setEditMode(false);
            } else {
                setSelectedCharacter(null);
                setMugshotData({ scale: 1, x: 0, y: 0 });
                setEditMode(false);
            }
        }
    }, [currentScene, currentEvent, scenes, characters]);

    const handleSelectCharacter = (character) => {
        if (!character) {
            setSelectedCharacter(null);
        } else {
            setSelectedCharacter(character);
            setMugshotData({ ...character.mugshot });
            setShowCharacterModal(false);
        }
    };

    const handleSave = () => {
        if (!selectedCharacter) {
            setEditMode(false);
            return;
        }

        const updatedEvents = scenes[currentScene].events.map((event, index) => {
            if (index === currentEvent) {

                return {
                    ...event,
                    dialog: {
                        ...event.dialog,
                        mugshot: {
                            ...mugshotData,
                            char_id: selectedCharacter.id,
                        }
                    }
                };
            }
            return event;
        });

        const updatedScenes = [...scenes];
        updatedScenes[currentScene].events = updatedEvents;
        setScenes(updatedScenes);
    };

    const handleChange = (e) => {
        setMugshotData({ ...mugshotData, [e.target.name]: parseFloat(e.target.value) });
    };

    // Calculate the size based on the scale
    const maxWidth = 100; // Replace with the actual width of the parent container
    const zoom = maxWidth / 100;
    const size = (1 / mugshotData.scale) * (maxWidth * zoom);

    // CSS for the mugshot
    const mugshotStyle = {
        backgroundImage: `url('${selectedCharacter?.mugshot?.image}')`,
        backgroundPosition: `${mugshotData.x * 100}% ${mugshotData.y * 100}%`,
        transform: `scale(${mugshotData.scale})`,
        transformOrigin: '0% 100%',
        width: `${size}px`,
        height: `${size}px`
    };

    return (
        <>
            {!editMode &&
                <Button variant='link' onClick={() => setEditMode(!editMode)}><Pencil /></Button>
            }

            {editMode && (
                <>
                    <Button onClick={() => setShowCharacterModal(true)}>Select Mugshot</Button>
                    {selectedCharacter &&
                        <Button onClick={() => setShowAdjustmentModal(true)}>Adjust Mugshot</Button>}
                    <Button variant="success" onClick={handleSave}>Save Changes</Button>
                </>
            )}

            <div className="mugshot-placeholder" style={{ display: selectedCharacter ? 'block' : 'none' }}>
                <div className="mugshot" style={mugshotStyle}></div>
            </div>

            <Modal show={showCharacterModal} onHide={() => setShowCharacterModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Character Mugshot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {characters.map((char) => (
                            <ListGroup.Item key={char.id} onClick={() => handleSelectCharacter(char)} className="d-flex align-items-center">
                                <img src={char.mugshot.image} alt={char.fullname} style={{ width: '60px', height: '100px' }} />
                                <div className="ms-2">{char.fullname || "Unnamed Character"}</div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
            </Modal>

            <Modal show={showAdjustmentModal} onHide={() => setShowAdjustmentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Adjust Mugshot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Scale</Form.Label>
                        <Form.Control type="number" name="scale" value={mugshotData.scale} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>X Position</Form.Label>
                        <Form.Control type="number" name="x" value={mugshotData.x} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Y Position</Form.Label>
                        <Form.Control type="number" name="y" value={mugshotData.y} onChange={handleChange} />
                    </Form.Group>
                    <Button variant="success" onClick={handleSave}>Save Adjustments</Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default MugshotSelector;
