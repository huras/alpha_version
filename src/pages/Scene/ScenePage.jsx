import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppContext from '../../context/AppContext'; // Adjust the path as needed
import { ChevronLeft, ChevronRight, JustifyLeft, PencilFill, PlayFill, Save2, Save2Fill, SaveFill } from 'react-bootstrap-icons';
import axios from 'axios';
import EventListDrawer from '../Event/Editor/EventListDrawer';
import EventList from '../Event/EventList';
import { Button } from 'react-bootstrap';
import Breadcrumb from '../Breadcrumb';
import ProjectContext from '../../context/ProjectContext';

export default function ScenePage() {
    const navigate = useNavigate();
    const { project, saveScene } = useContext(ProjectContext);
    const [sceneID, setSceneID] = useState(null);

    const [currentEventID, setCurrentEventID] = useState(null);
    const [branchSelection, setBranchSelection] = useState({});

    useEffect(() => {

        var idToUse = undefined;
        if (!scene) {
            const urlParams = new URLSearchParams(window.location.search);
            idToUse = urlParams.get('scene');
        } else {
            if (scene) return;
            idToUse = scene.id;
        }

        setSceneID(idToUse);
    }, []);

    const handleEditEvent = (eventId) => {
        setCurrentEventID(Number.parseInt(eventId));
        navigate(`/scenes/${currentSceneID}/edit/${eventId}`);
    };

    const changeBranchSelection = (eventId, delta) => {

        //Check if index is out of bounds
        const currentIndex = branchSelection[eventId] || 0;
        if (currentIndex + delta >= scene.childChoices.find(e => e.id === eventId).childChoices.length || currentIndex + delta < 0) {
            return;
        }

        setBranchSelection(prev => ({
            ...prev,
            [eventId]: Math.max((prev[eventId] || 0) + delta, 0)
        }));
    };

    const getNextEventId = (eventId) => {
        const event = scene.childChoices.find(e => e.id === eventId);
        if (!event) return null;

        if (event.childChoices.length > 0) {
            const branchIndex = branchSelection[eventId] || 0;
            return event.childChoices[branchIndex]?.RelatedEventId;
        } else {
            // Find the next event in the sequence
            return scene.childChoices.find(e => e.parentEvent === eventId)?.id;
        }
    };

    const handleSaveScene = () => {
        // Save scene to database
        saveScene(scene);
    }

    const renderEvent = (eventId) => {
        const event = scene.childChoices.find(e => e.id === eventId);
        if (!event) return null;

        const nextEventId = getNextEventId(eventId);

        return (
            <>
                <div className='row'>
                    {/* Event details and edit button */}
                    <div className='col-12 mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Event {event.order}</h5>
                                <p className='card-text'>{event.dialogText}</p>
                                {/* Render event details here */}
                                <button onClick={() => handleEditEvent(eventId)} className='btn btn-primary'>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
                {event.childChoices.length > 0 && (
                    <div className='row mb-3'>
                        {/* Render Choice */}
                        <div className='col-12'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5 className='card-title'>Choice</h5>
                                    <p className='card-text'>{event.childChoices[Number.parseInt(branchSelection[eventId] || 0)]?.choice}</p>
                                    {/* Render choice details here */}
                                </div>
                            </div>
                            <div className='col-12 d-flex'>
                                <button className='btn' onClick={() => changeBranchSelection(eventId, -1)}><ChevronLeft /></button>
                                <input type="number" className='form-control' style={{ width: '50px', textAlign: 'center' }} value={(branchSelection[eventId] || 0) + 1} readOnly />
                                <button className='btn' onClick={() => changeBranchSelection(eventId, 1)}><ChevronRight /></button>
                            </div>
                        </div>
                    </div>
                )}
                {nextEventId && renderEvent(nextEventId)}
            </>
        );
    };

    const scene = project?.scenes.find(s => {
        const lala = s.id === Number.parseInt(sceneID);
        return lala
    });

    if (!scene) return <p>Loading...</p>;

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 mb-3 py-3'>
                    <Breadcrumb
                        scene={scene}
                    ></Breadcrumb>
                </div>
            </div>

            <div className='row'>
                <div className='col-12 mb-3 py-3'>
                    <Button onClick={handleSaveScene} className='mx-1' variant="outline-primary"><Save2Fill className='mx-2' /> Save Scene</Button>
                    {/* <Button className='mx-1' variant="outline-success"><PlayFill className='mx-2' /> Play Scene</Button> */}
                    {/* <Button className='mx-1' variant="outline-dark"><JustifyLeft className='mx-2' /> Scene Settings</Button> */}
                    {/* <Button className='mx-1' variant="outline-dark"><PencilFill className='mx-2'/>Open event editor</Button> */}
                </div>
            </div>

            {scene && <EventList scene={scene} />}
            {currentEventID && renderEvent(currentEventID)}
        </div>
    );
}
