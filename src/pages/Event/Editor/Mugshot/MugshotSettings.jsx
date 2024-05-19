import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../../../context/AppContext';
import { Button, Form, Modal, ListGroup } from 'react-bootstrap';
import { GearFill, Pencil } from 'react-bootstrap-icons';
import ProjectContext from '../../../../context/ProjectContext';

const MugshotSettings = ({createMugshotStyle, createMugshotData, character, show,  onFinish }) => {
    const { project, setProject} = useContext(ProjectContext);

    const handleChange = (e) => {
        character.mugshot = createMugshotData(character.mugshot);
        character.mugshot = {
            ...character.mugshot,
            [e.target.name]: e.target.value
        };

        setProject((prevProject) => {
            const updatedProject = {
                ...prevProject,
                characters: prevProject.characters.map((c) => {
                    if (c.id === character.id) {
                        return character;
                    }
                    return c;
                }),
            };
            return updatedProject;
        });
    };

    var mugshotData = createMugshotData(character?.mugshot);
    var mugshotStyle = createMugshotStyle(character);

    return (
        <>

                <Modal show={show} onHide={() => {
                        onFinish()
                    }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Adjust Mugshot</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <div className="mugshot-placeholder" style={{ display: character ? 'block' : 'none' }}>
                                <div className="mugshot" onClick={() => {
                                    setShowCharacterModal(true)
                                }} style={mugshotStyle}></div>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Scale</Form.Label>
                            <Form.Control step={0.03} type="number" name="scale" value={mugshotData.scale} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>X Position</Form.Label>
                            <Form.Control step={0.02} type="number" name="x" value={mugshotData.x} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Y Position</Form.Label>
                            <Form.Control step={0.02} type="number" name="y" value={mugshotData.y} onChange={handleChange} />
                        </Form.Group>
                        {/* <Button variant="success" onClick={handleSave}>Save Adjustments</Button> */}
                    </Modal.Body>
                </Modal>
            
        </>
    );
};

export default MugshotSettings;
