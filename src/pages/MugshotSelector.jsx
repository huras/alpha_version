import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { Button, Form, Modal, ListGroup } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';

const MugshotSelector = () => {
    const { scenes, events, setScenes, characters,  currentEventID } = useContext(AppContext);

    const [showCharacterModal, setShowCharacterModal] = useState(false);
    const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [mugshotData, setMugshotData] = useState({ scale: 1, x: 0, y: 0 });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (currentEventID !== null) {
            const currentEvent = events.find(event => event.id === currentEventID);
            const characterId = currentEvent?.Characters?.[0]?.id;

            if (characterId) {
                const character = currentEvent.Characters.find(c => c.id === characterId);
                setSelectedCharacter(character);
                setMugshotData(JSON.parse(character.mugshot));
                setEditMode(false);
            } else {
                setSelectedCharacter(null);
                setMugshotData({});
                setEditMode(false);
            }
        }
    }, [currentEventID, scenes, characters]);

    const handleSelectCharacter = (character) => {
        setSelectedCharacter(character);
        setShowCharacterModal(false);
    };

    const handleSave = () => {
        // if (selectedCharacter && currentEventID !== null) {
        //     const updatedScenes = scenes.map(scene => {
        //         if (scene.id === currentSceneID) {
        //             return {
        //                 ...scene,
        //                 events: scene.events.map(event => {
        //                     if (event.id === currentEventID) {
        //                         return {
        //                             ...event,
        //                             Characters: [{ ...selectedCharacter, mugshot: JSON.stringify(mugshotData) }]
        //                         };
        //                     }
        //                     return event;
        //                 })
        //             };
        //         }
        //         return scene;
        //     });

        //     setScenes(updatedScenes);
        //     setEditMode(false);
        // }
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
        backgroundImage: `url('${selectedCharacter?.image}')`,
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
                                <img src={char.image} alt={char.fullname} style={{ width: '60px', height: '100px' }} />
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
