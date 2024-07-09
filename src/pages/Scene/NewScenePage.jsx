import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import DBAPI from '../../services/db';
import MugshotViewer from '../Event/Editor/Mugshot/MugshotViewer';
import { PlusCircleFill } from 'react-bootstrap-icons';
import CharacterCreatorEditorModal from '../Character/CharacterCreatorEditorModal';

const NewScenePage = () => {
    const [isProcessingAction, setIsProcessingAction] = useState(false);
    const [description, setDescription] = useState('');
    const [purpose, setPurpose] = useState('');
    const [originSceneId, setOriginSceneId] = useState(null);
    const [sceneData, setSceneData] = useState(null);
    const [showCharacterModal, setShowCharacterModal] = useState(false);

    useEffect(() => {
        const fetchScene = async (id) => {
            try {
                const response = await DBAPI.get(`/scene/${id}`);
                console.log(response.data);
                setSceneData(response.data);
            } catch (error) {
                console.error("Error fetching scene data:", error);
            }
        };

        if (originSceneId === null) {
            const currentUrl = new URL(window.location.href);
            const id = currentUrl.searchParams.get('origin-scene');
            if (id) {
                setOriginSceneId(id);
                fetchScene(id);
            }
        }
    }, [originSceneId]);

    const handleShowSuggestions = () => {
        setIsProcessingAction(true);
        DBAPI.post(`/scene/continue-scene`, { description, id: originSceneId })
            .then(res => {
                setIsProcessingAction(false);
                console.log(res.data);
                setEvent(res.data);
            })
            .catch(error => {
                console.error('Error fetching suggestions:', error);
                setIsProcessingAction(false);
            });
    };

    const handleOpenCharacterModal = () => setShowCharacterModal(true);
    const handleCloseCharacterModal = () => setShowCharacterModal(false);

    return (
        <>
            <div className="container-fluid my-5 ">
                <h1 style={{ textAlign: 'center' }}>Scene Continuation of Scene <a href={`/scene?scene=${originSceneId}&project=${sceneData && sceneData.parentProjectId}`}>{sceneData ? sceneData.title : 'Loading...'}</a></h1>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Form>
                            <Form.Group controlId="purposeInput" className="mt-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Write a purpose the scene should achieve (Make the player have some money for later use, Start a romance between the protagonist and a certain character, Go to a certain place)."
                                    value={purpose}
                                    onChange={(e) => setPurpose(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="descriptionInput" className="mt-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Write a description to help or simply click the (Show suggestions button)"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                onClick={() => {}}
                                className="m-3"
                            >
                                Generate Scene
                            </Button>
                            <Button
                                variant="warning"
                                onClick={handleShowSuggestions}
                                className="m-3"
                            >
                                Show scene suggestions
                            </Button>
                        </Form>
                    </Col>
                </Row>

                <Row className="d-flex justify-content-center align-items-center mt-5">
                    <Col md={12} className="d-flex justify-content-center align-items-center"><h2>Character List</h2></Col>
                    <div className="d-flex justify-content-center align-items-center">
                        {
                            sceneData && sceneData.parentProject.characters.map((character, index) => {
                                return (
                                    <div key={character.id} className="d-flex justify-content-center align-items-center flex-column">
                                        <div className='vn-window m-1'> <MugshotViewer character={character} /> </div>
                                        <div className='vn-window m-1'> {character.fullname} </div>
                                    </div>
                                );
                            })
                        }
                        <div className="d-flex justify-content-center align-items-center flex-column">
                            <Button 
                                className='vn-window m-1 w-100 d-flex justify-content-center align-items-center flex-column' 
                                style={{height: '100%'}}
                                onClick={handleOpenCharacterModal}
                            > 
                                <PlusCircleFill size={160} />
                            </Button>
                            <div className='vn-window m-1'> Create a new character </div>
                        </div>
                    </div>
                </Row>

                <Row className="justify-content-center mt-5">
                    <Col md={12} className="d-flex justify-content-center align-items-center"><h2>Location List</h2></Col>
                    {
                        sceneData && sceneData.parentProject.backgrounds.map((background, index) => {
                            return (
                                <Col md={3} key={index}>
                                    <div className='text-center'>{background.name}</div>
                                    <img src={background.image} alt={background.name} className="w-100" />
                                </Col>
                            );
                        })
                    }
                </Row>
            </div>
            
            <CharacterCreatorEditorModal 
                show={showCharacterModal}
                handleClose={handleCloseCharacterModal}
            />
        </>
    );
};

export default NewScenePage;
