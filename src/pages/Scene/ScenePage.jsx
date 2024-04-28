import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppContext from '../../context/AppContext'; // Adjust the path as needed
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import axios from 'axios';

export default function ScenePage() {
    const navigate = useNavigate();
    const [scene, setScene] = useState(null);

    const [events, setEvents] = useState([]);
    const [currentEventID, setCurrentEventID] = useState(null);
    const [branchSelection, setBranchSelection] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        var idToUse = undefined;
        if (!scene) {
            const urlParams = new URLSearchParams(window.location.search);
            idToUse = urlParams.get('id');
        } else {
            if (scene) return;
            idToUse = scene.id;
        }

        setIsLoading(true);
        axios.get(`http://localhost:8080/scene/${idToUse}`)
            .then(res => {
                setScene(res.data);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to fetch events');
            })
            .finally(() => setIsLoading(false));
    }, [scene]);

    const handleEditEvent = (eventId) => {
        setCurrentEventID( Number.parseInt(eventId) );
        navigate(`/scenes/${currentSceneID}/edit/${eventId}`);
    };

    const changeBranchSelection = (eventId, delta) => {

        //Check if index is out of bounds
        const currentIndex = branchSelection[eventId] || 0;
        if (currentIndex + delta >= events.find(e => e.id === eventId).ChildEvents.length || currentIndex + delta < 0) {
            return;
        }

        setBranchSelection(prev => ({
            ...prev,
            [eventId]: Math.max((prev[eventId] || 0) + delta, 0)
        }));
    };

    const getNextEventId = (eventId) => {
        const event = events.find(e => e.id === eventId);
        if (!event) return null;

        if (event.ChildEvents.length > 0) {
            const branchIndex = branchSelection[eventId] || 0;
            return event.ChildEvents[branchIndex]?.RelatedEventId;
        } else {
            // Find the next event in the sequence
            return events.find(e => e.parentEvent === eventId)?.id;
        }
    };

    const renderEvent = (eventId) => {
        const event = events.find(e => e.id === eventId);
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
                {event.ChildEvents.length > 0 && (
                    <div className='row mb-3'>
                        {/* Render Choice */}
                        <div className='col-12'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5 className='card-title'>Choice</h5>
                                    <p className='card-text'>{event.ChildEvents[Number.parseInt(branchSelection[eventId] || 0)]?.choice}</p>
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

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading events: {error}</p>;

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h1>Scene Page</h1>
                </div>
            </div>
            {currentEventID && renderEvent(currentEventID)}
        </div>
    );
}
