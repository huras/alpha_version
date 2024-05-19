import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../../../context/AppContext';
import { Button, Form, Modal, ListGroup } from 'react-bootstrap';
import { GearFill, Pencil } from 'react-bootstrap-icons';
import ProjectContext from '../../../../context/ProjectContext';
import MugshotSettings from './MugshotSettings';

const MugshotSelector = ({event, scene }) => {
    const [showCharacterModal, setShowCharacterModal] = useState(false);
    const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
    const { project, setProject} = useContext(ProjectContext);
    const [character, setCharacter] = useState(undefined);
    const [hasMugshot, setHasMugshot] = useState(false);

    useEffect(() => {
        setHasMugshot(event?.mugshot ? true : false);
    }, []);

    const handleSelectCharacter = (c) => {
        
        setProject((prevProject) => {
            const updatedProject = {
                ...prevProject,
                scenes: prevProject.scenes.map((s) => {
                    if (s.id === scene.id) {
                        return { ...s, childEvents: s.childEvents.map((e) => {
                            if (e.id === event.id) {
                                
                                return { ...e, mugshot: c, mugshotId: c.id };
                            }
                            return e;
                        }) };
                    }
                    return s;
                })
            };
            return updatedProject;
        });

        setShowCharacterModal(false);
    };

    // CSS for the mugshot
    const createMugshotData = (mugshotData) => {
        if (mugshotData && typeof mugshotData === 'string') mugshotData = JSON.parse(mugshotData);
        return mugshotData;
    }
    const createMugshotStyle = (character) => {
        
        var mugshotData = createMugshotData(character?.mugshot);
        if(typeof mugshotData === 'string') mugshotData = JSON.parse(mugshotData);

        // Calculate the size based on the scale
        const maxWidth = 100; // Replace with the actual width of the parent container
        const zoom = maxWidth / 100;
        
        const size = (1 / mugshotData?.scale) * (maxWidth * zoom);

        return {
            backgroundImage: `url('${character?.image}')`,
            backgroundPosition: `${mugshotData?.x * 100}% ${mugshotData?.y * 100}%`,
            transform: `scale(${mugshotData?.scale})`,
            transformOrigin: '0% 100%',
            width: `${size}px`,
            height: `${size}px`
        };
    }
    var mugshotStyle = createMugshotStyle(event.mugshot);

    return (
        <>
            <label>
                <input type="checkbox" checked={event.mugshot} onChange={(e) => {
                    const updatedEvent = { 
                        ...event,
                        mugshot: false, 
                        mugshotId: false, 
                    };
                    const updatedProject = {
                        ...project,
                        scenes: project.scenes.map((s) => {
                            if (s.id === scene.id) {
                                return { ...s, childEvents: s.childEvents.map((e) => {
                                    if (e.id === event.id) {
                                        return updatedEvent;
                                    }
                                    return e;
                                }) };
                            }
                            return s;
                        })
                    };
                    setHasMugshot( !hasMugshot);
                    setProject(updatedProject);
                }} />
            </label>
            <div className="mugshot-placeholder" style={{ display: (hasMugshot) ? 'block' : 'none' }} onClick={() => {setShowCharacterModal(true)}}>
                <div className="mugshot" style={mugshotStyle}></div>
            </div>

            <Modal show={showCharacterModal} onHide={() => {
                setShowCharacterModal(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Character Mugshot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {project.characters.map((char) => (
                            <ListGroup.Item key={char.id} className="d-flex align-items-center">
                                <img
                                    onClick={() => handleSelectCharacter(char)} 
                                    src={char.image} 
                                    alt={char.fullname} 
                                    style={{ width: '60px', height: '100px' }}
                                />
                                <div className="ms-2">{char.fullname || "Unnamed Character"}</div>
                                <Button variant="light" size="sm" className="ms-auto" onClick={() => {
                                    setCharacter(char)
                                    setShowAdjustmentModal(true)
                                }}>
                                    <GearFill size={16} />
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
            </Modal>

            {showAdjustmentModal && 
                <MugshotSettings 
                    createMugshotStyle={createMugshotStyle} 
                    createMugshotData={createMugshotData} 
                    character={character} 
                    show={showAdjustmentModal} 
                    onFinish={() => {
                        setShowAdjustmentModal(false)
                        setCharacter(undefined)
                    }} 
                />
            }
        </>
    );
};

export default MugshotSelector;
